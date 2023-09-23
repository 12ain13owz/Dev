import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setRecipes, fetchRecipes, storeRecipes } from './recipe.actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment.development';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
  private url: string = environment.apiUrl;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchRecipes),
      switchMap(() => this.http.get<Recipe[]>(this.url)),
      map((recipes) =>
        recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }))
      ),
      map((recipes) => setRecipes({ recipes: recipes }))
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeRecipes),
        withLatestFrom(this.store.select('recipe')),
        switchMap(([actionData, recipesState]) =>
          this.http.put<Recipe[]>(this.url, recipesState.recipes)
        )
      ),
    { dispatch: false }
  );
}

// storeRecipes() {
//   const recipes = this.recipeSerice.getRecipes();
//   return this.http.put<Recipe[]>(this.url, recipes).subscribe((response) => {
//     console.log(response);
//   });
// }
