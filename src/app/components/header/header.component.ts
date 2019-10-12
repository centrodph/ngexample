import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { User } from "../../models";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService) {}
  user: User = null;
  ngOnInit() {
    this.loginService.user.subscribe(user => (this.user = user));
  }
  logout(e: MouseEvent) {
    e.preventDefault();
    this.loginService.logout();
  }
}
