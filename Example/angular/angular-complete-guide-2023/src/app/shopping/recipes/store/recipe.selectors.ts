import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipe.state';

const selectFeatureState = createFeatureSelector<RecipeState>('recipe');

export const selectRecipes = createSelector(
  selectFeatureState,
  (state) => state.recipes
);
