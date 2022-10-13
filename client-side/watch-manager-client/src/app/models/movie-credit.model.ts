import { Person } from "./person.model";

export interface MovieCredit {
    id: string;
    job: string;
    credit_type: string;
    created_by: string;
    last_changed_by: string;
    created_at: Date;
    last_changed_at: Date;
    movie_id: string;
    person_id: string;
    person: Person;
}
