import { Component, Input, OnInit } from "@angular/core";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { MovieCredit } from "src/app/models/movie-credit.model";

@Component({
    selector: "app-cast",
    templateUrl: "./cast.component.html",
    styleUrls: ["./cast.component.scss"],
})
export class CastComponent implements OnInit {
    @Input() credits: MovieCredit[] = [];
    @Input() mediaId: String | null = "";
    personMediaType: MediaType = MediaType.PERSON;
    movieMediaType: MediaType = MediaType.MOVIE;

    constructor() {}

    ngOnInit(): void {}
}
