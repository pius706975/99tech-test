import { Request, Response, NextFunction } from 'express';
import { CustomError } from './custom-error';

export const errorHandler = (
    err: CustomError | Error,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    console.error('Caught error:', err);

    res.status(statusCode).json({ error: message });
};
