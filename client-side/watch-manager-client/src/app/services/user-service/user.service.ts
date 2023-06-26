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

    getDashboardData() {
        return this.httpClient.get<any>(this.USER_URL + "/getDashboardData", {
            headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
        });
    }

    getUserLiked(id: string) {
        return this.httpClient.get<{ _id: string; likedMovies: string[]; likedTv: string[]; name: string }>(
            `${this.USER_URL}/getUserLiked/${id}`
        );
    }

    follow(userId: string) {
        return this.httpClient.put<string>(
            this.USER_URL + "/follow",
            {
                userId: userId,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    unfollow(userId: string) {
        return this.httpClient.put<string>(
            this.USER_URL + "/unfollow",
            {
                userId: userId,
            },
            {
                headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
            }
        );
    }

    getAllFollowed() {
        return this.httpClient.get<{ _id: string; name: string }[]>(this.USER_URL + "/getAllFollowed", {
            headers: new HttpHeaders().set("authorization", this.cookieService.get("auth-token")),
        });
    }

    getProfilePicture(name: string | undefined) {
        let leters = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
        ];
        let index = leters.findIndex((element) => element === name?.charAt(0));
        if (index !== -1) {
            return `../../../assets/images/Logos/${leters[index]}.png`;
        }
        return "../../../assets/images/no-user.jpg";
    }
}
