import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() mediaId: String | null = "";
    @Input() mediaTitle: String | null = "";
    @Input() mediaSubtitle: String | null = "";
    @Input() mediaPoster: String | null = "";
    @Input() mediaType: MediaType | null = null;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goTo() {
        this.router.navigate([`./${this.mediaType}/${this.mediaId}`]);
    }
}
