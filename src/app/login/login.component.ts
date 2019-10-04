import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });
  ngOnInit() {}
  onSubmit() {
    console.log(this.loginForm);
    this.loginService.getUsers().subscribe(data => {
      console.log(data);
    });
  }
}
