import { Controller,Get, Post,Patch,Param,Body } from '@nestjs/common';
import { NewOrder } from './dto/new-order.dto';
import { OrdersService } from './orders.service';
import Status from '../types/status'
import Product from 'src/entities/product.entity';
@Controller('orders')
export class OrdersController {
    constructor(private orderService:OrdersService){}

    @Get(':id')
    getById(@Param('id') id:number){
        return this.orderService.getById(id)
    }
    @Post()
    createOrder(@Body() data:NewOrder){
        return this.orderService.createNew(data)
    }

    

}
