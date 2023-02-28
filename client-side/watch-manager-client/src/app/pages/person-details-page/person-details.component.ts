import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Credit } from "src/app/models/credit.model";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Person } from "src/app/models/person.model";
import { PersonService } from "src/app/services/person-service/person.service";

@Component({
    selector: "app-person-details",
    templateUrl: "./person-details.component.html",
    styleUrls: ["./person-details.component.scss"],
})
export class PersonDetailsComponent implements OnInit {
    person: Person | null = null;
    cast: Credit[] = [];

    personMediaType: MediaType = MediaType.PERSON;
    movieMediaType: MediaType = MediaType.MOVIE;
    tvMediaType: MediaType = MediaType.TV;

    id: string | null = "";

    personIsLoading: Boolean = false;
    creditsAreLoading: Boolean = false;
    constructor(private personService: PersonService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.id = params.get("id");
        });

        this.getPerson();
        this.getCredits();
    }

    getPerson() {
        this.personIsLoading = true;
        if (this.id) {
            this.personService.getById(this.id).subscribe((res) => {
                this.person = res;
                this.personIsLoading = false;
            });
        }
    }

    getCredits() {
        this.creditsAreLoading = true;
        if (this.id) {
            this.personService.getByPersonId(this.id).subscribe((res) => {
                this.cast = res;
                this.creditsAreLoading = false;
            });
        }
    }
}
