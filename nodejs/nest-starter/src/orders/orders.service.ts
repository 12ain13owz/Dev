import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private proaductService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productResult = await this.proaductService.findOne(
      createOrderDto.productId,
    );

    if (!productResult) throw new NotFoundException('Product id not found');
    return await this.orderModel.create(createOrderDto);
  }

  async findOne(id: string): Promise<Order> {
    const product = this.proaductService.findOne(id);

    return await this.orderModel.findById(id).populate('productId');
  }
}
