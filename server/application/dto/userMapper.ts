import { User } from '../../utils/types';
import { formatDate } from '../../utils/helper';

export const userMapper = (user: any): User => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: "secret",
        created_at: formatDate(user.created_at),
        updated_at: formatDate(user.updated_at)
    };
}