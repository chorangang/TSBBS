import { Request, Response, NextFunction } from "express";

// エラーハンドリングを行うラッパー関数
export const handler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
