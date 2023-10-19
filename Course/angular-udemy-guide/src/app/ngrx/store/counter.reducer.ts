import { createReducer, on, Action } from '@ngrx/store';
import { initialState } from './counter.state';
import { decrement, increment, set } from './counter.actions';
import {} from 'rxjs/internal/scheduler/Action';

// New Version
export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => {
    console.log('On Reducer');
    return state + action.value;
  }),
  on(decrement, (state, action) => state - action.value),
  on(set, (state, action) => action.value)
);

// Old Version
// export function counterReducer(
//   state = initialState,
//   action: CounterActions | Action
// ) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }
