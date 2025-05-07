import { PrismaClient } from '@prisma/client';
import { appError } from '../../utils/appError';

const prisma = new PrismaClient();

export const commentRepository = () => {
    const selectComment = async (id: number) => {
        try {
            return await prisma.comment.findUnique({
                where: {
                    id: id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
            throw new appError(400, 'Prisma Error');
        }
    }

    const selectComments = async (thread_id: number) => {
        try {
            return await prisma.comment.findMany({
                where: {
                    thread_id: thread_id
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
            throw new appError(400, 'Prisma Error');
        }
    };

    const insertComment = async (thread_id: number, user_id: number, body: string) => {
        try {
            await prisma.comment.create({
                data: {
                    thread_id: thread_id,
                    user_id: user_id,
                    body: body
                }
            });
        } catch (error) {
            console.log(error);
            throw new appError(400, 'Prisma Error');
        }
    };

    const updateComment = async (id: number, body: string, updated_at: string) => {
        try {
            await prisma.comment.update({
                where: {
                    id: id
                },
                data: {
                    body: body,
                    updated_at: updated_at
                }
            });
        } catch (error) {
            console.log(error);
            throw new appError(400, 'Prisma Error');
        }
    };

    const deleteComment = async (id: number) => {
        try {
            await prisma.comment.delete({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
            throw new appError(400, 'Prisma Error');
        }
    }

    return { selectComment, selectComments, insertComment, updateComment, deleteComment };
}