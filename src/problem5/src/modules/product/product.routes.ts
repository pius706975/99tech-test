import express from 'express';
import { authMiddleware } from '@/middlewares/auth.middleware';
import productController from './product.controller';

const productRoute = express.Router();

productRoute.post('', authMiddleware, productController.createProduct);

productRoute.put('/:id', authMiddleware, productController.updateProduct);

productRoute.delete('/delete/:id', authMiddleware, productController.deleteProduct);

productRoute.get('/list', productController.getAll)
productRoute.get('/detail/:id', productController.getById)

export default productRoute;
