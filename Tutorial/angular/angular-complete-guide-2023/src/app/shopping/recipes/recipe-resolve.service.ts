import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStroageService } from '../shared/data-storage.service';
import { Observable, take } from 'rxjs';
import { RecipeService } from './recipe.service';
import { Store } from '@ngrx/store';
import { AppState } from '../shopping-list/store/shopping-list.reducer';
import { fetchRecipes } from './store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { selectRecipes } from './store/recipe.selectors';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStroageService,
    private recipesService: RecipeService,
    private store: Store<AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipesService.getRecipes();

    // if (recipes.length == 0) return this.dataStorageService.fetchRecipes();
    // return recipes;

    return this.store.select(selectRecipes);
  }
}
