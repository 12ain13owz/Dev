import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  displayName?: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationtimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  // Firebase Project Setting Web API Key
  private apiKey = environment.apiKey;
  private urlSingup = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private urlSingin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.urlSingup, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.urlSingin, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
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
    const userData: {
      email: string;
      id: string;
      token: string;
      expirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    // const loadedUser = new User(
    //   userData.email,
    //   userData.id,
    //   userData.token,
    //   new Date(userData.expirationDate)
    // );

    const loadedUser: AuthActions.UserModel = {
      email: userData.email,
      userId: userData.id,
      token: userData.token,
      expirationDate: userData.expirationDate,
      redirect: false,
    };

    if (loadedUser.token) {
      // Rxjs
      // this.user.next(loadedUser);

      // Ngrx

      // this.store.dispatch(
      //   new AuthActions.Login({
      //     email: loadedUser.email,
      //     userId: loadedUser.id,
      //     token: loadedUser.token,
      //     expirationDate: new Date(userData.expirationDate),
      //   })
      // );

      this.store.dispatch(AuthActions.LoginStartActionSuccess(loadedUser));

      const expirationDuration =
        new Date(userData.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // Rxjs
    // this.user.next(null);

    // Ngrx
    // this.store.dispatch(new AuthActions.Logout());
    this.store.dispatch(AuthActions.LogoutAction());

    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationtimer) {
      clearTimeout(this.tokenExpirationtimer);
    }
    this.tokenExpirationtimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationtimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  setLogoutTimer(expirationDate: number) {
    const expirationDuration =
      new Date(expirationDate).getTime() - new Date().getTime();

    this.tokenExpirationtimer = setTimeout(() => {
      this.store.dispatch(AuthActions.LogoutAction());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationtimer) {
      clearTimeout(this.tokenExpirationtimer);
    }
    this.tokenExpirationtimer = null;
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    // Rxjs
    // this.user.next(user);

    // Ngrx
    this.store.dispatch(
      new AuthActions.Login({
        email: user.email,
        userId: user.id,
        token: user.token,
        expirationDate: expirationDate,
      })
    );

    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage =
          'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      default:
        errorMessage = 'An unknow error occurred!';
        break;
    }
    return throwError(() => errorMessage);
  }
}
