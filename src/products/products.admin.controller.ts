import { Controller,Param,Post,Body,Patch,Delete} from '@nestjs/common';
import { ChangeProduct } from './dto/change-product.dto';
import { NewProduct } from './dto/new-product.dto';


import { ProductsService } from './products.service';

@Controller('products')
export class ProductAdminController{
    constructor(private readonly productsService:ProductsService){}

    @Post()
    create(@Body() data:NewProduct){
        return this.productsService.create(data)
    }

    @Patch()
    change(@Body() data:ChangeProduct){
        return this.productsService.change(data)
    }
    @Delete(':id')
    delete(@Param('id') id:number){
        return this.productsService.delete(id)
    }
}