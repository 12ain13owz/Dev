import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingModule } from './shopping/shopping.module';
import { Product } from './shopping/model/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);

  title = 'shopping';

  products: Product[] = [];

  filteredProducts: Product[] = this.products;

  ngOnInit(): void {
    this.http.get<Product[]>('/api/product').subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    });
  }

  searchProduct(value: string) {
    this.filteredProducts = this.products.filter((product) => {
      const productName = product.name.toLocaleLowerCase();
      const searchValue = value.toLocaleLowerCase();

      return productName.indexOf(searchValue) !== -1;
    });
  }
}
