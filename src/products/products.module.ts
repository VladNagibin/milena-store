import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import Color from 'src/entities/colors.entity';
import Product from 'src/entities/product.entity';
import Property from 'src/entities/properties.entity';
import Size from 'src/entities/sizes.entity';
import { AdminMiddleware } from '../middlewares/admin.middleware';
import { ProductAdminController } from './products.admin.controller';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    Product,
    TypeOrmModule.forFeature([Product, Category, Property, Size, Color]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController, ProductAdminController],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes(ProductAdminController);
  }
}
