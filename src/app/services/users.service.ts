import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "../models";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  private userListSubject = new BehaviorSubject<User[]>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  users = this.userListSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading = this.loadingSubject.asObservable();
  getUsers() {
    this.loadingSubject.next(true);
    const service = this.httpClient.get(`${environment.apiUrl}/users`);
    service.subscribe(this.setUsers, this.setError);
    return service;
  }
  setUsers = (response: any) => {
    this.userListSubject.next(response);
    this.loadingSubject.next(false);
  };
  setError = (error: any) => {
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  };
}
