import { Controller,Param,Post,Delete,Body,Patch, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ChangeCategory } from './dto/change-category.dto';
import { NewCategory } from './dto/new-category.dto';

@Controller('categories')
export class CategoriesAdminController {
    constructor(private categoriesService:CategoriesService){}

    @Post()
    createOne(@Body() data:NewCategory){
        return this.categoriesService.createOne(data)
    }

    @Patch()
    changeOne(@Body() data:ChangeCategory){
        return this.categoriesService.changeOne(data)
    }

    @Delete(':id')
    deleteOne(@Param('id') id:number){
        return this.categoriesService.deleteOne(id)
    }

    @Get('/admin/tree')
    getAdminTree(){
        return this.categoriesService.AdminTreeOfCategories()
    }

}
