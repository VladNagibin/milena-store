import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import AdminCategoryTree from 'src/users/dto/admin-category-tree.dto';
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

    async AdminTreeOfCategories(): Promise<AdminCategoryTree[]> {
        var data = await this.categoryRepository.query(`
        with RECURSIVE r as (
            select id, "parentId", name,CAST(name as VARCHAR(100)) as PATH, 1 as level from category
            where "parentId" is NULL
            
            union 
            select category.id, category."parentId", category.name, CAST(r.PATH || '->' || category.name AS VARCHAR(100)), r.level+1 from category 
            join r on category."parentId" = r.id
        )
        
        select * from r`)
        if (data.length == 0) {
            return []
        }
        return this.getAllChildren(data, null)



    }
    getAllChildren = (array: Array<{
        id: string
        parentId: string
        name: string,
        path: string,
        level: number
    }>, parentId): AdminCategoryTree[] => {
        var responce: AdminCategoryTree[] = []
        array.filter(el => el.parentId == parentId).forEach(el => {
            responce.push({
                id: el.id,
                name: el.name,
                parentId: el.parentId,
                path: el.path,
                level: el.level,
                children: []
            })
        })
        responce.forEach(el => {
            el.children = this.getAllChildren(array, el.id)
        })
        return responce
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

    async getOne(id: number): Promise<OneCategory> {

        let data = await this.categoryRepository.query(`with RECURSIVE r as (
            select id, "parentId", name,1 as Level from category
            where id = ${id}
            
            union 
            select category.id, category."parentId", category.name, r.Level +1 from category 
            join r on category."parentId" = r.id
        )
        
        select r.name, 
		r.id, 
		r.level, 
		product.id as product_id, 
		product.name as product_name,
		product.price as product_price,
		product.discount as product_discount,
        product.latest as latest,
        product.favorite as favorite,
		product.description as product_description,
		property.key as property_key,
        property.id as property_id,
		property.value as property_value,
		size.id as size_id,
		size.value as size_value,
        color.id as color_id,
		color.value as color_value
		from r left join product on product."categoryId" = r.id 
		left join property ON property."productId" = product.id
		left join size ON size."productId" = product.id
        left join color ON color."productId" = product.id
		order by r.level`)
        if (!data.length) {

        }
        let first = data[0]
        let products: Array<{
            id: string
            name: string
            price: number
            discount: number
            description: number
            favorite:boolean
            latest:boolean
            properties: Array<{
                id: number
                key: string
                value: string
            }>
            sizes: Array<{
                id: number
                value: string
            }>
            colors: Array<{
                id: number
                value: string
            }>
        }> = []
        data.forEach(element => {
            if (element.product_id) {
                var index = products.findIndex(el => el.id == element.product_id)
                if (index == -1) {
                    products.push({
                        id: element.product_id,
                        name: element.product_name,
                        price: element.product_price,
                        discount: element.product_discount,
                        description: element.product_description,
                        favorite:element.favorite,
                        latest:element.latest,
                        properties: [],
                        sizes: [],
                        colors: []
                    })
                }
                if (element.property_key) {
                    var indexProp = products[index == -1 ? products.length - 1 : index].properties.findIndex(el => el.id == element.property_id)
                    if (indexProp == -1) {
                        products[index == -1 ? products.length - 1 : index].properties.push({
                            id: element.property_id,
                            key: element.property_key,
                            value: element.property_value
                        })
                    }

                }
                if (element.size_id) {
                    var indexSize = products[index == -1 ? products.length - 1 : index].sizes.findIndex(el => el.id == element.size_id)
                    if (indexSize == -1) {
                        products[index == -1 ? products.length - 1 : index].sizes.push({
                            id: element.size_id,
                            value: element.size_value
                        })
                    }

                }
                if (element.color_id) {
                    var indexColor = products[index == -1 ? products.length - 1 : index].colors.findIndex(el => el.id == element.color_id)
                    if (indexColor == -1) {
                        products[index == -1 ? products.length - 1 : index].colors.push({
                            id: element.color_id,
                            value: element.color_value
                        })
                    }
                }

            }
        })
        let responce: OneCategory = {
            id: first.id,
            name: first.name,
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
            if (data.parent == 0) {
                category.parent == null
            }
        }
        return this.categoryRepository.save(category)
    }
    deleteOne(id: number): Promise<DeleteResult> {
        return this.categoryRepository
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("id = :id", { id })
            .execute()
    }
}
