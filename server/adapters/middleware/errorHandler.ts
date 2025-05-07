import { Request, Response, NextFunction } from "express";
import { appError } from "../../utils/appError";

export const errorHandler = (
    err: appError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("エラーハンドリングミドルウェア", err);
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({ message: message });
};