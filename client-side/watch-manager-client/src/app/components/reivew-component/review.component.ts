import { Component, Input, OnInit } from "@angular/core";
import { Review } from "src/app/models/review.model";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-review",
    templateUrl: "./review.component.html",
    styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
    @Input() mediaId: string | null = "";
    @Input() title: string | undefined = "";
    @Input() created_at: Date | undefined = new Date();
    @Input() last_changed_at: Date | undefined = new Date();
    @Input() user_name: string | undefined = "";
    @Input() content: string | undefined = "";
    @Input() createdBy: string | undefined = "";

    picture: string = "";

    constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.picture = this.userService.getProfilePicture(this.user_name);
    }
}
