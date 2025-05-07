import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { appError } from "../../utils/appError";
import { indexParams } from '../../utils/types';

const prisma = new PrismaClient();

export const userRepository = () => {
    const selectUser = async (id: number) => {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    const selectUserByEmail = async (email: string) => {
        try {
            return await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    const selectUsers = async(params: indexParams) => {
        const offset = (params.page - 1) * params.limit;

        try {
            return await prisma.user.findMany({
                where: {
                    name: {
                        contains: params.keyword,
                    },
                },
                take: params.limit,
                skip: offset,
                orderBy: {
                    created_at: params.sort,
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    const insertUser = async (name: string, email: string, password: string) => {
        try {
            await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: await bcrypt.hash(password, 10),
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    const updateUser = async (id: number, name: string, email: string, password: string) => {
        try {
            return await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: name,
                    email: email,
                    password: password,
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    const deleteUser = async (id: number) => {
        try {
            return await prisma.user.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw new appError(400, "Prisma Error");
        }
    };

    return { selectUser, selectUserByEmail, selectUsers, insertUser, updateUser, deleteUser };
};
