import { Component, Input, OnInit } from "@angular/core";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Credit } from "src/app/models/credit.model";

@Component({
    selector: "app-cast",
    templateUrl: "./cast.component.html",
    styleUrls: ["./cast.component.scss"],
})
export class CastComponent implements OnInit {
    @Input() credits: Credit[] = [];
    @Input() mediaId: string | null = "";
    @Input() mediaType: MediaType | undefined = undefined;
    cardMediaType: MediaType = MediaType.PERSON;

    constructor() {}

    ngOnInit(): void {}
}
