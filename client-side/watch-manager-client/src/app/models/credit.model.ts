import { Movie } from "./movie.model";
import { Person } from "./person.model";
import { Tv } from "./tv.model";

export interface Credit {
    id: string;
    job: string;
    credit_type: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    movie_id: string;
    movie: Movie;
    tv_id: string;
    tv: Tv;
    person_id: string;
    person: Person;
}
