import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-person-side-panel",
    templateUrl: "./person-side-panel.component.html",
    styleUrls: ["./person-side-panel.component.scss"],
})
export class PersonSidePanelComponent implements OnInit {
    @Input() posterPath: string | undefined = "";
    @Input() gender: string | undefined = "";
    @Input() dateOfBirth: string | undefined = "";
    @Input() dateOfDeath: string | undefined = "";
    @Input() birthPlace: string | undefined = "";
    constructor() {}

    ngOnInit(): void {}
}
