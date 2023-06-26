import { MediaType } from "./helpers/media-type.model";
import { Movie } from "./movie.model";
import { Tv } from "./tv.model";

export interface Review {
    id: string;
    title: string;
    content: string;
    user_name: string;
    media_type: MediaType;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    movie_id: string;
    movie: Movie;
    tv_id: string;
    tv: Tv;
}
