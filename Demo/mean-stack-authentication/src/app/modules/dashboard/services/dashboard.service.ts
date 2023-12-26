import { Injectable } from '@angular/core';
import { DashboardModule } from '../dashboard.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: DashboardModule,
})
export class DashboardService {
  private url = 'http://localhost:5000/api/v1/';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get(`${this.url}user`, { withCredentials: true });
  }

  refreshToken() {
    return this.http.get(`${this.url}refresh`, { withCredentials: true });
  }
}
