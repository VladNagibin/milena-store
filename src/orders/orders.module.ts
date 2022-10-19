import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import Product from 'src/entities/product.entity';
import { ProductsInOrders } from 'src/entities/productsInOrders.entity';
import { User } from 'src/entities/user.entity';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { OrdersAdminController } from './orders.admin.controller';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order,User,ProductsInOrders]),Order],
  controllers: [OrdersAdminController,OrdersController],
  providers: [OrdersService]
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware)
    .forRoutes(OrdersAdminController)
  }
}
