import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-followed",
    templateUrl: "./followed.component.html",
    styleUrls: ["./followed.component.scss"],
})
export class FollowedComponent implements OnInit {
    followedUsers: { _id: string; name: string }[] = [];
    isLoading: boolean = false;

    constructor(private userService: UserService, private router: Router) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.userService.getAllFollowed().subscribe((res) => {
            this.followedUsers = res;
            this.isLoading = false;
        });
    }
}
