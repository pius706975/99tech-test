import { DB } from '@/database';
import { Product } from '@/interfaces/product.interface';
import { CustomError } from '@/utils/custom-error';

export const productRepo = {
    createProduct: async (productData: Product): Promise<Product> => {
        return await DB.Products.create(productData);
    },

    updateProduct: async (userId: string, productId: string, productData: Product) => {
        const product = await DB.Products.findOne({ where: { id: productId } });

        if (product?.user_id !== userId) throw new CustomError('Product not found', 404);

        const updatedProduct = await product?.update(productData);

        return updatedProduct;
    },

    deleteProduct: async (userId: string, productId: string) => {
        const product = await DB.Products.findOne({ where: { id: productId } });

        if (product?.user_id !== userId) {
            throw new CustomError('Product not found', 404);
        }
    
        await product?.destroy(); 
        return product;
    },

    getAll: async (params: {
        sortBy: 'newest' | 'oldest';
        status?: 'active' | 'inactive';
        condition?: 'used' | 'new';
        limit?: number;
        offset?: number;
    }) => {
        const { sortBy, status, condition, limit, offset } = params;
        const order = sortBy === 'newest' ? 'DESC' : 'ASC';
        const whereClauses = [];

        if (status) {
            whereClauses.push(`status = :status`);
        }

        if (condition) {
            whereClauses.push(`condition = :condition`);
        }

        const whereQuery = whereClauses.length
            ? `WHERE ${whereClauses.join(' AND ')}`
            : '';

        const query = `
            SELECT 
                p.id AS product_id,
                p.name AS product_name,
                p.price,
                p.condition,
                p.status,
                p.stock,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                u.id AS user_id,
                u.name AS user_name
            FROM Products p
            LEFT JOIN Users u ON p.user_id = u.id
            ${whereQuery}
            ORDER BY p.created_at ${order}
            LIMIT :limit OFFSET :offset;
        `;

        const rawData = await DB.sequelize.query(query, {
            type: DB.Sequelize.QueryTypes.SELECT,
            replacements: { status, condition, limit, offset },
        });

        const transformedData = rawData.map((item: any) => ({
            id: item.product_id,
            user_data: {
                user_id: item.user_id,
                name: item.user_name,
            },
            name: item.product_name,
            price: item.price,
            condition: item.condition,
            status: item.status,
            stock: item.stock,
            created_at: item.product_created_at,
            updated_at: item.product_updated_at,
        }));

        return transformedData;
    },

    getById: async (productId: string) => {
        const product = await DB.Products.findOne({
            where: { id: productId },
            include: [
                {
                    model: DB.Users,
                    as: 'user_data',
                    attributes: ['id', 'name'],
                },
            ],

            attributes: [
                'id',
                'name',
                'price',
                'condition',
                'status',
                'stock',
                'created_at',
                'updated_at',
            ],
        });

        return product;
    },
};
