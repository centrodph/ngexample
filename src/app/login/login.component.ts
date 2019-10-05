import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ])
  });
  error = null;
  loading = false;
  ngOnInit() {
    this.loginService.error.subscribe(message => (this.error = message));
    this.loginService.loading.subscribe(loading => (this.loading = loading));
  }
  get email(): any {
    return this.loginForm.get("email");
  }

  get password(): any {
    return this.loginForm.get("password");
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.error = null;
    this.loading = true;
    this.loginService.login({
      email: this.email.value,
      password: this.password.value
    });
  }
}
