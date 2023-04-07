import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: "root",
})
export class UserService {
    USER_URL: string = "http://localhost:8080/user";
    constructor(private httpClient: HttpClient) {}

    login(email: string, password: string) {
        return this.httpClient.post<{ token: string; user: User } | any>(this.USER_URL + "/login", { email, password });
    }

    getUser(token: string) {
        return this.httpClient.get<User | any>(this.USER_URL + "/getUserData", {
            headers: new HttpHeaders().set("authorization", token),
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
}
