import { productRepo } from './product.repo';
import { CustomError } from '@/utils/custom-error';
import { verifyJWT } from '@/middlewares/jwt.service';
import { JWT_ACCESS_TOKEN_SECRET } from '@/config';
import { Product } from '@/interfaces/product.interface';
import { validateCreateProduct } from './product.validator';

const productService = {
    createProduct: async (accessToken: string, productData: Product) => {
        const decodeToken = await verifyJWT(
            accessToken,
            JWT_ACCESS_TOKEN_SECRET as string,
        );

        const userId = decodeToken.userId;

        const { error } = validateCreateProduct(productData);
        if (error) throw new CustomError(error.details[0].message, 400);

        const newProduct = await productRepo.createProduct({
            ...productData,
            user_id: userId,
        });

        return newProduct;
    },

    updateProduct: async (
        accessToken: string,
        id: string,
        productData: Product,
    ) => {
        const decodeToken = await verifyJWT(
            accessToken,
            JWT_ACCESS_TOKEN_SECRET as string,
        );

        const userId = decodeToken.userId;

        const product = await productRepo.getById(id);
        if (!product) throw new CustomError('Product not found', 404);

        const { error } = validateCreateProduct(productData);
        if (error) throw new CustomError(error.details[0].message, 400);

        const updatedProduct = await productRepo.updateProduct(
            userId,
            product.id,
            productData,
        );

        return updatedProduct;
    },

    deleteProduct: async (accessToken: string, id: string) => {
        const decodeToken = await verifyJWT(
            accessToken,
            JWT_ACCESS_TOKEN_SECRET as string,
        );

        const userId = decodeToken.userId;

        const product = await productRepo.getById(id);
        if (!product) throw new CustomError('Product not found', 404);

        const deletedProduct = await productRepo.deleteProduct(userId,
            product.id
        );
        return deletedProduct;
    },

    getAll: async (query: {
        sortBy?: 'newest' | 'oldest';
        status?: 'active' | 'inactive';
        condition?: 'new' | 'used';
        page?: number;
        pageLimit?: number;
    }) => {
        const sortBy = query.sortBy || 'newest';
        const status = query.status;
        const condition = query.condition;
        const page = query.page || 1;
        const pageLimit = query.pageLimit || 4;

        if (page < 1)
            throw new CustomError(
                'Page must be greater than or equal to 1',
                400,
            );

        const limit = pageLimit;
        const offset = (page - 1) * limit;

        const products = await productRepo.getAll({
            sortBy,
            status,
            condition,
            limit,
            offset,
        });

        return products;
    },

    getById: async (id: string) => {
        const product = await productRepo.getById(id);
        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        return product;
    },
};

export default productService;
