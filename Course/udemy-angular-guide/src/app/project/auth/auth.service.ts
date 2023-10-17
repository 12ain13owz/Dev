import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserModel } from './user.model';
import { Router } from '@angular/router';

export interface AuthRespnseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {
  private signUpEndpoint = environment.signUpEndpoint + environment.apiKey;
  private signInEndpoint = environment.signInEndpoint + environment.apiKey;
  private tokenExpirationTimer: ReturnType<typeof setTimeout>;
  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string): Observable<AuthRespnseData> {
    return this.http
      .post<AuthRespnseData>(this.signUpEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errRes) => this.handlerError(errRes)),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  signin(email: string, password: string): Observable<AuthRespnseData> {
    return this.http
      .post<AuthRespnseData>(this.signInEndpoint, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errRes) => this.handlerError(errRes)),
        tap((resData) =>
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
        )
      );
  }

  autoLogin() {
    const userData: UserModel = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;

    userData.tokenExpirationDate = new Date(userData.tokenExpirationDate);
    const today = new Date();
    if (!userData.tokenExpirationDate || today > userData.tokenExpirationDate)
      return;

    const expirationDuration =
      userData.tokenExpirationDate.getTime() - today.getTime();
    this.autoLogout(expirationDuration);
    this.user.next(userData);
  }

  signout() {
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
    this.user.next(null);
    this.router.navigate(['project/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user: UserModel = {
      email: email,
      id: userId,
      token: token,
      tokenExpirationDate: expirationDate,
    };
    console.log(user.tokenExpirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlerError(errRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errRes.error || !errRes.error.error)
      return throwError(() => errorMessage);

    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'The operation is not allowed';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          'The user account has been disabled by an administrator.';
        break;
    }
    return throwError(() => errorMessage);
  }
}
