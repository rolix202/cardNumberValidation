import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    console.error('Unexpected error:', err);

    const isDev = process.env.NODE_ENV === 'development';

    return res.status(500).json({
        status: 'error',
        message: 'something went wrong.',
        ...(isDev && { stack: err.stack })
    });

}

export default errorHandler;