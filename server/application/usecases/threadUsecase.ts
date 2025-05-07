import { indexParams, Thread } from "../../utils/types";
import { threadMapper } from "../dto/threadMapper";
import { newThread } from "../../domain/entity/thread";
import { appError } from "../../utils/appError";
import { threadRepository } from '../../adapters/repository/threadRepository';

export const createThreadUsecase = () => {
	const { selectThread, selectThreads, insertThread, updateThread, deleteThread } = threadRepository();

  const getThread = async (id: number) => {
    const thread = await selectThread(id);

    if (!thread) {
      throw new appError(404, "Thread not found");
    }

    return threadMapper(thread);
  };

  const getThreads = async (params: indexParams) => {
    const result = await selectThreads(params);

    if (!result || result.length === 0) {
      throw new appError(404, "Threads not found");
    }

    return result.map((thread: any) => threadMapper(thread));
  };

  const createThread = async (user_id: number, title: string, body: string) => {
    const thread = newThread(null, user_id, title, body);
    await insertThread(thread.user_id, thread.title, thread.body);
  };

  const editThread = async (id: number, title: string, body: string): Promise<void> => {
		const selected = threadMapper(await selectThread(id));

		if (!selected) {
      throw new appError(404, "Thread not found");
    }

		const thread = newThread(
				selected.id,
				selected.user.id,
				title,
				body,
				selected.created_at,
				new Date().toISOString()
		);

    await updateThread(id, thread.title, thread.body, thread.updated_at);
  };

  const destroyThread = async (id: number): Promise<void> => {
    await deleteThread(id);
  };

  return {
    getThread,
    getThreads,
    createThread,
    editThread,
    destroyThread,
  };
};
