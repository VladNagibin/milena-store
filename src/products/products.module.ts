import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import Product from 'src/entities/product.entity';
import Property from 'src/entities/properties.entity';
import { ProductMiddleware } from './product.middleware';
import { ProductAdminController } from './products.admin.controller';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[Product, TypeOrmModule.forFeature([Product,Category,Property])],
  providers: [ProductsService],
  controllers:[ProductsController,ProductAdminController]
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ProductMiddleware)
    .forRoutes(ProductAdminController)
  }
}
