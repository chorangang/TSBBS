import { commentRepository } from "../../adapters/repository/commnetRepository";
import { newComment } from "../../domain/entity/comment";
import { appError } from "../../utils/appError";
import { commentMapper } from "../dto/commentMapper";

export  const commentUsecase = () => {
    const { selectComment, selectComments, insertComment, updateComment, deleteComment } = commentRepository();

    const getComments = async (thread_id: number) => {
        const comments = await selectComments(thread_id);

        if (!comments || comments.length === 0) {
            throw new appError(404, "Comments not found");
        }

        return comments.map((comment: any) => commentMapper(comment));
    }

    const createComment = async (thread_id: number, user_id: number, body: string) => {
        const comment = newComment(null, thread_id, user_id, body);
        await insertComment(comment.thread_id, comment.user_id, comment.body);
    };

    const editComment = async (id: number, body: string) => {
        const selected = await selectComment(id);

        if (!selected) {
            throw new appError(404, "Comment not found");
        }

        const comment = newComment(
            selected.id,
            selected.thread_id,
            selected.user_id,
            body,
            selected.created_at.toString(),
        );

        await updateComment(id, comment.body, comment.updated_at);
    };

    const destroyComment = async (id: number) => {
        await deleteComment(id);
    };

    return { getComments, createComment, editComment, destroyComment };
}