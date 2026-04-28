import { Request, Response, NextFunction } from 'express';
import AppError from "../errors/AppError";

export const validateCardNumber = (req: Request, res: Response, next: NextFunction) => {
    const { cardNumber } = req.body;

   if (cardNumber === undefined || cardNumber === null) {
        return next(new AppError('card number is required', 400));
    }

    if (typeof cardNumber !== 'string') {
        return next(new AppError('card number must be a string', 400));
    }

    const cardNum = cardNumber.trim().replace(/[\s\-]/g, '');

    if (cardNum.length === 0) {
        return next(new AppError('cardNumber cannot be empty', 400));
    }

    if (!/^\d+$/.test(cardNum)) {
        return next(new AppError('Card number must contain only digits', 400));
    }

    
    if (cardNum.length < 13 || cardNum.length > 19) {
        return next(new AppError('Invalid card length', 400));
    }

   
    if (/^(\d)\1+$/.test(cardNum)) {
        return next(new AppError('Invalid card number', 400));
    }


    req.body.cardNumber = cardNum;

    next(); 
};