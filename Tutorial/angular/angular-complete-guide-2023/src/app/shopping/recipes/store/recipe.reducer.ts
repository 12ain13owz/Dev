import { createReducer, on } from '@ngrx/store';
import { initialRecipeState } from './recipe.state';
import {
  addRecipe,
  deleteRecipe,
  setRecipes,
  updateRecipe,
} from './recipe.actions';

export const RecipeReducer = createReducer(
  initialRecipeState,
  on(setRecipes, (state, action) => {
    return {
      ...state,
      recipes: [...action.recipes],
    };
  }),
  on(addRecipe, (state, action) => {
    return {
      ...state,
      recipes: [...state.recipes, action.recipe],
    };
  }),
  on(updateRecipe, (state, action) => {
    // const updateRecipe = {
    //   ...state.recipes[action.index],
    //   ...action.recipe,
    // };
    // const updateRecipes = [...state.recipes];
    // updateRecipe[action.index] = updateRecipes;

    const updateRecipes = [...state.recipes];
    updateRecipes[action.index] = action.recipe;

    return { ...state, recipes: updateRecipes };
  }),
  on(deleteRecipe, (state, action) => {
    const recipes = [
      ...state.recipes.filter((recipe, index) => index !== action.index),
    ];
    return {
      ...state,
      recipes: recipes,
    };
  })
);
