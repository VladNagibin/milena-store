import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from 'src/entities/user.entity';
import { UserMiddleware } from 'src/middlewares/user.middleware';

import { UsersController } from './users.controller';
import { UsersOnlyAfterAuthController } from './users.onlyAfterAuth.contoller';
import { UsersService } from './users.service';


@Module({
  imports:[TypeOrmModule.forFeature([User]),User],
  providers: [UsersService],
  controllers:[UsersController,UsersOnlyAfterAuthController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(UserMiddleware)
    .forRoutes(UsersOnlyAfterAuthController)
  }
}
