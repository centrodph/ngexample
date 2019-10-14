import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class StatsService {
  constructor(private httpClient: HttpClient) {}
  private statsListSubject = new BehaviorSubject<any>(null);
  private errorSubject = new BehaviorSubject<string>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  stats = this.statsListSubject.asObservable();
  error = this.errorSubject.asObservable();
  loading = this.loadingSubject.asObservable();
  getStats() {
    this.loadingSubject.next(true);
    const service = this.httpClient.get(`${environment.apiUrl}/stats`);
    service.subscribe(this.setStats, this.setError);
    return service;
  }
  setStats = (response: any) => {
    this.statsListSubject.next(response);
    this.loadingSubject.next(false);
  };
  setError = (error: any) => {
    this.errorSubject.next(error);
    this.loadingSubject.next(false);
  };
}
