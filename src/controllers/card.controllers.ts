import { Request, Response, NextFunction } from 'express';
import { cardFuncValidator } from '../utils/cardFuncValidator';
import AppError from '../errors/AppError';

export const postCardController = (req: Request, res: Response, next: NextFunction) => {
    const { cardNumber } = req.body;

    const isValid = cardFuncValidator(cardNumber); 

    if (!isValid){
        next(new AppError('Card validation failed', 400));
        return;
    }

    res.status(200).json({
        isValid: true,
        message: "Card successfully validated"
    })
}