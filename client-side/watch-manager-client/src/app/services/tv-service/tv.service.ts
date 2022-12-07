import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tv } from "src/app/models/tv.model";

@Injectable({
    providedIn: "root",
})
export class TvService {
    TV_URL: string = "http://localhost:8080/tv";
    constructor(private httpClient: HttpClient) {}

    getLatest() {
        return this.httpClient.get<Tv[]>(this.TV_URL + "/latest");
    }

    getById(tv_id: string) {
        return this.httpClient.get<Tv>(`${this.TV_URL}/get/${tv_id}`);
    }
}
