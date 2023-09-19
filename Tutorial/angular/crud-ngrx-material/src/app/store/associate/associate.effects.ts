import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AssociateService } from 'src/app/services/associate.service';
import {
  initLoadAssociate,
  loadAssociateSuccess,
  loadAssociateFail,
  actionAddAssociate,
  actionAddAssociateSuccess,
  getAssociateAction,
  getAssociateSuccessAction,
  updateAssociateAction,
  updateAssociateSuccesAction,
  deleteAssociateAction,
  deleteAssociateSuccesAction,
} from './associate.actions';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { showAlert } from '../common/app.actions';

@Injectable()
export class AssociateEffects {
  constructor(private action$: Actions, private service: AssociateService) {}

  loadAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(initLoadAssociate),
      exhaustMap((action) => {
        return this.service.getAssociates().pipe(
          map((data) => loadAssociateSuccess({ list: data })),
          catchError((error) => of(loadAssociateFail({ errorMessage: error })))
        );
      })
    );
  });

  addAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(actionAddAssociate),
      switchMap((action) => {
        return this.service.createAssociates(action.input).pipe(
          switchMap((data) => {
            return of(
              actionAddAssociateSuccess({ input: action.input }),
              showAlert({ message: 'Created successfully', resultType: 'pass' })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to create associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    );
  });

  updateAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(updateAssociateAction),
      switchMap((action) => {
        return this.service.updateAssociates(action.input).pipe(
          switchMap((data) => {
            return of(
              updateAssociateSuccesAction({ input: action.input }),
              showAlert({ message: 'Updated successfully', resultType: 'pass' })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to updated associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    );
  });

  deleteAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteAssociateAction),
      switchMap((action) => {
        return this.service.deleteAssociates(action.code).pipe(
          switchMap((data) => {
            return of(
              deleteAssociateSuccesAction({ code: action.code }),
              showAlert({ message: 'Deleted successfully', resultType: 'pass' })
            );
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to delete associate',
                resultType: 'fail',
              })
            )
          )
        );
      })
    );
  });

  getAssociate = createEffect(() => {
    return this.action$.pipe(
      ofType(getAssociateAction),
      exhaustMap((action) => {
        return this.service.getAssociatesByCode(action.code).pipe(
          map((data) => {
            return getAssociateSuccessAction({ associateObject: data });
          }),
          catchError((error) =>
            of(
              showAlert({
                message: 'Failed to featch data :' + error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    );
  });
}
