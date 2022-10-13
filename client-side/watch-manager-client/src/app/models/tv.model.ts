import { Genre } from "./genre.model";

export interface Tv {
    id: string;
    name: string;
    tagline: string;
    oferview: string;
    first_air_date: Date;
    in_production: Boolean;
    networ: string;
    poster_path: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    genre: Genre[];
}
