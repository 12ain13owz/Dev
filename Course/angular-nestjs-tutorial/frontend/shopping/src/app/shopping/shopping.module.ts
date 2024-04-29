import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingSearchComponent } from './shopping-search/shopping-search.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ShoppingCartComponent, ShoppingSearchComponent],
  imports: [CommonModule, InputTextModule],
  exports: [ShoppingCartComponent, ShoppingSearchComponent],
})
export class ShoppingModule {}
