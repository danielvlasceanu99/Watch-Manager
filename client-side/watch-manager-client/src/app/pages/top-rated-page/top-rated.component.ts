import { Component, OnInit } from "@angular/core";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-top-rated",
    templateUrl: "./top-rated.component.html",
    styleUrls: ["./top-rated.component.scss"],
})
export class TopRatedComponent implements OnInit {
    tvShows: Tv[] = [];
    movies: Movie[] = [];

    tvMediaType: MediaType = MediaType.TV;
    movieMediaType: MediaType = MediaType.MOVIE;

    isLoading: Boolean = false;

    constructor(private movieService: MovieService, private tvService: TvService) {}

    ngOnInit(): void {
        this.getTvShows();
        this.getMovies();
    }

    getTvShows() {
        this.isLoading = true;
        this.tvService.getTopTv().subscribe((res) => {
            this.tvShows = res;
            this.isLoading = false;
        });
    }

    getMovies() {
        this.isLoading = true;
        this.movieService.getTopMovies().subscribe((res) => {
            this.movies = res;
            this.isLoading = false;
        });
    }
}
