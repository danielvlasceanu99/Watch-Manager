import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Review } from "src/app/models/review.model";

@Injectable({
    providedIn: "root",
})
export class ReviewService {
    REVIEW_URL: string = "http://localhost:8080/review";
    constructor(private httpClient: HttpClient) {}

    getByMovieId(movie_id: string) {
        return this.httpClient.get<Review[]>(`${this.REVIEW_URL}/getByMovieId/${movie_id}`);
    }
}
