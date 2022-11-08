import { Genre } from "./genre.model";

export interface Movie {
    id: string;
    title: string;
    tagline: string;
    overview: string;
    runtime: number;
    release_date: Date;
    status: string;
    budget: number;
    revenue: number;
    poster_path: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    genres: Genre[];
}
