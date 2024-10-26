import { commentUsecase } from "../../application/usecases/commentUsecase";
import { handler } from "./handler";

export const commentController = () => {
    const { getComments, createComment, editComment, destroyComment } = commentUsecase();

    const indexComments = handler(async (req, res) => {
        const comments = await getComments(parseInt(req.params.thread_id));
        res.status(200).json(comments);
    });

    const saveComment = handler(async (req, res) => {
        await createComment(
            parseInt(req.body.thread_id),
            parseInt(req.body.user_id),
            req.body.body
        );
        res.status(201).json({ message: "Comment created" });
    });

    const putComment = handler(async (req, res) => {
        await editComment(parseInt(req.params.id), req.body.body);
        res.status(200).json({ message: "Comment updated" });
    });

    const removeComment = handler(async (req, res) => {
        await destroyComment(parseInt(req.params.id));
        res.status(200).json({ message: "Comment deleted" });
    });

    return { saveComment, indexComments, putComment, removeComment };
}