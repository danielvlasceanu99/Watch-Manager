import { Component, OnInit, Input } from "@angular/core";
import { Season } from "src/app/models/season.model";

@Component({
    selector: "app-season-group",
    templateUrl: "./season-group.component.html",
    styleUrls: ["./season-group.component.scss"],
})
export class SeasonGroupComponent implements OnInit {
    @Input() seasons: Season[] = [];

    constructor() {}

    ngOnInit(): void {}
}
