import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credit } from "src/app/models/credit.model";
import { Person } from "src/app/models/person.model";

@Injectable({
    providedIn: "root",
})
export class PersonService {
    CREDIT_URL: string = "http://localhost:8080/credit";
    PERSON_URL: string = "http://localhost:8080/person";
    constructor(private httpClient: HttpClient) {}

    getByMovieId(movie_id: string) {
        return this.httpClient.get<Credit[]>(`${this.CREDIT_URL}/getByMovieId/${movie_id}`);
    }

    getByTvId(tv_id: string) {
        return this.httpClient.get<Credit[]>(`${this.CREDIT_URL}/getByTvId/${tv_id}`);
    }

    search(page: number, title: string) {
        return this.httpClient.get<{ people: Person[]; peopleCount: number; limit: number }>(
            `${this.PERSON_URL}/search?page=${page}&name=${title}`
        );
    }
}
