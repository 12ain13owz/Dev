import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
// import
//  AuthActions,
// LOGIN,
// LOGIN_FAIL,
// LOGIN_START,
// LOGOUT,
// './auth.actions';
import * as AuthActions2 from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

// export function authReducer(state = initialState, action: AuthActions) {
//   // console.log('1. authReducer State :', state);
//   switch (action.type) {
//     case LOGIN:
//       const user = new User(
//         action.payload.email,
//         action.payload.userId,
//         action.payload.token,
//         action.payload.expirationDate
//       );

//       return {
//         ...state,
//         user: user,
//         authError: null,
//         loading: false,
//       };
//     case LOGOUT:
//       return {
//         ...state,
//         user: null,
//       };
//     case LOGIN_START:
//     return {
//       ...state,
//       authError: null,
//       loading: true,
//     };
//     case LOGIN_FAIL:
//       return {
//         ...state,
//         user: null,
//         authError: action.palyload,
//         loading: false,
//       };
//     default:
//       return state;
//   }
// }

export const AuthReducer2 = createReducer(
  initialState,
  on(AuthActions2.LoginStartAction, (state, action) => {
    return {
      ...state,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions2.LoginStartActionSuccess, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );

    return {
      ...state,
      user: user,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions2.LoginStartActionFail, (state, action) => {
    return {
      ...state,
      user: null,
      authError: action.message,
      loading: false,
    };
  }),
  on(AuthActions2.LogoutAction, (state, action) => {
    return {
      ...state,
      user: null,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions2.SignUpAction, (state, action) => {
    return {
      ...state,
      user: null,
      authError: null,
      loading: true,
    };
  }),
  on(AuthActions2.SignUpSuccessAction, (state, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );

    return {
      ...state,
      user: user,
      authError: null,
      loading: false,
    };
  }),
  on(AuthActions2.AutoLoginAction, (state, action) => {
    return { ...state };
  })

  // ไม่จำเป็นเพราะทำงานเหมือนดับ Login Fail
  // on(AuthActions2.SignUpActionFail, (state, action) => {
  //   console.log('2.', action.message);
  //   return {
  //     ...state,
  //     user: null,
  //     authError: action.message,
  //     loading: false,
  //   };
  // })
);
