import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { MovieService } from "src/app/services/movie-service/movie.service";

@Component({
    selector: "app-movies",
    templateUrl: "./movies.component.html",
    styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit {
    movies: Movie[] = [];
    moviesAreLoading: Boolean = false;

    gender: string = "";
    title: string = "";
    page: number = 0;
    pageSize: number = 0;
    movieCount: number = 0;

    movieMediaType: MediaType = MediaType.MOVIE;

    isFiltering: Boolean = false;

    formGroup = new FormGroup({
        title: new FormControl(this.title, [Validators.maxLength(100), Validators.pattern("[a-zA-Z0-9 ]*")]),
    });

    pageEvent: PageEvent = new PageEvent();

    get getTitle(): AbstractControl | null {
        return this.formGroup.get("title");
    }

    constructor(private movieService: MovieService) {}

    ngOnInit(): void {
        this.search();
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.page = e.pageIndex;

        if (this.isFiltering) {
            this.filter();
        } else {
            this.search();
        }
    }

    onFilterApplied(gender: string) {
        this.gender = gender;
        this.page = 0;
        this.filter();
        this.isFiltering = true;
        this.getTitle?.setValue("");
    }

    onSearch() {
        if (!this.formGroup.invalid) {
            this.title = this.getTitle?.value;
            this.page = 0;
            this.search();
            this.isFiltering = false;
        }
    }

    filter() {
        this.moviesAreLoading = true;
        this.movieService.filter(this.page, this.gender).subscribe((res) => {
            this.movies = res["movies"];
            this.movieCount = res["movieCount"];
            this.pageSize = res["limit"];
            this.moviesAreLoading = false;
        });
    }

    search() {
        this.moviesAreLoading = true;
        this.movieService.search(this.page, this.title).subscribe((res) => {
            this.movies = res["movies"];
            this.movieCount = res["movieCount"];
            this.pageSize = res["limit"];
            this.moviesAreLoading = false;
        });
    }
}
