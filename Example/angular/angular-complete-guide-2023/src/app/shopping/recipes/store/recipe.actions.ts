import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

const SET_RECIPES = '[Recipes] Set recipes';
const FETCH_RECIPES = '[Recipes] Fetch recipes';

const ADD_RECIPE = '[Recipe] Add recipe';
const UPDATE_RECIPE = '[Recipe] Update recipe';
const DELETE_RECIPE = '[Recipe] Delete recipe';

const STORE_RECIPES = '[Recipe] Store recipe';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);

export const addRecipe = createAction(ADD_RECIPE, props<{ recipe: Recipe }>());
export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ index: number; recipe: Recipe }>()
);
export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ index: number }>()
);

export const storeRecipes = createAction(STORE_RECIPES);
