import { Action, createReducer, on } from '@ngrx/store';
import {
  // CounterActions,
  // INCREMENT,
  // IncrementAction,
  decrement,
  increment,
  set,
} from './counter.action';

const initialState = 0;

export const counterReducer = createReducer<number>(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);

// for old version not use createReducer
// export function counterReducer(
//   state = initialState,
//   action: CounterActions | Action
// ) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
