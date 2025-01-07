import { Product } from '@/interfaces/product.interface';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserModel } from './user.model';

export type ProductCreationAttributes = Optional<
    Product,
    'id'
>;

export class ProductModel
    extends Model<Product, ProductCreationAttributes>
    implements Product
{
    public id!: string;
    public user_id!: string;
    public name!: string;
    public price!: number;
    public condition!: string;
    public status!: string;
    public stock!: number;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof ProductModel {
    ProductModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.DECIMAL,
            },
            condition: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            stock: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'products',
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        },
    );

    ProductModel.belongsTo(UserModel, {
        foreignKey: 'user_id',
        as: 'user_data', 
    });

    return ProductModel;
}
