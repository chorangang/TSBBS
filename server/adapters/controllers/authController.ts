import { Request, Response } from "express";
import { handler } from "./handler";
import { createAuthUsecase } from "../../application/usecases/authUsecase";
import { createUserUsecase } from "../../application/usecases/userUsecase";

export const createAuthController = () => {
    const { authParams, generateToken } = createAuthUsecase();
    const { createUser } = createUserUsecase();

    const register = handler(async (req: Request, res: Response) => {
        await createUser(req.body.name, req.body.email, req.body.password);
        res.status(201).json({ message: "User registered" });
    });

    const login = handler(async (req: Request, res: Response) => {
        const isValid = await authParams(req.body.email, req.body.password);
        if (isValid) {
            const token = await generateToken(req.body.email, req.body.password);
            res.status(200).json({
                message: "User logged in",
                token: token,
            });
            return;
        }

        res.status(400).json({ message: "Invalid login" });
    });

    const logout = handler(async (req: Request, res: Response) => {
        // logout あとでやる
    });

    return { register, login, logout };
};
