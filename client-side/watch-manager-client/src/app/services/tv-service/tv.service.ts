import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
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

    getById(movie_id: string) {
        return this.httpClient.get<Tv>(`${this.TV_URL}/get/${movie_id}`);
    }
}
