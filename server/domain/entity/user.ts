import { appError } from "../../utils/appError";
import { User } from "../../utils/types";

export const newUser = (
    id: number|null,
    name: string,
    email: string,
    password: string,
    created_at: string = new Date().toISOString(),
    updated_at: string = new Date().toISOString()
): User => {
    // Nameのバリデーション
    if (!name || name.trim() === "") {
        throw new appError(400, "Name cannot be empty.");
    }
    if (name.length > 255) {
        throw new appError(400, "Name cannot exceed 255 characters.");
    }

    // Emailのバリデーション
    if (!email || email.trim() === "") {
        throw new appError(400, "Email cannot be empty.");
    }
    if (email.length > 255) {
        throw new appError(400, "Email cannot exceed 255 characters.");
    }

    // Passwordのバリデーション
    if (!password || password.trim() === "") {
        throw new appError(400, "Password cannot be empty.");
    }
    if (password.length < 8) {
        throw new appError(400, "Password must be at least 8 characters.");
    }
    if (password.length > 255) {
        throw new appError(400, "Password cannot exceed 255 characters.");
    }

    // バリデーションを通過した場合、オブジェクトを生成
    return {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: created_at,
        updated_at: updated_at,
    };
}