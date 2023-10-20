import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipt-item',
  templateUrl: './recipt-item.component.html',
  styleUrls: ['./recipt-item.component.scss'],
})
export class ReciptItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;
  // @Output() recipeSelected: EventEmitter<void> = new EventEmitter();

  constructor(private recipeService: RecipeService) {}

  // onSelected() {
  //   this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // }
}
