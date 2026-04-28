import { Request, Response, NextFunction } from 'express';
import { cardFuncValidator } from '../utils/cardFuncValidator';
import AppError from '../errors/AppError';

export const postCardController = (req: Request, res: Response, next: NextFunction) => {
    const { cardNumber } = req.body;

    const isValid = cardFuncValidator(cardNumber); 

    if (!isValid){
        next(new AppError('Invalid card details', 400));
        return;
    }

    res.status(200).json({
        valid: true,
        message: "Card successfully validated",
        cardNumber
    })
}