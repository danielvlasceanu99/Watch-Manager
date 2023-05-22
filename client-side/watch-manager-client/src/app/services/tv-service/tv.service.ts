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

    filter(page: number, genreId: string) {
        return this.httpClient.get<{ tvs: Tv[]; tvCount: number; limit: number }>(
            `${this.TV_URL}/filter?page=${page}&genre=${genreId}`
        );
    }

    search(page: number, title: string) {
        return this.httpClient.get<{ tvs: Tv[]; tvCount: number; limit: number }>(
            `${this.TV_URL}/search?page=${page}&name=${title}`
        );
    }

    getbyList(idList: string[]) {
        return this.httpClient.get<Tv[]>(`${this.TV_URL}/getByList?idList=${idList}`);
    }

    getRecomandations(idList: string[]) {
        return this.httpClient.get<Tv[]>(`${this.TV_URL}/getRecomandations?idList=${idList}`);
    }
}
