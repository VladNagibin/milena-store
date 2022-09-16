import { Module,NestModule,MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { AdminMiddleware } from 'src/middlewares/admin.middleware';
import { CategoriesAdminController } from './categories.admin.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Category]),Category],
  controllers: [CategoriesController,CategoriesAdminController],
  providers: [CategoriesService]
})
export class CategoriesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AdminMiddleware)
    .forRoutes(CategoriesAdminController)
  }
}
