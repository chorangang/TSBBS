import { formatDate } from '../../utils/helper';

export const threadMapper = (thread: any) => {
    return {
        id: thread.id,
        user: {
            id:   thread.user.id,
            name: thread.user.name,
        },
        title: thread.title,
        body: thread.body,
        created_at: formatDate(thread.created_at),
        updated_at: formatDate(thread.updated_at)
    };
};
