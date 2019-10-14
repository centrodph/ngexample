import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { UsersService } from "../../services/users.service";
import { UserCreateService } from "../../services/users.create.service";
import { User, USER_STATUS, ACCESS_TYPE } from "src/app/models";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private userCreateService: UserCreateService,
    private authenticationService: LoginService
  ) {}
  showUsers = false;
  user: User = null;
  error: string = null;
  loading = false;
  users: User[] = null;
  ngOnInit() {
    this.authenticationService.user.subscribe((user: User) => {
      this.showUsers =
        user &&
        [ACCESS_TYPE.ADMIN, ACCESS_TYPE.SUPERVISOR].includes(user.access);
    });
    this.usersService.users.subscribe((users: User[]) => (this.users = users));
    this.usersService.error.subscribe(error => (this.error = error));
    this.usersService.loading.subscribe(loading => (this.loading = loading));
    this.usersService.getUsers();
  }

  toggleStatus({ id, status }: { id: number; status: USER_STATUS }) {
    this.loading = true;
    this.userCreateService.updateStatus(
      id,
      status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE
    );
  }
}
