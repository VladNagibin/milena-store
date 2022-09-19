import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeCategory } from './dto/change-category.dto';
import { NewCategory } from './dto/new-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository:Repository<Category>
        ){}
    getAllParent():Promise<Category[]>{
        return this.categoryRepository.findBy({parent:null})
    }
    getAllParentWithChild():Promise<Category[]>{
        return this.categoryRepository.createQueryBuilder('category').leftJoinAndSelect('category.products','product').getMany()
    }
    async getChildren(id:number|Category):Promise<Category[]>{
        var parentCategory:Category
        if(typeof id == "number"){
            parentCategory = await this.categoryRepository.findOneBy({id})
        }else{
            parentCategory = id
        }
        return this.categoryRepository.findBy({parent:parentCategory})
    }

    async getTreeOfCategories(id:number|null):Promise<any[]>{
        console.log(id)
        return this.categoryRepository.createQueryBuilder('category')
        .innerJoinAndSelect((subQuery)=>{
            return subQuery
            .select()
            .from(Category,'category')
            .where(id?'category.id =id':'category.parentId is null')
        },'parent','category.parentId = parent.id')
        .where('parent.id is not null')
        .orderBy('parent.id')
        .getRawMany()
    }

    getOne(id:number):Promise<Category>{
        return this.categoryRepository.createQueryBuilder('category').leftJoinAndSelect('category.products','product').where('category.id = :id',{id}).getOne()
    }

    async createOne(data:NewCategory):Promise<Category>{
        var parentCategory:Category|null
        if(typeof data.parent == 'number'){
            parentCategory = await this.categoryRepository.findOneBy({id:data.parent})
        }else{
            parentCategory = data.parent
        }
        return this.categoryRepository.save({
            name:data.name,
            parent:parentCategory
        })
    }
    async changeOne(data:ChangeCategory):Promise<Category>{
        let category = await this.categoryRepository.findOneBy({id:data.id})
        if(data.name){
            category.name = data.name
        }
        if(data.parent){
            category.parent = typeof data.parent =="number"?await this.categoryRepository.findOneBy({id:data.parent}):data.parent
        }
        return this.categoryRepository.save(category)
    }
    deleteOne(id:number):Promise<DeleteResult>{
        return this.categoryRepository.delete({id})
    }   
}
