import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "../models/LoginRequest";

@Injectable({
  providedIn: "root"
})
export class UserCreateService {
  constructor(private httpClient: HttpClient) {}
  private userSubject = new BehaviorSubject<User>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  users = this.userSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading = this.loadingSubject.asObservable();
  createUser(user: User) {
    this.loadingSubject.next(true);
    const service = this.httpClient.post(`${environment.apiUrl}/users`, user);
    service.subscribe(this.setUser, this.setError);
    return service;
  }
  setUser = (response: any) => {
    this.userSubject.next(response);
    this.loadingSubject.next(false);
  };
  setError = (error: any) => {
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  };
}
