import { createSelector } from '@ngrx/store';

export const selecCount = (state: { counter: number }) => state.counter;
export const selecdoubleCount = createSelector(
  selecCount,
  (state: number) => state * 2
);
