import { Controller,Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
@Controller('orders')
export class OrdersAdminController {
    constructor(private orderService:OrdersService){}

    @Get('/all')
    getAll(){
        return this.orderService.getAll()
    }
    

}
