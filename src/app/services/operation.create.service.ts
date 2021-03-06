import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import {
  User,
  ServerError,
  OperationCreateRequest,
  OperationEditRequest
} from "../models";
import { OperationsService } from "./operations.service";

@Injectable({
  providedIn: "root"
})
export class OperationCreateService {
  constructor(
    private httpClient: HttpClient,
    private operationsService: OperationsService
  ) {}
  private userSubject = new BehaviorSubject<User>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  operation = this.userSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading = this.loadingSubject.asObservable();
  createOperation(operations: OperationCreateRequest) {
    this.loadingSubject.next(true);
    const service = this.httpClient.post(
      `${environment.apiUrl}/operations`,
      operations
    );
    service.subscribe(this.setOperation, this.setError);
    return service;
  }
  editOperation(operation: OperationEditRequest) {
    this.loadingSubject.next(true);
    const service = this.httpClient.put(
      `${environment.apiUrl}/operation/${operation.id}`,
      operation
    );
    service.subscribe(this.setOperation, this.setError);
    return service;
  }
  setOperation = (response: any) => {
    this.userSubject.next(response);
    this.loadingSubject.next(false);
    this.operationsService.getOperations();
  };
  setError = (response: ServerError) => {
    this.errorSubject.next(response.error.message);
    this.loadingSubject.next(false);
  };
}
