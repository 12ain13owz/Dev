import { Injectable } from '@angular/core';
import { UserModel } from '../model/account.model';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  onLogout(): void {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) return JSON.parse(user);
    return {};
  }

  saveUser(account: UserModel): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(account));
  }

  removeUser(): void {
    localStorage.removeItem(USER_KEY);
  }
}
