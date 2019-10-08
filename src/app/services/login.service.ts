import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginRequest, LoginResponse, User } from "../models/LoginRequest";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  static token: string = null;
  private userSubject = new BehaviorSubject<User>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  user = this.userSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading = this.loadingSubject.asObservable();
  userToken = null;
  login(data: LoginRequest) {
    this.loadingSubject.next(true);
    const service = this.httpClient.post(`${environment.apiUrl}/auth`, data);
    service.subscribe(this.setUser, error =>
      this.setLoginError("Invalid credentials")
    );
    return service;
  }
  logout() {
    this.userSubject.next(undefined);
  }
  setUser = (response: LoginResponse) => {
    console.log(response.token);
    LoginService.token = response.token;
    this.userToken = response.token;
    this.userSubject.next(response.user);
    this.loadingSubject.next(false);
  };
  setLoginError = (error: string) => {
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  };
  getUserToken() {
    return this.userToken;
  }
}
