import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MovieCredit } from "src/app/models/movie-credit.model";
import { Movie } from "src/app/models/movie.model";
import { Review } from "src/app/models/review.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { PersonService } from "src/app/services/person-service/person.service";
import { ReviewService } from "src/app/services/review-service/review.service";

@Component({
    selector: "app-movie-details",
    templateUrl: "./movie-details.component.html",
    styleUrls: ["./movie-details.component.scss"],
})
export class MovieDetailsComponent implements OnInit {
    movie: Movie | null = null;
    reviews: Review[] = [];
    cast: MovieCredit[] = [];
    producers: MovieCredit[] = [];

    id: string | null = "";

    movieIsLoading: Boolean = false;
    reviewIsLoading: Boolean = false;
    creditIsLoading: Boolean = false;

    constructor(
        private movieService: MovieService,
        private reviewService: ReviewService,
        private personService: PersonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });

        this.getMovie();
        this.getReviews();
        this.getCredits();
    }

    getMovie() {
        this.movieIsLoading = true;
        if (this.id) {
            this.movieService.getById(this.id).subscribe((res) => {
                this.movie = res;
                this.movieIsLoading = false;
            });
        }
    }

    getReviews() {
        this.reviewIsLoading = true;
        if (this.id) {
            this.reviewService.getByMovieId(this.id).subscribe((res) => {
                this.reviews = res;
                this.reviewIsLoading = false;
            });
        }
    }

    getCredits() {
        this.creditIsLoading = true;
        if (this.id) {
            this.personService.getByMovieId(this.id).subscribe((res) => {
                this.cast = res;
                this.producers = this.cast.filter((credit) => credit.job === "Producer");
                this.creditIsLoading = false;
            });
        }
    }
}
