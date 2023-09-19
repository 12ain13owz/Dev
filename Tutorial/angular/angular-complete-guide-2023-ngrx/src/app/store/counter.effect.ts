import { Injectable } from '@angular/core';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.action';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');

        if (storedCounter) return of(set({ value: +storedCounter }));
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          console.log(action, counter);
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );

  // ngrx old version
  // @Effect({ dispatch: false })
  // saveCount = this.actions$.pipe(() =>
  //   this.actions$.pipe(
  //     ofType(increment, decrement),
  //     tap((action) => {
  //       console.log(action);
  //       localStorage.setItem('count', action.value.toString());
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
