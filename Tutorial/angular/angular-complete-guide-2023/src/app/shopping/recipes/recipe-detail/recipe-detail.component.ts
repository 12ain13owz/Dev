import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;

  constructor(
    private receipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    // this.recipe = this.receipeService.getRecipesByID(+id);

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.receipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.receipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    // this.router.navigate(['shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route }); ทำงานเหมือนข้างบน
  }

  onDeleteRecipe() {
    this.receipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
