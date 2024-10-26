import { PrismaClient } from "@prisma/client";
import { indexParams } from "../../utils/types";
import { appError } from "../../utils/appError";

const prisma = new PrismaClient();

export const threadRepository = () => {
  const selectThread = async (id: number) => {
    try {
      return await prisma.thread.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          title: true,
          body: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error: unknown) {
      throw new appError(400, "Prisma Error");
    }
  };

  const selectThreads = async (params: indexParams) => {
    const offset = (params.page - 1) * params.limit;

    try {
      return await prisma.thread.findMany({
        where: {
          title: {
            contains: params.keyword,
          },
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          title: true,
          body: true,
          created_at: true,
          updated_at: true,
        },
        take: params.limit,
        skip: offset,
        orderBy: {
          created_at: params.sort,
        },
      });
    } catch (error: unknown) {
      throw new appError(400, "Prisma Error");
    }
  };

  const insertThread = async (user_id: number, title: string, body: string) => {
    try {
      await prisma.thread.create({
        data: {
          user_id: user_id,
          title: title,
          body: body,
        },
      });
    } catch (error: unknown) {
      throw new appError(400, "Prisma Error");
    }
  };

  const updateThread = async (
    id: number,
    title: string,
    body: string,
    updated_at: string
  ) => {
    try {
      await prisma.thread.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          body: body,
          updated_at: updated_at,
        },
      });
    } catch (error: unknown) {
      throw new appError(400, "Prisma Error");
    }
  };

  const deleteThread = async (id: number) => {
    try {
      await prisma.thread.delete({
        where: {
          id: id,
        },
      });
    } catch (error: unknown) {
      throw new appError(400, "Prisma Error");
    }
  };

  return {
    selectThread,
    selectThreads,
    insertThread,
    updateThread,
    deleteThread,
  };
};
