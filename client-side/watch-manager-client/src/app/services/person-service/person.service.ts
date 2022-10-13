import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MovieCredit } from "src/app/models/movie-credit.model";

@Injectable({
    providedIn: "root",
})
export class PersonService {
    PERSON_URL: string = "http://localhost:8080/person";
    constructor(private httpClient: HttpClient) {}

    getByMovieId(movie_id: string) {
        return this.httpClient.get<MovieCredit[]>(`${this.PERSON_URL}/getByMovieId/${movie_id}`);
    }
}
