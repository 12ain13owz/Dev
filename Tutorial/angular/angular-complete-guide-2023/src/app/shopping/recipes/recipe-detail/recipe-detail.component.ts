import { Component, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Subscription, map, switchMap } from 'rxjs';
import { deleteRecipe } from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  subscription: Subscription;

  constructor(
    private receipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.recipe = this.receipeService.getRecipesByID(+id);

    // Rxjs
    // this.route.params.subscribe((params: Params) => {
    // this.id = +params['id'];

    // this.recipe = this.receipeService.getRecipe(this.id);
    // });

    // Ngrx
    this.route.params
      .pipe(
        map((params: Params) => +params['id']),
        switchMap((id: number) => {
          this.id = id;
          return this.store.select('recipe');
        }),
        map((recipesState) =>
          recipesState.recipes.find((recipes, index) => index === this.id)
        )
      )
      .subscribe((recipe: Recipe) => (this.recipe = recipe));
  }

  onAddToShoppingList() {
    this.receipeService.addIngredientsToShoppingList(this.recipe.ingredients);

    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
    // this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }); ทำงานเหมือนข้างบน
  }

  onDeleteRecipe() {
    // rxjs
    // this.receipeService.deleteRecipe(this.id);

    this.store.dispatch(deleteRecipe({ index: this.id }));
    this.router.navigate(['/recipes']);
  }
}
