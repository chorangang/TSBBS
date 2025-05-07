import { Request, Response, NextFunction } from 'express';
import { appError } from '../../utils/appError';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    console.log("Not Found エラーハンドラ");
    const err = new appError(404, "Not Found");
    next(err);
};