import { userRepository } from "../../adapters/repository/userRepository";
import { newUser } from "../../domain/entity/user";
import { appError } from "../../utils/appError";
import { indexParams } from "../../utils/types";
import { userMapper } from "../dto/userMapper";

export const createUserUsecase = () => {
    const { selectUser, selectUsers, insertUser, updateUser, deleteUser } = userRepository();

    const getUser = async (id: number) => {
        const user = await selectUser(id);

        if (!user) {
            throw new appError(404, "User not found");
        }

        return userMapper(user);
    }

    const getUsers = async (params: indexParams) => {
        const users = await selectUsers(params);

        if (!users || users.length === 0) {
            throw new appError(404, "Users not found");
        }

        return users.map((user: any) => userMapper(user));
    }

    const createUser = async (name: string, email: string, password: string) => {
        const user = newUser(null, name, email, password);
        await insertUser(user.name, user.email, user.password);
    };

    const editUser = async (id: number, email: string, password: string) => {
        const selected = await selectUser(id);

        if (!selected) {
            throw new appError(404, "User not found");
        }

        const user = newUser(
            selected.id,
            selected.name,
            email,
            password,
            selected.created_at.toString(),
        );

        await updateUser(id, user.email, user.password, user.updated_at);
    };

    const destroyUser = async (id: number) => {
        return await deleteUser(id);
    };

    return { getUser, getUsers, createUser, editUser, destroyUser };
}