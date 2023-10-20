import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthResponseData, AuthService } from '../auth.service';
import { environment } from 'src/environments/environment.development';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly apiKey = environment.apiKey;
  private readonly urlSingup = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private readonly urlSingin = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  // authLogin = this.actions$.pipe(
  //   ofType(AuthActions.LOGIN_START),
  //   switchMap((authData: AuthActions.LoginStart) =>
  //     this.http.post<AuthResponseData>(this.urlSingin, {
  //       email: authData.payload.email,
  //       password: authData.payload.password,
  //       returnSecureToken: true,
  //     })
  //   )
  // );

  private handleAuthentication(res: AuthResponseData) {
    // res.expiresIn = 3600s 1 hour
    const expirationDate = new Date(
      new Date().getTime() + +res.expiresIn * 1000
    );

    const user: AuthActions.UserModel = {
      email: res.email,
      userId: res.localId,
      token: res.idToken,
      expirationDate: expirationDate,
      redirect: true,
    };

    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.LoginStartActionSuccess(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknow error occurred!';
    if (!errorRes.error || !errorRes.error.error)
      return of(AuthActions.LoginStartActionFail({ message: errorMessage }));

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

    return of(AuthActions.LoginStartActionFail({ message: errorMessage }));
  }

  authSignUp = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.SignUpAction),
        switchMap((authData) =>
          this.http
            .post<AuthResponseData>(this.urlSingup, {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            })
            .pipe(
              map((res: AuthResponseData) => this.handleAuthentication(res)),
              catchError((errorRes: HttpErrorResponse) =>
                this.handleError(errorRes)
              )
            )
        )
      )
    // { dispatch: false } ใช้ในกรณี ไม่มีการเปลี่ยนแปงของข้อมูล
  );

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LoginStartAction),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(this.urlSingin, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .pipe(
            map((res: AuthResponseData) => this.handleAuthentication(res)),
            tap((res) => this.authService.setLogoutTimer(+res.expirationDate)),
            catchError((errorRes: HttpErrorResponse) =>
              this.handleError(errorRes)
            )
          );
      })
    );
  });

  autoLogin = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AutoLoginAction),
        map(() => {
          const userData: AuthActions.UserModel = JSON.parse(
            localStorage.getItem('userData')
          );

          if (!userData) return AuthActions.AutoLoginActionFail();

          const expirationDate = new Date(userData.expirationDate).getTime();
          this.authService.setLogoutTimer(expirationDate);
          return AuthActions.LoginStartActionSuccess(userData);
        })
      ),
    { dispatch: true }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LogoutAction),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LoginStartActionSuccess),
        tap((authSuccessAction) => {
          if (authSuccessAction.redirect) this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
