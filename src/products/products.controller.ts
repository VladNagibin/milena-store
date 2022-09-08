import { Controller,Get,Param} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService:ProductsService){}

    @Get()
    getAll(){
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.productsService.getOne(id)
    }

    
}
