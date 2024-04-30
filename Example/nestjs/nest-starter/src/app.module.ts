import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

const url: string =
  'mongodb://user_mongo:pass_mongo@localhost:27017/neststater?authSource=admin';

@Module({
  imports: [MongooseModule.forRoot(url), ProductsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
