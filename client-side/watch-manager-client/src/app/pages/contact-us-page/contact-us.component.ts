import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "app-contact-us",
    templateUrl: "./contact-us.component.html",
    styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
    formGroup = new FormGroup({
        comment: new FormControl("", [Validators.maxLength(2500)]),
    });
    get comment(): AbstractControl | null {
        return this.formGroup.get("comment");
    }
    constructor(private snackBar: MatSnackBar) {}

    ngOnInit(): void {}

    postComment() {
        this.comment?.setValue("");
        this.snackBar.open("Thank you for your feedback!", "OK");
    }
}
