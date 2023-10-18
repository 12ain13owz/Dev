import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { environment } from 'src/environments/environment.development';
import { catchError, map, tap, throwError } from 'rxjs';
import { SharedModule } from './shared.module';

@Injectable()
export class DataStorageService {
  private firebaseAPIUrl = environment.firebaseAPIUrl;
  private dbName = 'recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http
      .put(this.firebaseAPIUrl + this.dbName, recipes)
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.firebaseAPIUrl + this.dbName).pipe(
      catchError((errRes) => throwError(() => errRes)),
      map((recipes) => {
        if (recipes === null) return [];
        return recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        }));
      }),
      tap((recipes) => this.recipeService.setRecipes(recipes))
    );
  }
}
