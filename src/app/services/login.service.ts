import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginRequest, User } from "../models/LoginRequest";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  private userSubject = new BehaviorSubject<User>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  user = this.userSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading= this.loadingSubject.asObservable();
  getUsers() {
    return this.httpClient.get(`${environment.apiUrl}/users`);
  }
  login(data: LoginRequest) {
    this.loadingSubject.next(true);
    const service = this.httpClient.post(`${environment.apiUrl}/user`, data);
    service.subscribe(this.setUser, error =>
      this.setLoginError("Invalid credentials")
    );
    return service;
  }
  setUser = (user: User) => {
    this.userSubject.next(user);
    this.loadingSubject.next(false);
  }
  setLoginError = (error: string) => {
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  }
}
