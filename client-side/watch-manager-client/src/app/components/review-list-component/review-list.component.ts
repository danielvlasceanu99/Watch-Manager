import { Component, Input, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Review } from "src/app/models/review.model";
import { ReviewService } from "src/app/services/review-service/review.service";

@Component({
    selector: "app-review-list",
    templateUrl: "./review-list.component.html",
    styleUrls: ["./review-list.component.scss"],
})
export class ReviewListComponent implements OnInit {
    postedReview: Review | null = null;
    reviewFormGroup = new FormGroup({
        reviewTitle: new FormControl(this.postedReview?.title, [Validators.required, Validators.maxLength(255)]),
        review: new FormControl(this.postedReview?.content, [Validators.required, Validators.maxLength(1000)]),
    });
    get reviewTitle(): AbstractControl | null {
        return this.reviewFormGroup.get("reviewTitle");
    }
    get review(): AbstractControl | null {
        return this.reviewFormGroup.get("review");
    }

    @Input() reviews: Review[] = [];
    @Input() mediaId: string | null = "";
    @Input() mediaType: MediaType | undefined = undefined;

    constructor(private router: Router, private reviewService: ReviewService, private _snackBar: MatSnackBar) {}

    ngOnInit(): void {}

    viewAllReviews() {
        this.router.navigate([`./${this.mediaType}/${this.mediaId}/reviews`]);
    }

    addReview() {
        console.log(this.mediaId, this.mediaType);
        if (this.mediaId && this.mediaType) {
            this.reviewService
                .addReview(this.reviewTitle?.value, this.review?.value, this.mediaType, this.mediaId)
                .subscribe({
                    next: (res) => {
                        this.reviews.unshift(res);
                        this.reviewTitle?.setValue(" ");
                        this.review?.setValue(" ");
                    },
                    error: (error) => {
                        if (error.status === 401) {
                            this.router.navigate(["/login"]);
                        } else {
                            this._snackBar.open("There was an error posting your review. Please try again!", "OK", {
                                panelClass: "snack-bar-err",
                                duration: 2000,
                            });
                        }
                    },
                });
        }
    }
}
