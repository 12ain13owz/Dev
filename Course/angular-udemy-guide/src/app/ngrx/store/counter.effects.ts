import { Actions, createEffect, ofType } from '@ngrx/effects';
import { decrement, increment, init, set } from './counter.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selecCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}

  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => {
        const storeCounter = localStorage.getItem('count');

        if (storeCounter) return of(set({ value: +storeCounter }));
        return of(set({ value: 0 }));
      })
    )
  );

  // actions ค่าที่ส่งมา / counter ค่าทีเก็บใน store
  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selecCount)),
        tap(([action, counter]) => {
          console.log('Effect: ', action, counter);
          localStorage.setItem('count', counter.toString());
        })
      ),

    { dispatch: false }
  );
}
