import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Review } from "src/app/models/review.model";

@Injectable({
    providedIn: "root",
})
export class ReviewService {
    REVIEW_URL: string = "http://localhost:8080/review";
    constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

    getByMovieId(movie_id: string) {
        return this.httpClient.get<Review[]>(`${this.REVIEW_URL}/getByMovieId/${movie_id}`);
    }

    getByTvId(tv_id: string) {
        return this.httpClient.get<Review[]>(`${this.REVIEW_URL}/getByTvId/${tv_id}`);
    }

    addReview(reviewTitle: string, reviewContent: string, mediaType: MediaType, mediaId: String) {
        return this.httpClient.post<Review>(
            `${this.REVIEW_URL}/addReview`,
            {
                title: reviewTitle,
                content: reviewContent,
                mediaType: mediaType,
                mediaId: mediaId,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }
}
