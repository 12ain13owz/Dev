import { Injectable } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';

@Injectable()
export class ProductService {
  private product: ProductDTO[] = [
    { name: 'Mango', id: 1, price: 250 },
    { name: 'Apple', id: 2, price: 150 },
    { name: 'PineApple', id: 3, price: 50 },
  ];

  findAll(): ProductDTO[] {
    return this.product;
  }

  findById(id: number): ProductDTO {
    return this.product.find((product) => product.id === id);
  }

  findByCondition(predicate: (product: ProductDTO) => boolean) {
    return this.product.filter((product) => predicate(product));
  }
}
