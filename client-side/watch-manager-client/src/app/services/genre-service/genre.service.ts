import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Genre } from "src/app/models/genre.model";

@Injectable({
    providedIn: "root",
})
export class GenreService {
    MOVIE_URL: string = "http://localhost:8080/genre";
    constructor(private httpClient: HttpClient) {}

    getAll() {
        return this.httpClient.get<Genre[]>(`${this.MOVIE_URL}/getAll`);
    }
}
