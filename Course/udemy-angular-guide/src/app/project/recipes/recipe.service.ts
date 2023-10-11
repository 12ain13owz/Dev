import { Injectable } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    {
      name: 'A Test Recipe',
      description: 'This is simply a test',
      imagePath:
        'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg',
      ingredients: [
        { name: 'Meat', amount: 1 },
        { name: 'French Fries', amount: 20 },
      ],
    },

    {
      name: 'Cake',
      description: 'This is a cake',
      imagePath:
        'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552_640.jpg',
      ingredients: [
        { name: 'Cream', amount: 5 },
        { name: 'Bread', amount: 10 },
      ],
    },
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
