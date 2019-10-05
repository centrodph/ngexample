import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { User } from "src/app/models/LoginRequest";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(private usersService: UsersService) {}
  error: string = null;
  loading = false;
  users: User[] = null;
  ngOnInit() {
    this.usersService.users.subscribe((users: User[]) => (this.users = users));
    this.usersService.error.subscribe(error => (this.error = error));
    this.usersService.loading.subscribe(loading => (this.loading = loading));
    this.usersService.getUsers();
  }
}
