import { Component, Input, OnInit } from "@angular/core";
import { Genre } from "src/app/models/genre.model";
import { MovieCredit } from "src/app/models/movie-credit.model";
import { Review } from "src/app/models/review.model";

@Component({
    selector: "app-media-side-panel",
    templateUrl: "./media-side-panel.component.html",
    styleUrls: ["./media-side-panel.component.scss"],
})
export class MediaSidePanelComponent implements OnInit {
    @Input() posterPath: string = "";
    @Input() status: string = "";
    @Input() producers: MovieCredit[] = [];
    @Input() network: string | null = null;
    @Input() genres: Genre[] = [];

    constructor() {}

    ngOnInit(): void {}
}
