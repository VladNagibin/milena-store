import { Controller,Param,Post,Body,Patch,Delete, UseInterceptors,UploadedFile} from '@nestjs/common';
import { ChangeProduct } from './dto/change-product.dto';
import { NewProduct } from './dto/new-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {writeFileSync} from 'fs';

@Controller('products')
export class ProductAdminController{
    constructor(private readonly productsService:ProductsService){}

    @Post()
    create(@Body() data:NewProduct){
        return this.productsService.create(data)
    }
    @Post('/picture/:id')
    @UseInterceptors(FileInterceptor('picture'))
    setPic(@Param('id') id:number,@UploadedFile() file:Express.Multer.File){
        writeFileSync(`public/${id}.png`,file.buffer)
        return {
            success:true,
            message:'picture was successfully saved'
        }
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