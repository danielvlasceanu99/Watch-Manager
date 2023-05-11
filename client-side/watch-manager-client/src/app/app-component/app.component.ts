import { Component, OnInit } from "@angular/core";
import { SessionService } from "../services/session-service/session.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../services/user-service/user.service";
import { User } from "../models/user.model";
import { UserRoles } from "../models/helpers/user-roles.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    title = "watch-manager-client";
    user: User | null = null;
    isAdmin: boolean = false;

    constructor(
        private router: Router,
        private session: SessionService,
        private cookieService: CookieService,
        private userService: UserService
    ) {}

    ngOnInit() {
        if (this.cookieService.get("auth-token")) {
            this.userService.getUser().subscribe({
                next: (response) => {
                    this.session.setUser(response.user);
                },
            });
        }
        this.session.userObservable.subscribe((user) => {
            this.user = user;
            if (this.user?.role == UserRoles.ADMIN) {
                this.isAdmin = true;
            }
        });
    }

    logout() {
        this.cookieService.delete("auth-token");
        this.session.clearUser();
        this.router.navigate(["./home"]);
    }
}
