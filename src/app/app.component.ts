import { Component, OnInit } from '@angular/core';
import { LoginService } from "./services/login.service";
import { User } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular User APP';
  constructor(private loginService: LoginService) {}
  user: User = null;
  loading = false;
  ngOnInit() {
    this.loginService.user.subscribe(user => (this.user = user));
    this.loginService.loading.subscribe(loading => (this.loading = loading));
  }
}
