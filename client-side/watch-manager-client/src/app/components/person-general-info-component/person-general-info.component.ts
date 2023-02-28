import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-person-general-info",
    templateUrl: "./person-general-info.component.html",
    styleUrls: ["./person-general-info.component.scss"],
})
export class PersonGeneralInfoComponent implements OnInit {
    @Input() personId: string | null = "";
    @Input() name: string | undefined = "";
    @Input() biography: string | undefined = "";

    constructor() {}

    ngOnInit(): void {}
}
