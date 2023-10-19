import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../shared/recipe.model';

interface RecipeForm {
  name: FormControl<string>;
  imagePath: FormControl<string>;
  description: FormControl<string>;
  ingredients: FormArray<FormGroup<IngrdientsForm>>;
}

interface IngrdientsForm {
  name: FormControl<string>;
  amount: FormControl<number>;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  isEdit = false;
  recipeForm: FormGroup<RecipeForm>;

  get ingredients() {
    return this.recipeForm.controls['ingredients'];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEdit = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit(): void {
    const newRecipe: Recipe = {
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
      imagePath: this.recipeForm.value.imagePath,
      // Ex.1
      // ingredients: this.recipeForm.value.ingredients.map((item) => ({
      //   name: item.name,
      //   amount: item.amount,
      // })),

      // Ex.2
      ingredients: this.ingredients.getRawValue(),
    };

    if (this.isEdit) {
      // Ex.1 ส้งข้อมูลทั้งฟอร์ม ต้องใช้ getRawValue เนื่องจาก value มี ingredients เป็น Partial
      this.recipeService.updateRecipe(this.id, this.recipeForm.getRawValue());
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.onCancel();
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddIngredient() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    // remove by index
    this.ingredients.removeAt(index);

    // remove all
    // this.ingredients.clear();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.isEdit) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
