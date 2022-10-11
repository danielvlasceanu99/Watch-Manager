import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "src/app/models/movie.model";
import { Tv } from "src/app/models/tv.model";

@Component({
    selector: "app-card",
    templateUrl: "./card.component.html",
    styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
    @Input() media: Movie | Tv | null = null;
    @Input() URL: string | null = null;

    title: string = "";
    subtitle: Date = new Date();

    constructor(private router: Router) {}

    ngOnInit(): void {
        if ((<Movie>this.media).title) {
            this.title = (<Movie>this.media).title;
            this.subtitle = (<Movie>this.media).release_date;
        } else if ((<Tv>this.media).name) {
            this.title = (<Tv>this.media).name;
            this.subtitle = (<Tv>this.media).first_air_date;
        }
    }

    goTo() {
        console.log(`./media/${this.media?.id}`);

        this.router.navigate([`./${this.URL}/${this.media?.id}`]);
    }
}
