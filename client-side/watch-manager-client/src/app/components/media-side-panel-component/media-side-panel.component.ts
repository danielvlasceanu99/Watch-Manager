import { Component, Input, OnInit } from "@angular/core";
import { Genre } from "src/app/models/genre.model";
import { MovieCredit } from "src/app/models/movie-credit.model";

@Component({
    selector: "app-media-side-panel",
    templateUrl: "./media-side-panel.component.html",
    styleUrls: ["./media-side-panel.component.scss"],
})
export class MediaSidePanelComponent implements OnInit {
    @Input() posterPath: string | undefined = "";
    @Input() status: string | undefined = "";
    @Input() producers: MovieCredit[] = [];
    @Input() network: string | null = null;
    @Input() genres: Genre[] | undefined = [];

    constructor() {}

    ngOnInit(): void {}
}
