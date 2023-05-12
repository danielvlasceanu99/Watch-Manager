import { Component, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Movie } from "src/app/models/movie.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { ConfirmActionDialogComponent } from "../confirm-action-dialog-component/confirm-action-dialog.component";

@Component({
    selector: "app-movie-dialog",
    templateUrl: "./movie-dialog.component.html",
    styleUrls: ["./movie-dialog.component.scss"],
})
export class MovieDialogComponent implements OnInit {
    movie: Movie | null = null;

    movieFormGroup = new FormGroup({
        title: new FormControl(this.data?.movie?.title, [Validators.required, Validators.maxLength(100)]),
        tagline: new FormControl(this.data?.movie?.tagline, [Validators.maxLength(150)]),
        overview: new FormControl(this.data?.movie?.overview, [Validators.maxLength(1000)]),
        runtime: new FormControl(this.data?.movie?.runtime, [Validators.min(0)]),
        release_date: new FormControl(this.data?.movie?.release_date),
        status: new FormControl(this.data?.movie?.status, [Validators.required]),
        budget: new FormControl(this.data?.movie?.budget, [Validators.min(10000)]),
        revenue: new FormControl(this.data?.movie?.revenue),
        poster_path: new FormControl(this.data?.movie?.poster_path, [Validators.required]),
    });

    get title(): AbstractControl | null {
        return this.movieFormGroup.get("title");
    }
    get tagline(): AbstractControl | null {
        return this.movieFormGroup.get("tagline");
    }
    get overview(): AbstractControl | null {
        return this.movieFormGroup.get("overview");
    }
    get runtime(): AbstractControl | null {
        return this.movieFormGroup.get("runtime");
    }
    get release_date(): AbstractControl | null {
        return this.movieFormGroup.get("release_date");
    }
    get status(): AbstractControl | null {
        return this.movieFormGroup.get("status");
    }
    get budget(): AbstractControl | null {
        return this.movieFormGroup.get("budget");
    }
    get revenue(): AbstractControl | null {
        return this.movieFormGroup.get("revenue");
    }
    get poster_path(): AbstractControl | null {
        return this.movieFormGroup.get("poster_path");
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { movie: Movie },
        private dialogRef: MatDialogRef<MovieDialogComponent>,
        private movieService: MovieService,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        if (this.data) {
            this.movie = this.data.movie;
        }
    }

    addMovie() {
        const movie = {
            title: this.title?.value,
            tagline: this.tagline?.value,
            overview: this.overview?.value,
            runtime: this.runtime?.value,
            release_date: this.release_date?.value,
            status: this.status?.value,
            budget: this.budget?.value,
            revenue: this.revenue?.value,
            poster_path: this.poster_path?.value,
        };

        this.movieService.addMovie(movie).subscribe({
            next: (response) => {
                if (response) {
                    this.dialogRef.close(response);
                } else {
                    response.forEach((err: string) => {
                        this._snackBar.open(err, "OK");
                    });
                }
            },
            error: (error) => {
                error.error.errors.forEach((err: string) => {
                    this._snackBar.open(err, "OK");
                });
            },
        });
    }
    editMovie() {
        const movie = {
            title: this.title?.value,
            tagline: this.tagline?.value,
            overview: this.overview?.value,
            runtime: this.runtime?.value,
            release_date: this.release_date?.value,
            status: this.status?.value,
            budget: this.budget?.value,
            revenue: this.revenue?.value,
            poster_path: this.poster_path?.value,
        };
        const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
            data: { message: `Are you shure you want to edit ${this.movie?.title}?` },
            width: "300px",
            minWidth: "150px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.movieService.editMovie(this.movie?.id, movie).subscribe({
                    next: (response) => {
                        if (response) {
                            this.dialogRef.close(response);
                        } else {
                            response.forEach((err: string) => {
                                this._snackBar.open(err, "OK");
                            });
                        }
                    },
                    error: (error) => {
                        error.error.errors.forEach((err: string) => {
                            this._snackBar.open(err, "OK");
                        });
                    },
                });
            } else {
                console.log("oopsie");
            }
        });
    }
}
