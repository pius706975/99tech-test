import authRouter from '@/modules/auth/auth.routes';
import productRoute from '@/modules/product/product.routes';
import userRouter from '@/modules/user/user.routes';
import { errorHandler } from '@/utils/error-handler';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRoute)
router.use(errorHandler)

export default router;
