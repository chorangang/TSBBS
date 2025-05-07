import { appError } from "../../utils/appError";
import { Thread } from "../../utils/types";

export const newThread = (
        id: number|null,
        user_id: number,
        title: string,
        body: string,
        created_at: string = new Date().toISOString(),
        updated_at: string = new Date().toISOString()
): Thread => {
    // user_idのバリデーション
    if (!user_id) {
        throw new appError(400, "User ID is required.");
    }

    // Titleのバリデーション
    if (!title || title.trim() === "") {
        throw new appError(400, "Title cannot be empty.");
    }
    if (title.length > 50) {
        throw new appError(400, "Title cannot exceed 50 characters.");
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
        user_id: user_id,
        title: title,
        body: body,
        created_at: created_at,
        updated_at: updated_at,
    };
}