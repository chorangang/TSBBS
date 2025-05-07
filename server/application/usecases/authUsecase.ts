import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { userRepository } from '../../adapters/repository/userRepository';
import { appError } from '../../utils/appError';
import { jwtPrivateKey, jwtPublicKey } from '../../utils/config';

export const createAuthUsecase = () => {
    const { selectUserByEmail } = userRepository();

    const authParams = async (email: string, password: string): Promise<boolean> => {
        console.log("authParams");

        const user = await selectUserByEmail(email);

        if (!user) {
            throw new appError(404, 'User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // パスワードの比較

        if (!isPasswordValid) {
            throw new appError(400, 'Invalid password');
        }

        return true;
    };

    const generateToken = async (email: string, password: string) => {
        console.log("generateToken");
        const token = jwt.sign(
            { email: email },
            jwtPrivateKey,
            {
                algorithm: 'RS256',
                expiresIn: '1h'
            },
        );
        return token;
    };

    const verifyToken = (token: string) => {
        try {
            console.log("verifyToken");
            jwt.verify(token, jwtPublicKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    return {
        authParams,
        generateToken,
        verifyToken,
    }
}