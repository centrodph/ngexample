import { Component, OnInit } from "@angular/core";
import { OperationsService } from "../../services/operations.service";
import { Operation } from "../../models/";

@Component({
  selector: "app-operation-list",
  templateUrl: "./operation-list.component.html",
  styleUrls: ["./operation-list.component.css"]
})
export class OperationListComponent implements OnInit {
  constructor(private operationService: OperationsService) {}
  editOperation: Operation;
  error: string = null;
  loading = false;
  operations: Operation[];
  ngOnInit() {
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
