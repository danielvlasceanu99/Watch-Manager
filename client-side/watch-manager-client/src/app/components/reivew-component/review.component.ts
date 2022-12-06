import { Component, Input, OnInit } from "@angular/core";
import { Review } from "src/app/models/review.model";

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

    constructor() {}

    ngOnInit(): void {}
}
