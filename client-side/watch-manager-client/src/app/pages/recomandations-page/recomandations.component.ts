import { Component, OnInit } from "@angular/core";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { User } from "src/app/models/user.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { SessionService } from "src/app/services/session-service/session.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-recomandations",
    templateUrl: "./recomandations.component.html",
    styleUrls: ["./recomandations.component.scss"],
})
export class RecomandationsComponent implements OnInit {
    user: User | null = null;
    tvShows: Tv[] = [];
    movies: Movie[] = [];

    tvMediaType: MediaType = MediaType.TV;
    movieMediaType: MediaType = MediaType.MOVIE;

    isLoading: Boolean = false;

    constructor(private movieService: MovieService, private tvService: TvService, private session: SessionService) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.getTvShowsRecpmandations();
            this.getMoviesRecomandations();
        });
    }

    getTvShowsRecpmandations() {
        this.isLoading = true;
        if (this.user?.likedTv) {
            this.tvService.getRecomandations(this.user?.likedTv).subscribe((res) => {
                this.tvShows = res;
                this.isLoading = false;
            });
        }
    }

    getMoviesRecomandations() {
        this.isLoading = true;
        if (this.user?.likedMovies) {
            this.movieService.getLatest().subscribe((res) => {
                this.movies = res;
                this.isLoading = false;
            });
        }
    }
}
