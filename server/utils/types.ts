export interface User {
    id: number|null;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export interface Thread {
    id: number|null;
    user_id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number|null;
    thread_id: number;
    user_id: number;
    body: string;
    created_at: string;
    updated_at: string;
}

export interface indexParams {
    page: number;
    limit: number;
    keyword: string;
    sort: 'desc' | 'asc';
}