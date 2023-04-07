import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user.model";

@Injectable({
    providedIn: "root",
})
export class SessionService {
    private userSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    userObservable = this.userSubject.asObservable();
    constructor() {}

    setUser(user: User) {
        this.userSubject.next(user);
    }

    clearUser() {
        this.userSubject.next(null);
    }
}
