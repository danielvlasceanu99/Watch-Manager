import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Movie } from "src/app/models/movie.model";
import { Review } from "src/app/models/review.model";
import { Tv } from "src/app/models/tv.model";
import { User } from "src/app/models/user.model";
import { MovieService } from "src/app/services/movie-service/movie.service";
import { ReviewService } from "src/app/services/review-service/review.service";
import { SessionService } from "src/app/services/session-service/session.service";
import { TvService } from "src/app/services/tv-service/tv.service";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-user-liked",
    templateUrl: "./user-liked.component.html",
    styleUrls: ["./user-liked.component.scss"],
})
export class UserLikedComponent implements OnInit {
    id: string | null = "";
    name: string = "";
    movies: Movie[] = [];
    tvShows: Tv[] = [];
    reviews: Review[] = [];

    isLoading: Boolean = false;
    isFollowed: boolean = false;

    user: User | null = null;
    picture: string = "";

    movieMediaType: MediaType = MediaType.MOVIE;
    tvMediaType: MediaType = MediaType.TV;

    constructor(
        private movieService: MovieService,
        private tvService: TvService,
        private userService: UserService,
        private reviewService: ReviewService,
        private route: Router,
        private activeRouter: ActivatedRoute,
        private session: SessionService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            this.activeRouter.paramMap.subscribe((params: ParamMap) => {
                this.id = params.get("id");
                if (this.id && this.user?.followedUsers.includes(this.id)) {
                    this.isFollowed = true;
                }
            });

            if (this.id) {
                this.isLoading = true;

                this.userService.getUserLiked(this.id).subscribe((res) => {
                    this.name = res.name;
                    this.picture = this.userService.getProfilePicture(this.name);
                    this.movieService.getbyList(res.likedMovies).subscribe((res) => {
                        this.movies = res;
                    });

                    this.tvService.getbyList(res.likedTv).subscribe((res) => {
                        this.tvShows = res;
                    });
                    this.isLoading = false;
                });

                this.reviewService.getByUserId(this.id).subscribe((res) => {
                    this.reviews = res;
                });
            }
        });
    }

    follow() {
        if (this.id) {
            this.isFollowed = true;

            this.userService.follow(this.id).subscribe({
                next: (res) => {
                    if (this.user && this.id) {
                        this.user["followedUsers"].push(this.id);
                        this.session.setUser(this.user);
                    }
                },
                error: (error) => {
                    this.isFollowed = false;
                    if (error.status === 401 || error.status === 404) {
                        this.route.navigate(["/login"]);
                    } else {
                        this._snackBar.open("There was an error. Please try again!", "OK", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    }
                },
            });
        }
    }

    unfollow() {
        if (this.id) {
            this.isFollowed = false;
            this.userService.unfollow(this.id).subscribe({
                next: (res) => {
                    if (this.user && this.id) {
                        const index = this.user["followedUsers"].indexOf(this.id);
                        if (index > -1) {
                            this.user["followedUsers"].splice(index, 1);
                            this.session.setUser(this.user);
                        }
                    }
                },
                error: (error) => {
                    this.isFollowed = true;
                    this._snackBar.open("There was an error. Please try again!", "OK", {
                        panelClass: "snack-bar-err",
                        duration: 2000,
                    });
                },
            });
        }
    }
}
