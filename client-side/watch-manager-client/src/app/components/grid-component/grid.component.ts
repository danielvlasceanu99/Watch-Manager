import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";
import { Person } from "src/app/models/person.model";
import { MediaType } from "src/app/models/helpers/media-type.model";

@Component({
    selector: "app-grid",
    templateUrl: "./grid.component.html",
    styleUrls: ["./grid.component.scss"],
})
export class GridComponent implements OnInit {
    @Input() movies: Movie[] = [];
    @Input() tvShows: Tv[] = [];
    @Input() cast: Person[] = [];

    @Input() mediaType: MediaType | undefined = undefined;

    @Input() viewMore: Boolean = false;
    @Input() mediaId: string | null = null;

    movieMediaType: MediaType = MediaType.MOVIE;
    tvMediaType: MediaType = MediaType.TV;
    personMediaType: MediaType = MediaType.PERSON;

    constructor() {}

    ngOnInit(): void {}
}
