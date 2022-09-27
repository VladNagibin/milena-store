import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeCategory } from './dto/change-category.dto';
import { NewCategory } from './dto/new-category.dto';
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

    getOne(id: number): Promise<Category> {
        return this.categoryRepository.createQueryBuilder('category').leftJoinAndSelect('category.products', 'product').where('category.id = :id', { id }).getOne()
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
