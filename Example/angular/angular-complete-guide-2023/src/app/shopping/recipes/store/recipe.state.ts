import { Recipe } from '../recipe.model';

export interface RecipeState {
  recipes: Recipe[];
}

export const initialRecipeState: RecipeState = {
  recipes: [],
};
