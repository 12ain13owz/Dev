import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shopping/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;

  // @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter();

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription = new Subscription();
  editMode = false;
  editedItemIndex: number;
  editeItem: Ingredient;

  constructor(
    private slservice: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    // Rxjs
    this.subscription.add(
      this.slservice.startedEditing.subscribe((index: number) => {
        this.editedItemIndex = index;
        this.editeItem = this.slservice.getIngredient(index);
        // this.editMode = true;
        // this.slForm.setValue({
        //   name: this.editeItem.name,
        //   amount: this.editeItem.amount,
        // });
      })
    );

    // Ngrx
    this.subscription.add(
      this.store.select('shoppingList').subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editeItem = stateData.editedIngredient;
          this.slForm.setValue({
            name: this.editeItem.name,
            amount: this.editeItem.amount,
          });
        } else {
          this.editMode = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  // onAddItem() {
  // const ingName = this.nameInputRef.nativeElement.value;
  // const ingAmount = this.amountInputRef.nativeElement.value;
  // const newIngredient = new Ingredient(ingName, ingAmount);

  // this.ingredientAdded.emit(newIngredient);
  // this.shoppingService.addIngredient(newIngredient);
  // }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      // Use Rxjs
      this.slservice.updateIngredients(this.editedItemIndex, newIngredient);

      // Use Ngrx store
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.slservice.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.slForm.resetForm();
    this.editMode = false;
  }

  onDeleteItem() {
    this.slservice.deletedIngredients(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.slForm.resetForm();
    this.editMode = false;
  }

  onClearItem() {
    this.slForm.resetForm();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
