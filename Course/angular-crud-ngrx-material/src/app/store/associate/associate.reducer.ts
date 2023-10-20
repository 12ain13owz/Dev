import { createReducer, on } from '@ngrx/store';
import { AssocoateState } from './associate.state';
import {
  actionAddAssociateSuccess,
  deleteAssociateSuccesAction,
  getAssociateSuccessAction,
  loadAssociateFail,
  loadAssociateSuccess,
  openPopupAction,
  updateAssociateSuccesAction,
} from './associate.actions';

export const AssociateReducer = createReducer(
  AssocoateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadAssociateFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(actionAddAssociateSuccess, (state, action) => {
    const maxID = Math.max(...state.list.map((data) => data.id));
    const newData = { ...action.input };
    if (!isFinite(maxID)) newData.id = 1;
    else newData.id = maxID + 1;

    return {
      ...state,
      list: [...state.list, newData],
      errorMessage: 'action',
    };
  }),
  on(updateAssociateSuccesAction, (state, action) => {
    const newData = state.list.map((data) => {
      return data.id === action.input.id ? action.input : data;
    });

    return {
      ...state,
      list: newData,
      errorMessage: 'action',
    };
  }),
  on(deleteAssociateSuccesAction, (state, action) => {
    const newData = state.list.filter((data) => data.id !== action.code);
    return {
      ...state,
      list: newData,
      errorMessage: 'action',
    };
  }),
  on(getAssociateSuccessAction, (state, action) => {
    return {
      ...state,
      associateObject: action.associateObject,
      errorMessage: '',
    };
  }),
  on(openPopupAction, (state, action) => {
    return {
      ...state,
      associateObject: AssocoateState.associateObject,
    };
  })
);
