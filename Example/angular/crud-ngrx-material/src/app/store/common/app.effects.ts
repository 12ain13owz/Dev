import { exhaustMap, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { emptyAction, showAlert } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private action$: Actions, private snackbar: MatSnackBar) {}

  showAlertEffect = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.showSnackbarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(map(() => emptyAction()));
      })
    )
  );

  showSnackbarAlert(message: string, resultType: string = 'fail') {
    let snackColor = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';

    return this.snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 3000,
      panelClass: [snackColor],
    });
  }
}
