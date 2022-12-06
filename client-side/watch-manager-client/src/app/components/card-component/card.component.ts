import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() mediaId: string | undefined = "";
    @Input() mediaTitle: string | undefined = "";
    @Input() mediaSubtitle: string | undefined = "";
    @Input() mediaPoster: string | undefined = "";
    @Input() mediaType: MediaType | undefined = undefined;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    goTo() {
        this.router.navigate([`./${this.mediaType}/${this.mediaId}`]);
    }
}
