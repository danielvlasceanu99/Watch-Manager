import { Component, Input, OnInit } from "@angular/core";
import { Genre } from "src/app/models/genre.model";
import { Credit } from "src/app/models/credit.model";

@Component({
    selector: "app-media-side-panel",
    templateUrl: "./media-side-panel.component.html",
    styleUrls: ["./media-side-panel.component.scss"],
})
export class MediaSidePanelComponent implements OnInit {
    @Input() posterPath: string | undefined = "";
    @Input() status: string | undefined = "";
    @Input() producers: Credit[] = [];
    @Input() network: string | undefined = undefined;
    @Input() genres: Genre[] | undefined = [];

    constructor() {}

    ngOnInit(): void {
        console.log("network", this.network);
    }
}
