import { Controller, Get, Param ,Post,Body,Put,HttpCode, HttpStatus,HttpException} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { answer } from 'src/types/answer';
import { Enter } from './dto/enter.dto';
import { NewUser } from './dto/new-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){

    }
    @Get(':id')
    getOne(@Param('id') id:number):Promise<User>{
        return this.usersService.findOne(id)
    }
    @Get('/orders/:id')
    getAllOrders(@Param('id') id:number):Promise<User>{
        return this.usersService.getAllOrders(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUser:NewUser){
        var user = await this.usersService.create(createUser)
        return {success:true,id:user.id}
    }
    @Put()
    @HttpCode(HttpStatus.ACCEPTED)
    async enter(@Body() data:Enter):Promise<answer>{
        try{
            var answer = await this.usersService.enterInAccount(data)
            return answer
        }catch(e){
            throw new HttpException(e,HttpStatus.UNAUTHORIZED)
        }
        
    }

}
