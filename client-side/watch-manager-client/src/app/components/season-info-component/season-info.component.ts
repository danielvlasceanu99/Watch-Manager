import { Component, OnInit, Input } from "@angular/core";
import { Episode } from "src/app/models/episode.model";

@Component({
    selector: "app-season-info",
    templateUrl: "./season-info.component.html",
    styleUrls: ["./season-info.component.scss"],
})
export class SeasonInfoComponent implements OnInit {
    @Input() seasonId: string | undefined = "";
    @Input() name: string | undefined = "";
    @Input() air_date: Date | undefined = new Date();
    @Input() overview: string | undefined = "";
    @Input() posterPath: string | undefined = "";
    @Input() episodes: Episode[] | undefined = [];

    expanded: Boolean = false;

    constructor() {}

    ngOnInit(): void {}

    expandAndCollapse() {
        this.expanded = !this.expanded;
    }
}
