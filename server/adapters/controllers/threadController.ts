import { Request, Response } from "express";
import { handler } from "./handler";
import { createThreadUsecase } from "../../application/usecases/threadUsecase";

export const createThreadController = () => {
  const { getThread, getThreads, createThread, editThread, destroyThread } = createThreadUsecase();

  // IDからThreadを取得する
  const showThread = handler(async (req: Request, res: Response) => {
    res.status(200).json(await getThread(parseInt(req.params.id)));
  });

  // 検索条件でThreadsを取得する
  const indexThread = handler(async (req: Request, res: Response) => {
    const threads = await getThreads({
      page:    parseInt(req.query.page as string)  || 1,
      sort:    (req.query.sort as "asc" | "desc")  || "desc",
      limit:   parseInt(req.query.limit as string) || 10,
      keyword: (req.query.keyword as string)       || "",
    });
    res.status(200).json(threads);
  });

  // Threadを作成する
  const saveThread = handler(async (req: Request, res: Response) => {
    await createThread(
      parseInt(req.body.user_id),
      req.body.title,
      req.body.body
    );
    res.status(201).json({ message: "Thread created" });
  });

  // Threadを更新する
  const putThread = handler(async (req: Request, res: Response) => {
    await editThread(parseInt(req.params.id), req.body.title, req.body.body);
    res.status(200).json({ message: "Thread updated" });
  });

  // Threadを削除する
  const removeThread = handler(async (req: Request, res: Response) => {
    await destroyThread(parseInt(req.params.id));
    res.status(200).json({ message: "Thread deleted" });
  });

  return { showThread, indexThread, saveThread, putThread, removeThread };
};
