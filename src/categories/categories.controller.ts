import { Controller,Get,Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService:CategoriesService){}

    @Get()
    getAll(){
        return this.categoriesService.getAllParentWithChild()
    }

    @Get(':id')
    getOne(@Param() id:number){
        return this.categoriesService.getOne(id)
    }

    @Get('/children/:id')
    getChildren(@Param() id:number){
        return this.categoriesService.getChildren(id)
    }

}
