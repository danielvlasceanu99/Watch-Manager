import { Component, Input, OnInit } from "@angular/core";
import { Media } from "src/app/models/helpers/media.moedl";
import { Movie } from "src/app/models/movie.model";

@Component({
    selector: "app-media-general-info",
    templateUrl: "./media-general-info.component.html",
    styleUrls: ["./media-general-info.component.scss"],
})
export class MediaGeneralInfoComponent implements OnInit {
    @Input() mediaId: string | null = "";
    @Input() title: string | undefined = "";
    @Input() date: Date | undefined = new Date();
    @Input() runtime: number | undefined = undefined;
    @Input() tagline: string | undefined = "";
    @Input() overview: string | undefined = "";

    constructor() {}

    ngOnInit(): void {}
}
