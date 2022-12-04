import { Controller, Param, Post, Body, Patch, Delete, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { ChangeProduct } from './dto/change-product.dto';
import { NewProduct } from './dto/new-product.dto';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync, mkdir, } from 'fs';
import { rm  } from 'node:fs/promises';
import { deleteAdditionalPic } from './dto/delete-additional-pic.dto';

@Controller('products')
export class ProductAdminController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() data: NewProduct) {
        return this.productsService.create(data)
    }
    @Post('/picture/:id')
    @UseInterceptors(FileInterceptor('picture'))
    setPic(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        writeFileSync(`public/pictures/${id}.png`, file.buffer)
        return {
            success: true,
            message: 'picture was successfully saved'
        }
    }
    @Put('/:id/favorite/set')
    setFavorite(@Param('id') id:number){
        return this.productsService.setFavorite(id,true)
    }
    @Put('/:id/favorite/unset')
    unsetFavorite(@Param('id') id:number){
        return this.productsService.setFavorite(id,false)
    }
    @Put('/:id/latest/set')
    setLatest(@Param('id') id:number){
        return this.productsService.setLatest(id,true)
    }
    @Put('/:id/latest/unset')
    unsetLatest(@Param('id') id:number){
        return this.productsService.setLatest(id,false)
    }
    @Post('/picture/additional/:id')
    @UseInterceptors(FileInterceptor('picture'))
    setAdditionalPic(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
        mkdir(`public/pictures/${id}`, function (err) {

            writeFileSync(`public/pictures/${id}/${file.originalname}`, file.buffer)
        });

        return {
            success: true,
            message: 'picture was successfully saved'
        }
    }

    @Delete('picture/additional')
    async deleteAdditionalPic(@Body() body: deleteAdditionalPic[]) {
        var promises:Array<Promise<any>> = []
        body.forEach(el => {
            promises.push(rm(`public${el.url}`))
            // rmSync(`public/${url}`)
        })
        await Promise.all(promises)
        return {
            success: true,
            message: 'picture was successfully saved'
        }
    }

    @Patch()
    change(@Body() data: ChangeProduct) {
        return this.productsService.change(data)
    }
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.productsService.delete(id)
    }
}