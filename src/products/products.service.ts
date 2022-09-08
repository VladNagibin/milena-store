import { Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import Product from 'src/entities/product.entity';
import Property from 'src/entities/properties.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeProduct } from './dto/change-product.dto';
import { NewProduct } from './dto/new-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Property)
        private propertyRepository: Repository<Property>,
    ) { }

    getAll(): Promise<Product[]> {
        return this.productRepository.createQueryBuilder('product').leftJoinAndSelect('product.properties','property').getMany()
        //return this.productRepository.find()
    }

    getOne(id: number): Promise<Product> {
        return this.productRepository.createQueryBuilder('product').leftJoinAndSelect('product.properties','property').where('product.id = :id',{id}).getOne()
        //return this.productRepository.findOneBy({ id })
    }

    async create(data: NewProduct): Promise<Product> {
        let category = this.categoryRepository.findOneBy({ id: data.categoryId })
        let properties: Array<Promise<Property>> = []
        if (data.properties) {
            data.properties.forEach(prop => {
                properties.push(this.propertyRepository.save(prop))
            })
        }
        let [foundedCategory, ...newProps] = await Promise.all([category, ...properties])
        return this.productRepository.save({
            name: data.name,
            category: foundedCategory,
            price: data.price,
            properties: newProps,
            description: data.description,
            discount: data.discount
        })
    }

    delete(id: number): Promise<DeleteResult> {
        return this.productRepository.delete({ id })
    }

    async change(data: ChangeProduct): Promise<Product | string> {
        let product = await this.productRepository.findOneBy({ id: data.id })
        if (!product) return "product not found"
        if (data.categoryId) {
            let newCategory = await this.categoryRepository.findOneBy({ id: data.categoryId })
            if (!newCategory) return "category not found"
            product.category = newCategory
        }
        if (data.description) {
            product.description = data.description
        }
        if (data.price) {
            product.price = data.price
        }
        if (data.discount) {
            product.discount = data.discount.value
            product.price = data.discount.changePrice ? product.price * (100 - data.discount.value) / 100 : product.price
        }
        if (data.name) {
            product.name = data.name
        }

        if (data.properties) {
            let propSavings: Array<Promise<Property | Error>> = []
            data.properties.forEach((prop) => {
                propSavings.push(new Promise((res, rej) => {
                    let propIndex = -1
                    if (prop.id) {
                        this.propertyRepository.save({
                            product: product,
                            key: prop.key,
                            value: prop.value
                        }).then(result => {
                            res(result)
                        }, err => rej({
                            success:false,
                            err:`new property save error: ${err}`
                        }))
                    } else {
                        this.propertyRepository.findOneBy({ id: prop.id }).then(dataProp => {
                            dataProp.key = prop.key
                            dataProp.value = prop.value
                            this.propertyRepository.save(dataProp).then(result => {
                                res(result)
                            }, err => rej({
                                success:false,
                                err:`property changing error: ${err}`
                            }))
                        })
                    }
                }))
            });
            try{
                await Promise.all(propSavings)
            }catch(e){
                throw new HttpException(e,HttpStatus.I_AM_A_TEAPOT)
            }
            

        }

        return this.productRepository.save(product)
    }

}
