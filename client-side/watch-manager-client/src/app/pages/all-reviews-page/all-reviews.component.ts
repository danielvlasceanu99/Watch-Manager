import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Review } from "src/app/models/review.model";
import { Tv } from "src/app/models/tv.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { ReviewService } from "src/app/services/review-service/review.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-all-reviews",
    templateUrl: "./all-reviews.component.html",
    styleUrls: ["./all-reviews.component.scss"],
})
export class AllReviewsComponent implements OnInit {
    movie: Movie | null = null;
    tv: Tv | null = null;
    reviews: Review[] = [];

    id: string | null = "";

    isLoading: Boolean = false;
    reviewsAreLoading: Boolean = false;

    posterPath: string = "";
    title: string = "";
    date: Date = new Date();

    constructor(
        private movieService: MovieService,
        private tvService: TvService,
        private reviewService: ReviewService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });
        let mediaType = this.route.snapshot.url[0].path;

        if (mediaType === MediaType.MOVIE) {
            this.getMovie();
            this.getMovieReviews();
        } else {
            this.getTv();
            this.getTvReviews();
        }
    }

    getMovie() {
        this.isLoading = true;
        if (this.id) {
            this.movieService.getById(this.id).subscribe((res) => {
                this.movie = res;
                this.posterPath = this.movie.poster_path;
                this.title = this.movie.title;
                this.date = this.movie.release_date;
                this.isLoading = false;
            });
        }
    }

    getMovieReviews() {
        this.reviewsAreLoading = true;
        if (this.id) {
            this.reviewService.getByMovieId(this.id).subscribe((res) => {
                this.reviews = res;
                this.reviewsAreLoading = false;
            });
        }
    }
    getTv() {
        this.isLoading = true;
        if (this.id) {
            this.tvService.getById(this.id).subscribe((res) => {
                this.tv = res;
                this.posterPath = this.tv.poster_path;
                this.title = this.tv.name;
                this.date = this.tv.first_air_date;
                this.isLoading = false;
            });
        }
    }

    getTvReviews() {
        this.reviewsAreLoading = true;
        if (this.id) {
            this.reviewService.getByTvId(this.id).subscribe((res) => {
                this.reviews = res;
                this.reviewsAreLoading = false;
            });
        }
    }
}
