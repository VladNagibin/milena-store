import { Body, Controller,Get, Param, Patch } from '@nestjs/common';
import Product from 'src/entities/product.entity';
import Status from 'src/types/status';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersAdminController {
    constructor(private orderService:OrdersService){}

    @Get('/all')
    getAll(){
        return this.orderService.getAll()
    }
    
    @Patch(':id/:status')
    setStatus(@Param('id') id:number,@Param('status') status:Status){
        return this.orderService.setStatus({
            id,
            status
        })
    }   
    @Patch(':id')
    changeOrder(@Body() data:Array<Product | number>, @Param('id') id:number){
        return this.orderService.changeOrder({
            id,
            products:data
        })
    }
}
