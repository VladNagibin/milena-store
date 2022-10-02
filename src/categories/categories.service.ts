import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeCategory } from './dto/change-category.dto';
import { NewCategory } from './dto/new-category.dto';
import { OneCategory } from './dto/one-category.dto';
import { TreeCategories } from './dto/tree-categories.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }
    getAllParent(): Promise<Category[]> {
        return this.categoryRepository.findBy({ parent: null })
    }
    getAllParentWithChild(): Promise<Category[]> {
        return this.categoryRepository.createQueryBuilder('category').leftJoinAndSelect('category.products', 'product').getMany()
    }
    async getChildren(id: number | Category): Promise<Category[]> {
        var parentCategory: Category
        if (typeof id == "number") {
            parentCategory = await this.categoryRepository.findOneBy({ id })
        } else {
            parentCategory = id
        }
        return this.categoryRepository.findBy({ parent: parentCategory })
    }



    async getTreeOfCategories(id: number | null): Promise<TreeCategories[]> {
        var data = await this.categoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect((subQuery) => {
                return subQuery
                    .select()
                    .from(Category, 'category')
                    .where('category.parentId is not null')
            }, 'child', 'child.\"parentId\" = category.id')
            .where(id ? `category.parentId =${id}` : 'category.parentId is null')
            .orderBy('category.id')
            .getRawMany()
        var result: TreeCategories[] = []
        if (data.length == 0) {
            return []
        }
        var filteredData: Array<any> = data
        while (filteredData.length) {
            var dataWithId: Array<any> = filteredData.filter(elem => elem.category_id == filteredData[0].category_id)
            var categories: Array<{
                id: number
                name: string
                parentId: null | number
            }> = []
            dataWithId.forEach(elem => {
                if (elem.id !== null) {
                    categories.push({
                        id: elem.id,
                        name: elem.name,
                        parentId: elem.parentId
                    })
                }
            })
            result.push({
                name: dataWithId[0].category_name,
                id: dataWithId[0].category_id,
                parentId: dataWithId[0].category_parentId,
                categories
            })
            filteredData = filteredData.filter(elem => elem.category_id !== filteredData[0].category_id)
        }
        return (result)

    }

    async getOne(id: number): Promise<OneCategory > {
        
        let data = await this.categoryRepository.query(`with RECURSIVE r as (
            select id, "parentId", name,1 as Level from category
            where id = ${id}
            
            union 
            select category.id, category."parentId", category.name, r.Level +1 from category 
            join r on category."parentId" = r.id
        )
        
        select r.name, r.id, r.level, product.id as product_id, product.name as product_name,product.price as product_price,product.discount as product_discount,product.description as product_description from r left join product on product."categoryId" = r.id order by r.level`)
        if (!data.length) {
            
        }
        let first = data[0]
        let products = []
        data.forEach(element => {
            if (element.product_id) {
                products.push({
                    id:element.product_id,
                    name:element.product_name,
                    price:element.product_price,
                    discount:element.product_discount,
                    description:element.product_description,
                })
            }
        })
        let responce: OneCategory = {
            id:first.id,
            name:first.name,
            products
        }
        return responce
    }

    async createOne(data: NewCategory): Promise<Category> {
        var parentCategory: Category | null
        if (typeof data.parent == 'number') {
            parentCategory = await this.categoryRepository.findOneBy({ id: data.parent })
        } else {
            parentCategory = data.parent
        }
        return this.categoryRepository.save({
            name: data.name,
            parent: parentCategory
        })
    }
    async changeOne(data: ChangeCategory): Promise<Category> {
        let category = await this.categoryRepository.findOneBy({ id: data.id })
        if (data.name) {
            category.name = data.name
        }
        if (data.parent) {
            category.parent = typeof data.parent == "number" ? await this.categoryRepository.findOneBy({ id: data.parent }) : data.parent
        }
        return this.categoryRepository.save(category)
    }
    deleteOne(id: number): Promise<DeleteResult> {
        return this.categoryRepository.delete({ id })
    }
}
