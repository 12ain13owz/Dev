import { createAction, props } from '@ngrx/store';
import { Associates } from '../models/associate.model';

const LOAD_ASSOCIATE = '[Associate] load associate';
const LOAD_ASSOCIATE_SUCCESS = '[Associate] load associate success';
const LOAD_ASSOCIATE_FAIL = '[Associate] load associate fail';
const ADD_ASSOCIATE = '[Associate] add associate';
const ADD_ASSOCIATE_SUCCESS = '[Associate] add associate success';
const UPDATE_ASSOCIATE = '[Associate] update associate';
const UPDATE_ASSOCIATE_SUCCESS = '[Associate] update associate success';
const DELETE_ASSOCIATE = '[Associate] delete associate';
const DELETE_ASSOCIATE_SUCCESS = '[Associate] delete associate success';
const GET_ASSOCIATE = '[Associate] get associate';
const GET_ASSOCIATE_SUCCESS = '[Associate] get associate success';
const OPEN_POPUP = '[Associate] open popup';

export const initLoadAssociate = createAction(LOAD_ASSOCIATE);
export const loadAssociateSuccess = createAction(
  LOAD_ASSOCIATE_SUCCESS,
  props<{ list: Associates[] }>()
);
export const loadAssociateFail = createAction(
  LOAD_ASSOCIATE_FAIL,
  props<{ errorMessage: string }>()
);

export const actionAddAssociate = createAction(
  ADD_ASSOCIATE,
  props<{ input: Associates }>()
);
export const actionAddAssociateSuccess = createAction(
  ADD_ASSOCIATE_SUCCESS,
  props<{ input: Associates }>()
);

export const updateAssociateAction = createAction(
  UPDATE_ASSOCIATE,
  props<{ input: Associates }>()
);
export const updateAssociateSuccesAction = createAction(
  UPDATE_ASSOCIATE_SUCCESS,
  props<{ input: Associates }>()
);

export const deleteAssociateAction = createAction(
  DELETE_ASSOCIATE,
  props<{ code: number }>()
);
export const deleteAssociateSuccesAction = createAction(
  DELETE_ASSOCIATE_SUCCESS,
  props<{ code: number }>()
);

export const getAssociateAction = createAction(
  GET_ASSOCIATE,
  props<{ code: number }>()
);
export const getAssociateSuccessAction = createAction(
  GET_ASSOCIATE_SUCCESS,
  props<{ associateObject: Associates }>()
);

export const openPopupAction = createAction(OPEN_POPUP);
