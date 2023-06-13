import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Credit } from "src/app/models/credit.model";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Review } from "src/app/models/review.model";
import { Season } from "src/app/models/season.model";
import { Tv } from "src/app/models/tv.model";
import { PersonService } from "src/app/services/person-service/person.service";
import { ReviewService } from "src/app/services/review-service/review.service";
import { SeasonService } from "src/app/services/season-service/season.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-tv-details",
    templateUrl: "./tv-details.component.html",
    styleUrls: ["./tv-details.component.scss"],
})
export class TvDetailsComponent implements OnInit {
    tv: Tv | null = null;
    reviews: Review[] = [];
    cast: Credit[] = [];
    producers: Credit[] = [];
    seasons: Season[] = [];

    rating: number | undefined = 0;

    mediaType: MediaType = MediaType.TV;

    id: string | null = "";

    tvIsLoading: Boolean = false;
    reviewsAreLoading: Boolean = false;
    creditsAreLoading: Boolean = false;
    seasonsAreLoading: Boolean = false;

    constructor(
        private tvService: TvService,
        private reviewService: ReviewService,
        private personService: PersonService,
        private seasonService: SeasonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });

        this.getTv();
        this.getReviews();
        this.getCredits();
        this.getAverageRating();
        this.getSeasons();
    }

    getTv() {
        this.tvIsLoading = true;
        if (this.id) {
            this.tvService.getById(this.id).subscribe((res) => {
                this.tv = res;
                this.tvIsLoading = false;
            });
        }
    }

    getReviews() {
        this.reviewsAreLoading = true;
        if (this.id) {
            this.reviewService.getByTvId(this.id).subscribe((res) => {
                this.reviews = res;
                this.reviewsAreLoading = false;
            });
        }
    }

    getCredits() {
        this.creditsAreLoading = true;
        if (this.id) {
            this.personService.getByTvId(this.id).subscribe((res) => {
                this.cast = res;
                this.producers = this.cast.filter((credit) => credit.job === "Producer");
                this.creditsAreLoading = false;
            });
        }
    }

    getSeasons() {
        this.seasonsAreLoading = true;
        if (this.id) {
            this.seasonService.getByTvId(this.id).subscribe((res) => {
                this.seasons = res;
            });
        }
    }

    getAverageRating() {
        if (this.id) {
            this.tvService.getAverageTvScore(this.id).subscribe((res) => {
                if (res.length) {
                    this.rating = res[0].averageScore;
                    console.log(this.rating);
                }
            });
        }
    }
}
