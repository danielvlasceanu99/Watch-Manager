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

    filter(page: number, genreId: string) {
        return this.httpClient.get<{ movies: Movie[]; movieCount: number; limit: number }>(
            `${this.MOVIE_URL}/filter?page=${page}&genre=${genreId}`
        );
    }

    search(page: number, title: string) {
        return this.httpClient.get<{ movies: Movie[]; movieCount: number; limit: number }>(
            `${this.MOVIE_URL}/search?page=${page}&title=${title}`
        );
    }
}
