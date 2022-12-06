export interface Review {
    id: string;
    title: string;
    content: string;
    user_name: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    movie_id: string;
    tv_id: string;
}
