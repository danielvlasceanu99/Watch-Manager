import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Season } from "src/app/models/season.model";

@Injectable({
    providedIn: "root",
})
export class SeasonService {
    SEASON_URL: string = "http://localhost:8080/season";
    constructor(private httpClient: HttpClient) {}

    getByTvId(tv_id: string) {
        return this.httpClient.get<Season[]>(`${this.SEASON_URL}/getByTvId/${tv_id}`);
    }
}
