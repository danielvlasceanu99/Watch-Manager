import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-rating-dialog",
    templateUrl: "./rating-dialog.component.html",
    styleUrls: ["./rating-dialog.component.scss"],
})
export class RatingDialogComponent implements OnInit {
    ratingArr: number[] = [];

    constructor(
        public dialogRef: MatDialogRef<RatingDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { rating: number }
    ) {}

    ngOnInit(): void {
        for (let index = 0; index < 10; index++) {
            this.ratingArr.push(index);
        }
    }

    showIcon(index: number) {
        if (this.data.rating >= index + 1) {
            return "star";
        } else {
            return "star_border";
        }
    }

    rate(rating: number) {
        this.data.rating = rating;
    }
}
