import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";

@Component({
    selector: "app-view-more-card",
    templateUrl: "./view-more-card.component.html",
    styleUrls: ["./view-more-card.component.scss"],
})
export class ViewMoreCardComponent implements OnInit {
    @Input() mediaId: String | null = "";
    @Input() mediaType: MediaType | null = null;
    @Input() URL: String | null = "";

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goTo() {
        this.router.navigate([`./${URL ? URL : ""}${this.mediaType}/${this.mediaId}`]);
    }
}
