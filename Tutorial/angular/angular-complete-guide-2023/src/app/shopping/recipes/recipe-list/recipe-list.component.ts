import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { selectRecipes } from '../store/recipe.selectors';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter();
  recipes: Recipe[] = [];
  subscription: Subscription;

  // recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipt A',
  //     'This is simply a test',
  //     'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg'
  //   ),
  //   new Recipe(
  //     'A Test Recipt B',
  //     'This is simply a test',
  //     'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg'
  //   ),
  // ];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Rxjs
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );

    // Ngrx
    this.subscription = this.store
      .select(selectRecipes)
      .subscribe((recipes: Recipe[]) => (this.recipes = recipes));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
