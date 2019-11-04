import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { AuthentificationService } from '../core/_services/authentification.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  error: string;
  isLoading: boolean;
  get f() {
    return this.loginForm.controls;
  }
  constructor(
    private router: Router,
    private authService: AuthentificationService,
    public _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        user => {
          if (user) {
            this.isLoading = false;
            this.router.navigate(["/shell"]);
            this._snackBar.open("logged in successfully", "x", {
              duration: 3000,
              panelClass: ["success-snackbar"]
            });
          } else {
            this._snackBar.open("user or password wrong", "x", {
              duration: 3000,
              panelClass: ["danger-snackbar"]
            });
            this.isLoading = false;
          }
        },
        err => {
          this.error = err;
          this.isLoading = false;
        }
      );
  }
  ngOnInit() {}
}
