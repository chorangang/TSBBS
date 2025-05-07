import { createUserUsecase } from "../../application/usecases/userUsecase";
import { handler } from "./handler";

export const userController = () => {
    const { getUser, getUsers, editUser, destroyUser } = createUserUsecase();

    const showUser = handler(async (req, res) => {
        res.status(200).json(await getUser(parseInt(req.params.id)));
    });

    const indexUser = handler(async (req, res) => {
        const users = await getUsers({
            page: parseInt(req.query.page as string) || 1,
            sort: (req.query.sort as "asc" | "desc") || "desc",
            limit: parseInt(req.query.limit as string) || 10,
            keyword: (req.query.keyword as string) || "",
        });
        res.status(200).json(users);
    });

    const putUser = handler(async (req, res) => {
        await editUser(parseInt(req.params.id), req.body.email, req.body.password);
        res.status(200).json({ message: "User updated" })
    });

    const removeUser = handler(async (req, res) => {
        await destroyUser(parseInt(req.params.id));
        res.status(200).json({ message: "User deleted" });
    });

    return { showUser, indexUser, putUser, removeUser };
};