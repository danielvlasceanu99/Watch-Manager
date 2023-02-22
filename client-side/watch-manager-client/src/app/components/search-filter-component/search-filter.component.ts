import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { MatListOption } from "@angular/material/list";
import { Genre } from "src/app/models/genre.model";
import { GenreService } from "src/app/services/genre-service/genre.service";

@Component({
    selector: "app-search-filter",
    templateUrl: "./search-filter.component.html",
    styleUrls: ["./search-filter.component.scss"],
})
export class SearchFilterComponent implements OnInit {
    genresList: Genre[] = [{ id: "0", name: "adasd" }];
    genresAreLoading: Boolean = false;

    selectedGenre: string = "";

    @Output() filterApplied = new EventEmitter<string>();
    constructor(private genreService: GenreService) {}

    ngOnInit(): void {
        this.getGenres();
    }

    getGenres() {
        this.genresAreLoading = true;
        this.genreService.getAll().subscribe((res) => {
            this.genresList = res;
            this.genresAreLoading = false;
        });
    }

    onSelectionChange(selectedOptions: MatListOption[]) {
        this.selectedGenre = selectedOptions[0].value;
    }

    applyFilter() {
        if (this.selectedGenre) {
            this.filterApplied.emit(this.selectedGenre);
        }
    }
}
