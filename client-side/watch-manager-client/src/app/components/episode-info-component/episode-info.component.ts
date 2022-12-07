import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-episode-info",
    templateUrl: "./episode-info.component.html",
    styleUrls: ["./episode-info.component.scss"],
})
export class EpisodeInfoComponent implements OnInit {
    @Input() episodeId: string | undefined = "";
    @Input() name: string | undefined = "";
    @Input() air_date: Date | undefined = new Date();
    @Input() overview: string | undefined = "";
    @Input() posterPath: string | undefined = "";

    constructor() {}

    ngOnInit(): void {}
}
