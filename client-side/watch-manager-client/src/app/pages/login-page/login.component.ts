import { JsonPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { SessionService } from "src/app/services/session-service/session.service";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    loginFormGroup = new FormGroup({
        emailFormControl: new FormControl("", [Validators.required]),
        passwordFormControl: new FormControl("", [Validators.required]),
    });

    get emailFormControl(): AbstractControl | null {
        return this.loginFormGroup.get("emailFormControl");
    }

    get passwordFormControl(): AbstractControl | null {
        return this.loginFormGroup.get("passwordFormControl");
    }

    hidePassword = true;

    constructor(
        private userService: UserService,
        private cookieService: CookieService,
        private router: Router,
        private session: SessionService,
        private _snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.session.userObservable.subscribe((user) => {
            if (user) {
                this.router.navigate(["/home"]);
            }
        });
    }

    login() {
        this.userService.login(this.emailFormControl?.value, this.passwordFormControl?.value).subscribe({
            next: (res) => {
                this.cookieService.set("token", res.token);
                this.session.setUser(res.user);
                this.router.navigate(["/home"]);
            },
            error: (error) => {
                this._snackBar.open(error.error.message, "", {
                    panelClass: "snack-bar-err",
                    duration: 2000,
                });
            },
        });
    }
}
