import { Controller,Post,Body,Put,HttpCode, HttpStatus,HttpException} from '@nestjs/common';
import { answer } from 'src/types/answer';
import { Enter } from './dto/enter.dto';
import { NewUser } from './dto/new-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){

    }
    

    @Put()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUser:NewUser){
        var user = await this.usersService.create(createUser)
        return {success:true,id:user.id}
    }
    @Post()
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
