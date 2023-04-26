import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { User } from "src/app/models/user.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { SessionService } from "src/app/services/session-service/session.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-user-watched",
    templateUrl: "./user-watched.component.html",
    styleUrls: ["./user-watched.component.scss"],
    animations: [
        trigger("detailExpand", [
            state("collapsed", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")),
        ]),
    ],
})
export class UserWatchedComponent implements OnInit {
    tvShows: Tv[] = [];
    movies: Movie[] = [];
    user: User | null = null;

    tvMediaType: MediaType = MediaType.TV;
    movieMediaType: MediaType = MediaType.MOVIE;

    isLoading: Boolean = false;

    movieDataSource: Movie[] = [];
    tvDataSource: Tv[] = [];
    movieColumnsToDisplay = ["title", "tagline", "status", "release_date"];
    tvColumnsToDisplay = ["name", "tagline", "in_production", "first_air_date"];
    movieColumnsToDisplayWithExpand = [...this.movieColumnsToDisplay, "expand"];
    tvColumnsToDisplayWithExpand = [...this.tvColumnsToDisplay, "expand"];
    movieExpandedElement: Movie | null = this.movies[0];
    tvExpandedElement: Tv | null = this.tvShows[0];

    constructor(
        private tvService: TvService,
        private movieService: MovieService,
        private session: SessionService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.getMovies();
            this.getTvShows();
        });
    }

    getMovies() {
        if (this.user?.watchedMovies !== undefined) {
            this.isLoading = true;
            this.movieService.getbyList(this.user?.watchedMovies).subscribe((res) => {
                this.movies = res;
                this.movieDataSource = this.movies;
                this.isLoading = false;
            });
        }
    }

    getTvShows() {
        if (this.user?.watchedTvs !== undefined) {
            this.isLoading = true;
            this.tvService.getbyList(this.user?.watchedTvs).subscribe((res) => {
                this.tvShows = res;
                this.tvDataSource = this.tvShows;
                this.isLoading = false;
            });
        }
    }
}
