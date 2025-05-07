import { formatDate } from "../../utils/helper";

interface commentData {
    id: number;
    thread_id: number;
    user: {
        id: number;
        name: string;
    };
    body: string;
    created_at: string;
    updated_at: string;
}

export const commentMapper = (comment: commentData) => {
    return {
        id: comment.id,
        thread_id: comment.thread_id,
        user: {
            id: comment.user.id,
            username: comment.user.name,
        },
        body: comment.body,
        created_at: formatDate(comment.created_at),
        updated_at: formatDate(comment.updated_at)
    };
}