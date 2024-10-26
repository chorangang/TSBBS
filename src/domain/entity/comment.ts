import { appError } from "../../utils/appError";
import { Comment } from "../../utils/types";

export const newComment = (
    id: number | null,
    thread_id: number,
    user_id: number,
    body: string,
    created_at: string = new Date().toISOString(),
    updated_at: string = new Date().toISOString()
): Comment => {
    // thread_idのバリデーション
    if (!thread_id) {
        throw new appError(400, "Thread ID is required.");
    }

    // user_idのバリデーション
    if (!user_id) {
        throw new appError(400, "User ID is required.");
    }

    // Bodyのバリデーション
    if (!body || body.trim() === "") {
        throw new appError(400, "Body cannot be empty.");
    }
    if (body.length > 1000) {
        throw new appError(400, "Body cannot exceed 1000 characters.");
    }

    // バリデーションを通過した場合、オブジェクトを生成
    return {
        id: id,
        thread_id: thread_id,
        user_id: user_id,
        body: body,
        created_at: created_at,
        updated_at: updated_at,
    };
};
