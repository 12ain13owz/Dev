import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shopping/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { LoggingService2 } from 'src/app/logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent {
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  ingredients: Ingredient[];
  ingredientsStore: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService2,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredientsStore = this.store.select('shoppingList');

    this.ingredients = this.slService.getAllIngredient();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printLog('Helo from ShoppingListComponent ngOnInit!');
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // console.log('this.subscription:', this.subscription);
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
