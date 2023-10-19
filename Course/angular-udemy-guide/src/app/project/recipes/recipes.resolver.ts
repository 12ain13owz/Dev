import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { RecipeService } from './recipe.service';

export const recipesResolver: ResolveFn<Recipe[]> = (route, state) => {
  const dataStorageService = inject(DataStorageService);
  const recipesService = inject(RecipeService);
  const recipes = recipesService.getRecipes();

  if (recipes.length <= 0) return dataStorageService.fetchRecipes();
  return recipes;
};
