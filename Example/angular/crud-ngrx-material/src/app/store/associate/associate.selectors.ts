import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AssociatesModel } from '../models/associate.model';

const associateState = createFeatureSelector<AssociatesModel>('associate');

const initState = (state: AssociatesModel) => state;

export const getAssociateList = createSelector(
  associateState,
  (state) => state.list
);

export const getAssociateObject = createSelector(
  associateState,
  (state) => state.associateObject
);
