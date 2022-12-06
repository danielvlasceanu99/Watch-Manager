import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Review } from "src/app/models/review.model";

@Component({
    selector: "app-review-list",
    templateUrl: "./review-list.component.html",
    styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
    postedReview: Review | null = null;
    formGroup = new FormGroup({
        review: new FormControl(this.postedReview?.content, [Validators.required, Validators.maxLength(1000)]),
    });
    get review(): AbstractControl | null {
        return this.formGroup.get("review");
    }

    @Input() reviews: Review[] = [];
    @Input() mediaId: string | null = "";
    @Input() mediaType: MediaType | undefined = undefined;

    constructor() {}

    ngOnInit(): void {}
}
