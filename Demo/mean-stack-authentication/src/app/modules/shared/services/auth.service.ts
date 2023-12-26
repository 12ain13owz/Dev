import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUp } from '../../auth/models/signup.model';
import { LogIn } from '../../auth/models/login.model';
import { BehaviorSubject } from 'rxjs';
import { MainModule } from '../../main.module';

@Injectable({
  providedIn: MainModule,
})
export class AuthService {
  private url = 'http://localhost:5000/api/v1/';
  private isLoggedInUpdate = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  signup(value: SignUp) {
    return this.http.post(`${this.url}signup`, value);
  }

  login(value: LogIn) {
    return this.http.post(`${this.url}login`, value, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.url}logout`, null, { withCredentials: true });
  }

  getIsLoggedIn() {
    return this.isLoggedInUpdate.asObservable();
  }

  updateIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedInUpdate.next(isLoggedIn);
  }
}
