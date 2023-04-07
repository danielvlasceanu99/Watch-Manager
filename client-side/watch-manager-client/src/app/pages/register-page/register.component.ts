import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { SessionService } from "src/app/services/session-service/session.service";
import { UserService } from "src/app/services/user-service/user.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
    registerFormGroup = new FormGroup({
        firstNameFormControl: new FormControl("", [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern("^[a-zA-Z]+(([', -][a-zA-Z ])?[a-zA-Z]*)*$"),
        ]),
        lastNameFormControl: new FormControl("", [
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"),
        ]),
        emailFormControl: new FormControl("", [Validators.required, Validators.email]),
        passwordFormControl: new FormControl("", [
            Validators.required,
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d_\\.*-]{8,}$"),
        ]),
    });

    get firstNameFormControl(): AbstractControl | null {
        return this.registerFormGroup.get("firstNameFormControl");
    }
    get lastNameFormControl(): AbstractControl | null {
        return this.registerFormGroup.get("lastNameFormControl");
    }
    get emailFormControl(): AbstractControl | null {
        return this.registerFormGroup.get("emailFormControl");
    }
    get passwordFormControl(): AbstractControl | null {
        return this.registerFormGroup.get("passwordFormControl");
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

    register() {
        this.userService
            .register(
                this.firstNameFormControl?.value,
                this.lastNameFormControl?.value,
                this.emailFormControl?.value,
                this.passwordFormControl?.value
            )
            .subscribe({
                next: (res) => {
                    this.userService.login(this.emailFormControl?.value, this.passwordFormControl?.value).subscribe({
                        next: (res) => {
                            this.cookieService.set("token", res.token);
                            this.session.setUser(res.user);
                            this.router.navigate(["/home"]);
                        },
                    });
                },
                error: (error) => {
                    console.log(error);
                    Object.keys(error.error).forEach((key) => {
                        this._snackBar.open(error.error[key], "OK", {
                            panelClass: "snack-bar-err",
                            duration: 2000,
                        });
                    });
                },
            });
    }
}
