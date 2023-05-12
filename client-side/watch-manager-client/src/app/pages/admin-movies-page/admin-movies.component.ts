import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Movie } from "src/app/models/movie.model";
import { User } from "src/app/models/user.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { SessionService } from "src/app/services/session-service/session.service";
import { MovieDetailsComponent } from "../movie-details-page/movie-details.component";
import { MovieDialogComponent } from "src/app/components/movie-dialog-component/movie-dialog.component";
import { ConfirmActionDialogComponent } from "src/app/components/confirm-action-dialog-component/confirm-action-dialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-admin-movies",
    templateUrl: "./admin-movies.component.html",
    styleUrls: ["./admin-movies.component.scss"],
})
export class AdminMoviesComponent implements OnInit {
    movies: Movie[] = [];
    user: User | null = null;
    dataSource = new MatTableDataSource(this.movies);

    isLoading: Boolean = false;

    displayedColumns = [
        "title",
        // "tagline",
        "runtime",
        "release_date",
        "status",
        "created_by",
        "last_changed_by",
        "created_at",
        "last_changed_at",
        "actions",
    ];
    constructor(
        private movieService: MovieService,
        private session: SessionService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.getMovies();
        });
    }

    getMovies() {
        this.movieService.getAll().subscribe((movies) => {
            this.movies = movies;
            this.dataSource = new MatTableDataSource(this.movies);
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddDialog() {
        const dialogRef = this.dialog.open(MovieDialogComponent, {
            width: "800px",
            minWidth: "300px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.movies.unshift(result);
                this.dataSource = new MatTableDataSource(this.movies);
            }
        });
    }

    openEditDialog(element: Movie) {
        const index = this.movies.indexOf(element);

        const dialogRef = this.dialog.open(MovieDialogComponent, {
            data: { movie: element },
            width: "800px",
            minWidth: "300px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.movies[index] = result;
                this.dataSource = new MatTableDataSource(this.movies);
            }
        });
    }

    delete(element: Movie) {
        const index = this.movies.indexOf(element);
        const dialogRef = this.dialog.open(ConfirmActionDialogComponent, {
            data: { message: `Are you shure you want to delete ${element.title}?` },
            width: "300px",
            minWidth: "150px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.movieService.deleteMovie(element.id).subscribe({
                    next: (res) => {
                        this.movies.splice(index, 1);
                        this.dataSource = new MatTableDataSource(this.movies);
                    },
                    error: (err) => {
                        this._snackBar.open("Something went wrong!", "OK");
                    },
                });
            }
        });
    }
}
