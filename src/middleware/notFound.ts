import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Cannot find ${req.method} ${req.originalUrl}`, 404));
}

export default notFound;