import { Component, OnInit, Input } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { UserColections } from "src/app/models/helpers/user-collection.model";
import { UserRoles } from "src/app/models/helpers/user-roles.model";
import { User } from "src/app/models/user.model";
import { SessionService } from "src/app/services/session-service/session.service";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-episode-info",
    templateUrl: "./episode-info.component.html",
    styleUrls: ["./episode-info.component.scss"],
})
export class EpisodeInfoComponent implements OnInit {
    @Input() episodeId: string | undefined = "";
    @Input() name: string | undefined = "";
    @Input() air_date: Date | undefined = new Date();
    @Input() overview: string | undefined = "";
    @Input() posterPath: string | undefined = "";

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
            if (this.episodeId) {
                this.isWatched = this.user?.watchedEpisodes.includes(this.episodeId) ? true : false;
            }
        });
    }

    markAsWatched() {
        if (this.episodeId) {
            this.isWatched = true;
            this.userService.addToCollection(this.episodeId, UserColections.WATCHED_EPISODES).subscribe({
                next: (res) => {
                    if (this.user && this.episodeId) {
                        this.user.watchedEpisodes.push(this.episodeId);
                        this.session.setUser(this.user);
                    }
                },
                error: (error) => {
                    this.isWatched = false;
                    if (error.status === 401 || error.status === 404) {
                        this.router.navigate(["/login"]);
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
    markAsUnwatched() {
        if (this.episodeId) {
            this.isWatched = false;

            this.userService.removeFromCollection(this.episodeId, UserColections.WATCHED_EPISODES).subscribe({
                next: (res) => {
                    if (this.user && this.episodeId) {
                        const index = this.user.watchedEpisodes.indexOf(this.episodeId);
                        if (index > -1) {
                            this.user.watchedEpisodes.splice(index, 1);
                            this.session.setUser(this.user);
                        }
                    }
                },
                error: (error) => {
                    this.isWatched = true;
                    this._snackBar.open("There was an error. Please try again!", "OK", {
                        panelClass: "snack-bar-err",
                        duration: 2000,
                    });
                },
            });
        }
    }
}
