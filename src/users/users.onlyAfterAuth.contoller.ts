import { Body, Controller, Get, Param, Patch} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { ContactInfo } from './dto/contact-info.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersOnlyAfterAuthController {
    constructor(private readonly usersService:UsersService){}
    @Get(':login')
    getOne(@Param('login') login:string):Promise<User>{
        return this.usersService.findOne(login)
    }
    @Get('/orders/:login')
    getAllOrders(@Param('login') login:string):Promise<User>{
        return this.usersService.getAllOrders(login)
    }
    @Patch(':login')
    setContactInfo(@Param('login') login:string,@Body() data:ContactInfo){
        return this.usersService.setContactInfo(login,data.email,data.phone)
    }
}


