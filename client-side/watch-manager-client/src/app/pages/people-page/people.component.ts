import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Person } from "src/app/models/person.model";
import { PersonService } from "src/app/services/person-service/person.service";

@Component({
    selector: "app-people",
    templateUrl: "./people.component.html",
    styleUrls: ["./people.component.scss"],
})
export class PeopleComponent implements OnInit {
    people: Person[] = [];
    peopleAreLoading: Boolean = false;

    name: string = "";
    page: number = 0;
    pageSize: number = 0;
    peopleCount: number = 0;

    personMediaType: MediaType = MediaType.PERSON;

    formGroup = new FormGroup({
        name: new FormControl(this.name, [Validators.maxLength(100), Validators.pattern("[a-zA-Z0-9 ]*")]),
    });
    get getName(): AbstractControl | null {
        return this.formGroup.get("name");
    }

    pageEvent: PageEvent = new PageEvent();
    constructor(private personService: PersonService) {}

    ngOnInit(): void {
        this.search();
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.page = e.pageIndex;
        this.search();
    }

    onSearch() {
        if (!this.formGroup.invalid) {
            this.name = this.getName?.value;
            this.page = 0;
            this.search();
            console.log(this.name);
        }
    }

    search() {
        this.peopleAreLoading = true;
        this.personService.search(this.page, this.name).subscribe((res) => {
            this.people = res["people"];
            this.peopleCount = res["peopleCount"];
            this.pageSize = res["limit"];
            this.peopleAreLoading = false;
        });
    }
}
