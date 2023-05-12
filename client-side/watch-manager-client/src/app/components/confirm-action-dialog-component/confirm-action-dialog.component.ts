import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "app-confirm-action-dialog",
    templateUrl: "./confirm-action-dialog.component.html",
    styleUrls: ["./confirm-action-dialog.component.scss"],
})
export class ConfirmActionDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { message: string },
        private dialogRef: MatDialogRef<ConfirmActionDialogComponent>
    ) {}

    ngOnInit(): void {}

    submit(val: boolean) {
        this.dialogRef.close(val);
    }
}
