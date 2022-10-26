import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import * as dotenv from 'dotenv'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'
import Category from './entities/category.entity';
import { Order } from './entities/orders.entity';
import Product from './entities/product.entity';
import { ProductsInOrders } from './entities/productsInOrders.entity';
import Property from './entities/properties.entity';
import { User } from './entities/user.entity';
import Size from './entities/sizes.entity';
import Color from './entities/colors.entity';
dotenv.config()


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..', 'public'),
    // rootPath: join(__dirname,'..', 'admin_panel','dist'),
  
  }), ProductsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',///'172.17.0.2',//
    port: 5432,
    username: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    entities: [Category,Order,Product,ProductsInOrders,Property,User,Size,Color],
    synchronize: true
  }), UsersModule, CategoriesModule, OrdersModule],
})
export class AppModule {
}
