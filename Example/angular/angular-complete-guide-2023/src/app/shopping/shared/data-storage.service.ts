import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { AppState } from '../shopping-list/store/shopping-list.reducer';
import { setRecipes } from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStroageService {
  constructor(
    private http: HttpClient,
    private recipeSerice: RecipeService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}
  private url: string = environment.apiUrl; // Firebase realtime database url

  storeRecipes() {
    const recipes = this.recipeSerice.getRecipes();
    return this.http.put<Recipe[]>(this.url, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url, { responseType: 'json' }).pipe(
      map((recipes) => {
        return recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }));
      }),
      tap((recipes: Recipe[]) => {
        // Rxjs
        // this.recipeSerice.setRecipes(recipes);

        // Ngrx
        this.store.dispatch(setRecipes({ recipes: recipes }));
      })
    );

    // return this.http.get<Recipe[]>(this.url).pipe(
    // map((recipes) => {
    //   return recipes.map((recipe) => {
    //     return {
    //       ...recipe,
    //       ingredients: recipe.ingredients ? recipe.ingredients : [],
    //     };
    //   });
    // }),

    //   map((recipes) => {
    //     return recipes.map((recipe) => ({
    //       ...recipe,
    //       ingredients: recipe.ingredients ? recipe.ingredients : [],
    //     }));
    //   }),
    //   tap((recipes: Recipe[]) => {
    //     this.recipeSerice.setRecipes(recipes);
    //   })
    // );
  }
}
