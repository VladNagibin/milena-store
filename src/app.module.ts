import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import * as dotenv from 'dotenv'
import { ClientModule } from './client/client.module';
dotenv.config()


@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:process.env.DB_LOGIN,
    password:process.env.DB_PASSWORD,
    database:process.env.DB,
    entities:['dist/entities/**/*.entity.js'],
    synchronize:true
  }),UsersModule, CategoriesModule, OrdersModule,ClientModule],
})
export class AppModule {
}
