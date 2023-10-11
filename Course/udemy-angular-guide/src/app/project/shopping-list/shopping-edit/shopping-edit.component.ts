import { Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  @ViewChild('f', { static: true }) slForm: NgForm;
  editMode: boolean = false;
  editedItemtIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemtIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient: Ingredient = {
      name: value.name,
      amount: value.amount,
    };

    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemtIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.resetForm();
  }

  onDelete() {
    // console.log(this.editedItemtIndex);
    this.slService.deleteIngredient(this.editedItemtIndex);
    this.onClear();
  }
}
