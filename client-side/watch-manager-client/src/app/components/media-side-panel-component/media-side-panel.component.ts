import { Component, Input, OnInit } from "@angular/core";
import { Genre } from "src/app/models/genre.model";
import { Credit } from "src/app/models/credit.model";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { SessionService } from "src/app/services/session-service/session.service";
import { User } from "src/app/models/user.model";
import { UserRoles } from "src/app/models/helpers/user-roles.model";
import { UserService } from "src/app/services/user-service/user.service";
import { UserColections } from "src/app/models/helpers/user-collection.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
    selector: "app-media-side-panel",
    templateUrl: "./media-side-panel.component.html",
    styleUrls: ["./media-side-panel.component.scss"],
})
export class MediaSidePanelComponent implements OnInit {
    @Input() mediaId: string | undefined = "";
    @Input() mediaStatus: string | undefined = "";
    @Input() mediaProducers: Credit[] = [];
    @Input() mediaNetwork: string | undefined = undefined;
    @Input() MediaGenres: Genre[] | undefined = [];
    @Input() mediaPoster: string | undefined = "";
    @Input() mediaType: MediaType | undefined = undefined;

    isFavourite: boolean = false;
    isBookmarked: boolean = false;
    isRated: boolean = false;
    isWatched: boolean = false;

    user: User | null = null;
    isAdmin: boolean = false;

    constructor(
        private session: SessionService,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            if (this.user?.role == UserRoles.ADMIN) {
                this.isAdmin = true;
            }
            if (this.mediaType == MediaType.MOVIE && this.mediaId) {
                this.isFavourite = this.user?.likedMovies.includes(this.mediaId) ? true : false;
                this.isBookmarked = this.user?.movieWatchlist.includes(this.mediaId) ? true : false;
                this.isRated = this.user?.ratedMovies.some((movie) => movie.id === this.mediaId) ? true : false;
                this.isWatched = this.user?.watchedMovies.includes(this.mediaId) ? true : false;
            } else if (this.mediaType == MediaType.TV && this.mediaId) {
                this.isFavourite = this.user?.likedTv.includes(this.mediaId) ? true : false;
                this.isBookmarked = this.user?.tvWatchlist.includes(this.mediaId) ? true : false;
                this.isRated = this.user?.ratedTv.some((tv) => tv.id === this.mediaId) ? true : false;
                this.isWatched = this.user?.watchedMovies.includes(this.mediaId) ? true : false;
            }
        });
    }

    addToFavourite() {
        if (this.mediaId) {
            this.isFavourite = true;
            const collection =
                this.mediaType === MediaType.MOVIE ? UserColections.LIKED_MOVIES : UserColections.LIKED_TV;

            this.userService.addToCollection(this.mediaId, collection).subscribe({
                next: (res) => {
                    this.session.userObservable.subscribe((user) => {
                        if (user) {
                            user[collection].push(this.mediaId);
                            this.session.setUser(user);
                        }
                    });
                },
                error: (error) => {
                    this.isFavourite = false;
                    if (error.status === 401 || error.status === 404) {
                        this.router.navigate(["/login"]);
                    } else {
                        this._snackBar.open(error.error.message, "", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    }
                },
            });
        }
    }
    removeFromFavourite() {
        if (this.mediaId) {
            this.isFavourite = false;
            const collection =
                this.mediaType === MediaType.MOVIE ? UserColections.LIKED_MOVIES : UserColections.LIKED_TV;

            this.userService.removeFromCollection(this.mediaId, collection).subscribe({
                next: (res) => {
                    this.session.userObservable.subscribe((user) => {
                        if (user) {
                            const index = user[collection].indexOf(this.mediaId);
                            if (index > -1) {
                                user[collection].splice(index, 1);
                                this.session.setUser(user);
                            }
                        }
                    });
                },
                error: (error) => {
                    this.isFavourite = true;

                    this._snackBar.open(error.error.message, "", {
                        panelClass: "snack-bar-err",
                        duration: 2000,
                    });
                },
            });
        }
    }

    addToWatchlist() {}
    removeFromWatchlist() {}

    rate() {}

    addToWatched() {}
    removeFromWatched() {}
}
