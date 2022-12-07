import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "src/app/models/movie.model";

@Injectable({
    providedIn: "root",
})
export class MovieService {
    MOVIE_URL: string = "http://localhost:8080/movie";
    constructor(private httpClient: HttpClient) {}

    getLatest() {
        return this.httpClient.get<Movie[]>(`${this.MOVIE_URL}/latest`);
    }
    getById(movie_id: string) {
        return this.httpClient.get<Movie>(`${this.MOVIE_URL}/get/${movie_id}`);
    }
}
