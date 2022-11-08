import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Review } from "src/app/models/review.model";

@Component({
    selector: "app-review-list",
    templateUrl: "./review-list.component.html",
    styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
    postedReview: Review | null = null;
    formGroup = new FormGroup({
        review: new FormControl(this.postedReview?.content, [Validators.required, Validators.maxLength(500)]),
    });
    get review(): AbstractControl | null {
        return this.formGroup.get("review");
    }

    @Input() reviews: Review[] = [];

    constructor() {}

    ngOnInit(): void {}
}
