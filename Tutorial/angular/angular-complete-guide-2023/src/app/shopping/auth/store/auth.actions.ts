import { Action, createAction, props } from '@ngrx/store';
import { AuthResponseData } from '../auth.service';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_FAIL = '[Auth] Login Fail';

const LOGIN_START = '[Auth] Login Start';
const LOGIN_START_SUCCESS = '[Auth] Login Start Success';
const LOGIN_START_FAIL = '[Auth] Login Start Fail';

const SIGN_UP_START = '[Auth] Sign Up Start';
const SIGN_UP_START_SUCCESS = '[Auth] Sign Up Start Success';
const SIGN_UP_START_FAIL = '[Auth] Sign Up Start Fail';

const AUTO_LOGIN = '[Auth] Auto Login';
const AUTO_LOGIN_FAIL = '[Auth] Auto Login Fail';

export interface UserModel {
  email: string;
  userId: string;
  token: string;
  expirationDate: Date;
  redirect: boolean;
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
  ) {}
}

// export class Logout implements Action {
//   readonly type = LOGOUT;
// }

// export class LoginStart implements Action {
//   readonly type = LOGIN_START;

//   constructor(
//     public payload: {
//       email: string;
//       password: string;
//     }
//   ) {}
// }

// export class LoginFail implements Action {
//   readonly type = LOGIN_FAIL;

//   constructor(public palyload: string) {}
// }

// export type AuthActions = Login | Logout | LoginStart | LoginFail;

export const LoginStartAction = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const LoginStartActionSuccess = createAction(
  LOGIN_START_SUCCESS,
  props<UserModel>()
);

export const LoginStartActionFail = createAction(
  LOGIN_START_FAIL,
  props<{ message: string }>()
);

export const LogoutAction = createAction(LOGOUT);

export const SignUpAction = createAction(
  SIGN_UP_START,
  props<{ email: string; password: string }>()
);

export const SignUpSuccessAction = createAction(
  SIGN_UP_START_SUCCESS,
  props<UserModel>()
);

export const SignUpActionFail = createAction(
  SIGN_UP_START_FAIL,
  props<{ message: string }>()
);

export const AutoLoginAction = createAction(AUTO_LOGIN);
export const AutoLoginActionFail = createAction(AUTO_LOGIN_FAIL);
