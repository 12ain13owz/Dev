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
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editeItem: Ingredient;

  constructor(private slservice: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slservice.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editeItem = this.slservice.getIngredient(index);
        this.slForm.setValue({
          name: this.editeItem.name,
          amount: this.editeItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    if (this.editMode)
      this.slservice.updateIngredients(this.editedItemIndex, newIngredient);
    else this.slservice.addIngredient(newIngredient);

    this.slForm.resetForm();
    this.editMode = false;
  }

  onDeleteItem() {
    this.slservice.deletedIngredients(this.editedItemIndex);
    this.slForm.resetForm();
    this.editMode = false;
  }

  onClearItem() {
    this.slForm.resetForm();
    this.editMode = false;
  }
}
