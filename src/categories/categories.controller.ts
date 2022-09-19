import { Controller,Get,Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService:CategoriesService){}

    @Get()
    getAll(){
        return this.categoriesService.getAllParentWithChild()
    }

    @Get('tree')
    getTreeOfParent(){
        return this.categoriesService.getTreeOfCategories(null)
    }
    @Get('/tree/:id')
    getTreeOfCategories(@Param('id') id:number){
        return this.categoriesService.getTreeOfCategories(id)
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.categoriesService.getOne(id)
    }

    @Get('/children/:id')
    getChildren(@Param() id:number){
        return this.categoriesService.getChildren(id)
    }

}
