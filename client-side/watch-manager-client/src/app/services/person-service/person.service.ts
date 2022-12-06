import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credit } from "src/app/models/credit.model";

@Injectable({
    providedIn: "root",
})
export class PersonService {
    PERSON_URL: string = "http://localhost:8080/credit";
    constructor(private httpClient: HttpClient) {}

    getByMovieId(movie_id: string) {
        return this.httpClient.get<Credit[]>(`${this.PERSON_URL}/getByMovieId/${movie_id}`);
    }

    getByTvId(tv_id: string) {
        return this.httpClient.get<Credit[]>(`${this.PERSON_URL}/getByTvId/${tv_id}`);
    }
}
