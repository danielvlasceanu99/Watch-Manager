import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Movie } from "src/app/models/movie.model";

@Injectable({
    providedIn: "root",
})
export class MovieService {
    MOVIE_URL: string = "http://localhost:8080/movie";
    RATING_URL: string = "http://localhost:8080/rating";
    constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

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

    getbyList(idList: string[]) {
        return this.httpClient.get<Movie[]>(`${this.MOVIE_URL}/getByList?idList=${idList}`);
    }

    getRecomandations(idList: string[]) {
        return this.httpClient.get<Movie[]>(`${this.MOVIE_URL}/getRecomandations?idList=${idList}`);
    }

    getAll() {
        return this.httpClient.get<Movie[]>(`${this.MOVIE_URL}/getAll`);
    }

    addMovie(movie: any) {
        return this.httpClient.post<Movie | any>(
            `${this.MOVIE_URL}/addMovie`,
            {
                movie,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    editMovie(id: string | undefined, movie: any) {
        return this.httpClient.put<Movie | any>(
            `${this.MOVIE_URL}/editMovie/${id}`,
            {
                movie,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    deleteMovie(id: string) {
        return this.httpClient.delete<any>(`${this.MOVIE_URL}/deleteMovie/${id}`, {
            headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
        });
    }

    getAverageMovieScore(id: string) {
        return this.httpClient.get<{ _id: string; averageScore: number }[]>(
            `${this.RATING_URL}/getAverageMovieRating/${id}`
        );
    }
    getTopMovies() {
        return this.httpClient.get<Movie[]>(`${this.MOVIE_URL}/getTopMovies`);
    }
}
