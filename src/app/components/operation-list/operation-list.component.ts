import { Component, OnInit } from "@angular/core";
import { OperationsService } from "../../services/operations.service";
import { LoginService } from "../../services/login.service";
import { Operation, User, ACCESS_TYPE, USER_STATUS } from "../../models/";

@Component({
  selector: "app-operation-list",
  templateUrl: "./operation-list.component.html",
  styleUrls: ["./operation-list.component.css"]
})
export class OperationListComponent implements OnInit {
  constructor(
    private operationService: OperationsService,
    private authenticationService: LoginService
  ) {}
  allowEdit = false;
  allowAdd = false;
  editOperation: Operation;
  error: string = null;
  loading = false;
  operations: Operation[];
  ngOnInit() {
    this.authenticationService.user.subscribe((user: User) => {
      this.allowEdit =
        user &&
        [ACCESS_TYPE.ADMIN, ACCESS_TYPE.SUPERVISOR].includes(user.access);
      this.allowAdd =
        user &&
        [
          ACCESS_TYPE.ADMIN,
          ACCESS_TYPE.SUPERVISOR,
          ACCESS_TYPE.OPERATOR
        ].includes(user.access) &&
        user.status === USER_STATUS.ACTIVE;
    });
    this.operationService.operations.subscribe(
      (operations: Operation[]) => (this.operations = operations)
    );
    this.operationService.error.subscribe(error => (this.error = error));
    this.operationService.loading.subscribe(
      loading => (this.loading = loading)
    );
    this.operationService.getOperations();
  }
  edit(operation: Operation) {
    this.editOperation = operation;
  }
}
