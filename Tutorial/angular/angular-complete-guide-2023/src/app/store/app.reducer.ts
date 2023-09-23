import * as fromShoppingList from '../shopping/shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../shopping/auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { RecipeState } from '../shopping/recipes/store/recipe.state';
import { RecipeReducer } from '../shopping/recipes/store/recipe.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  // auth: fromAuth.State;
  auth2: fromAuth.State;
  recipe: RecipeState;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  // auth: fromAuth.authReducer,
  auth2: fromAuth.AuthReducer2,
  recipe: RecipeReducer,
};
