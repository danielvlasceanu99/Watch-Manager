import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { MediaType } from "src/app/models/helpers/media-type.model";
import { Tv } from "src/app/models/tv.model";
import { TvService } from "src/app/services/tv-service/tv.service";

@Component({
    selector: "app-tv-shows",
    templateUrl: "./tv-shows.component.html",
    styleUrls: ["./tv-shows.component.scss"],
})
export class TvShowsComponent implements OnInit {
    tvs: Tv[] = [];
    tvsAreLoading: Boolean = false;

    gender: string = "";
    name: string = "";
    page: number = 0;
    pageSize: number = 0;
    tvCount: number = 0;

    tvMediaType: MediaType = MediaType.TV;

    isFiltering: Boolean = false;

    formGroup = new FormGroup({
        name: new FormControl(this.name, [Validators.maxLength(100), Validators.pattern("[a-zA-Z0-9 ]*")]),
    });
    get getName(): AbstractControl | null {
        return this.formGroup.get("name");
    }

    pageEvent: PageEvent = new PageEvent();
    constructor(private tvService: TvService, private route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.gender = params["genre"];
            if (this.gender) {
                this.filter();
            } else {
                this.name = params["name"] ? params["name"] : "";
                this.search();
            }
        });
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.page = e.pageIndex;

        if (this.isFiltering) {
            this.filter();
        } else {
            this.search();
        }
    }

    onFilterApplied(gender: string) {
        this.router.navigate(["/tv"], { queryParams: { genre: gender } });
    }

    onSearch() {
        if (!this.formGroup.invalid) {
            this.router.navigate(["/tv"], { queryParams: { name: this.getName?.value } });
        }
    }

    filter() {
        this.tvsAreLoading = true;
        this.tvService.filter(this.page, this.gender).subscribe((res) => {
            this.tvs = res["tvs"];
            this.tvCount = res["tvCount"];
            this.pageSize = res["limit"];
            this.tvsAreLoading = false;
        });
    }

    search() {
        this.tvsAreLoading = true;
        this.tvService.search(this.page, this.name).subscribe((res) => {
            this.tvs = res["tvs"];
            this.tvCount = res["tvCount"];
            this.pageSize = res["limit"];
            this.tvsAreLoading = false;
        });
    }
}
