import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription;
  ingredients: Ingredient[];

  constructor(private siService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.siService.getIngredients();
    this.subscriptions = this.siService.ingredientsChanged.subscribe(
      (ingredient: Ingredient[]) => {
        this.ingredients = ingredient;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscriptions) this.subscriptions.unsubscribe();
  }

  onEditItem(index: number) {
    this.siService.startEditing.next(index);
  }
}
