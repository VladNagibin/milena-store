import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import Product from 'src/entities/product.entity';
import { ProductsInOrders } from 'src/entities/productsInOrders.entity';
import { User } from 'src/entities/user.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order,User,ProductsInOrders]),Order],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
