import { Request, Response, NextFunction } from "express";
import { appError } from "../../utils/appError";
import { createAuthUsecase } from "../../application/usecases/authUsecase";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { verifyToken } = createAuthUsecase();

    const token = req.headers["authorization"];

    console.log("token:", token);

    if(req.path === "/api/login" || req.path === "/api/register") {
        console.log("login or register");
        next();
        return;
    }

    if (!token) {
        console.log("No token provided");
        res.status(401).json({ message: "No token provided" });
        return;
    }

    if (!verifyToken(token)) {
        console.log("Invalid token");
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    next();
}