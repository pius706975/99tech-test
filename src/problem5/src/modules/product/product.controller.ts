import { NextFunction, Request, Response } from 'express';
import productService from './product.service';

const productController = {
    createProduct: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const accessToken = authorization.split(' ')[1];

            const productData = req.body;

            const response = await productService.createProduct(
                accessToken,
                productData,
            );

            res.status(201).json({
                message: 'Successfully created a product',
                data: response,
            });
        } catch (error) {
            console.log('error: ', error);
            next(error);
        }
    },

    updateProduct: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const authorization = req.headers.authorization;
            if (!authorization) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const accessToken = authorization.split(' ')[1];

            const { id } = req.params;
            const productData = req.body;

            const response = await productService.updateProduct(
                accessToken,
                id,
                productData,
            );

            res.status(200).json({
                message: 'Successfully update',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    },

    deleteProduct: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const authorization = req.headers.authorization;
    
            if (!authorization) {
                res.status(404).json({ message: 'Authorization header missing' });
                return;
            }
    
            const accessToken = authorization.split(' ')[1];

            const { id } = req.params;
    
            await productService.deleteProduct(accessToken, id);
    
            res.status(200).json({
                message: `Successfully deleted product`,
            });
        } catch (error) {
            next(error);
        }
    },

    getAll: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { sortBy, status, condition, page, limit } = req.query;

            const response = await productService.getAll({
                sortBy: sortBy as 'newest' | 'oldest',
                status: status as 'active' | 'inactive',
                condition: condition as 'new' | 'used',
                page: page ? parseInt(page as string, 10) : undefined,
                pageLimit: limit ? parseInt(limit as string, 10) : undefined,
            });

            res.status(200).json({
                message: 'Successfully fetched products',
                data: response,
            });
        } catch (error) {
            console.log('error: ', error);
            next(error);
        }
    },

    getById: async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const response = await productService.getById(id);

            res.status(200).json({
                message: 'Successfully fetched product',
                data: response,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default productController;
