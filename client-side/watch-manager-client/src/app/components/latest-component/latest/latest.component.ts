import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-latest",
    templateUrl: "./latest.component.html",
    styleUrls: ["./latest.component.scss"],
})
export class LatestComponent implements OnInit {
    tvShows: Tv[] = [];
    movies: Movie[] = [];

    isLoading: Boolean = false;

    constructor(private movieService: MovieService, private tvService: TvService) {}

    ngOnInit(): void {
        this.getTvShows();
    }

    getTvShows() {
        this.isLoading = true;
        this.tvService.getLatest().subscribe((res) => {
            this.tvShows = res;
            this.isLoading = false;
        });
    }

    getMovies() {
        this.isLoading = true;
        this.movieService.getLatest().subscribe((res) => {
            this.movies = res;
            this.isLoading = false;
        });
    }

    onTabChanged() {
        if (this.movies.length === 0) {
            this.getMovies();
        }
    }
}
