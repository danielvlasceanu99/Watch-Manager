import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Credit } from "src/app/models/credit.model";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { PersonService } from "src/app/services/person-service/person.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-all-cast",
    templateUrl: "./all-cast.component.html",
    styleUrls: ["./all-cast.component.scss"],
})
export class AllCastComponent implements OnInit {
    movie: Movie | null = null;
    tv: Tv | null = null;
    cast: Credit[] = [];

    id: string | null = "";
    mediaType: MediaType | undefined = undefined;

    isLoading: Boolean = false;
    creditsAreLoading: Boolean = false;

    posterPath: string = "";
    title: string = "";
    date: Date = new Date();

    constructor(
        private movieService: MovieService,
        private tvService: TvService,
        private personService: PersonService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });
        let type = this.route.snapshot.url[0].path;

        if (type === MediaType.MOVIE) {
            this.getMovie();
            this.getMovieCredits();
            this.mediaType = MediaType.MOVIE;
        } else {
            this.getTv();
            this.getTvCredits();
            this.mediaType = MediaType.TV;
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

    getMovieCredits() {
        this.creditsAreLoading = true;
        if (this.id) {
            this.personService.getByTvId(this.id).subscribe((res) => {
                this.cast = res;
                this.creditsAreLoading = false;
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

    getTvCredits() {
        this.creditsAreLoading = true;
        if (this.id) {
            this.personService.getByTvId(this.id).subscribe((res) => {
                this.cast = res;
                this.creditsAreLoading = false;
            });
        }
    }
}
