import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserCreateService } from "../../services/users.create.service";
import { ACCESS_TYPE } from "src/app/models/accessType";
import { USER_STATUS } from "src/app/models/userStatus";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  constructor(private userCreateService: UserCreateService) {}
  userForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    access: new FormControl("", [Validators.required]),
    status: new FormControl("", [Validators.required])
  });
  error = null;
  loading = false;
  ngOnInit() {
    this.userCreateService.error.subscribe(message => (this.error = message));
    this.userCreateService.loading.subscribe(
      loading => (this.loading = loading)
    );
  }
  get email(): any {
    return this.userForm.get("email");
  }

  get password(): any {
    return this.userForm.get("password");
  }
  get access(): any {
    return this.userForm.get("access");
  }

  get status(): any {
    return this.userForm.get("status");
  }
  get optionsAccess(): string[] {
    return Object.keys(ACCESS_TYPE);
  }
  get optionsStatus(): string[] {
    return Object.keys(USER_STATUS);
  }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.error = null;
    this.loading = true;
    this.userCreateService.createUser({
      email: this.email.value,
      password: this.password.value,
      access: this.access.value as ACCESS_TYPE,
      status: this.status.value as USER_STATUS
    });
  }
}
