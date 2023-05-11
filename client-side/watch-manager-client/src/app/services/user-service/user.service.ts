import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { UserColections } from "src/app/models/helpers/user-collection.model";
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    USER_URL: string = "http://localhost:8080/user";
    constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

    login(email: string, password: string) {
        return this.httpClient.post<{ token: string } | any>(this.USER_URL + "/login", { email, password });
    }

    getUser() {
        return this.httpClient.get<User | any>(this.USER_URL + "/getUserData", {
            headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
        });
    }

    register(firstName: string, lastName: string, email: string, password: string) {
        return this.httpClient.post<any>(this.USER_URL + "/register", {
            firstName,
            lastName,
            email,
            password,
        });
    }

    addToCollection(mediaId: string, collection: UserColections) {
        return this.httpClient.put<string>(
            this.USER_URL + "/addToCollection",
            {
                mediaId: mediaId,
                collection: collection,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    removeFromCollection(mediaId: string, collection: UserColections) {
        return this.httpClient.put<string>(
            this.USER_URL + "/removeFromCollection",
            {
                mediaId: mediaId,
                collection: collection,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    addRating(mediaId: string, rating: number, collection: UserColections) {
        return this.httpClient.put<string>(
            this.USER_URL + "/addRating",
            {
                mediaId: mediaId,
                rating: rating,
                collection: collection,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }
}
