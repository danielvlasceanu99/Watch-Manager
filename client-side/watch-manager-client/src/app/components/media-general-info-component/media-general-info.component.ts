import { Component, Input, OnInit } from "@angular/core";
import { Media } from "src/app/models/helpers/media.moedl";
import { Movie } from "src/app/models/movie.model";

@Component({
    selector: "app-media-general-info",
    templateUrl: "./media-general-info.component.html",
    styleUrls: ["./media-general-info.component.scss"],
})
export class MediaGeneralInfoComponent implements OnInit {
    @Input() media: Media | null = null;

    constructor() {}

    ngOnInit(): void {}
}
