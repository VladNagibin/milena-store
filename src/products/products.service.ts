import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir } from 'node:fs/promises';
import Category from 'src/entities/category.entity';
import Color from 'src/entities/colors.entity';
import Product from 'src/entities/product.entity';
import Property from 'src/entities/properties.entity';
import Size from 'src/entities/sizes.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ChangeProduct } from './dto/change-product.dto';
import { NewProduct } from './dto/new-product.dto';
import ProductDto from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Property)
        private propertyRepository: Repository<Property>,
        @InjectRepository(Size)
        private sizeRepository: Repository<Size>,
        @InjectRepository(Color)
        private colorRepository: Repository<Color>,
    ) { }

    getAll(): Promise<Product[]> {
        return this.productRepository.createQueryBuilder('product').leftJoinAndSelect('product.properties', 'property').getMany()
        //return this.productRepository.find()
    }

    async getOne(id: number): Promise<ProductDto> {
        return new Promise((res, rej) => {
            const Pdata = this.productRepository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.properties', 'property')
                .leftJoinAndSelect('product.sizes', 'size')
                .leftJoinAndSelect('product.colors', 'color')
                .where('product.id = :id', { id }).getOne()
            const PallFiles = readdir(`public/pictures/${id}`, {
                withFileTypes: true
            })
            Promise.allSettled([Pdata, PallFiles]).then(([data, allFiles]) => {
                if (data.status == 'rejected') {
                    rej(data.reason)
                } else {
                    if (allFiles.status == 'fulfilled') {
                        const pics = allFiles.value.filter(el => el.isFile()).map(el => `/pictures/${id}/${el.name}`)
                        res({
                            ...data.value,
                            pics
                        })
                    } else {
                        res(data.value)
                    }
                }
            })
        })

        //return this.productRepository.findOneBy({ id })
    }

    async create(data: NewProduct): Promise<Product> {
        let category = this.categoryRepository.findOneBy({ id: data.categoryId })
        let properties: Array<Promise<Property>> = []
        let sizes: Array<Promise<Size>> = []
        let colors: Array<Promise<Color>> = []
        if (data.properties) {
            data.properties.forEach(prop => {
                properties.push(this.propertyRepository.save(prop))
            })
        }
        if (data.sizes) {
            data.sizes.forEach(size => {
                sizes.push(this.sizeRepository.save(size))
            })
        }
        if (data.colors) {
            data.colors.forEach(color => {
                colors.push(this.colorRepository.save(color))
            })
        }
        let newSizes = Promise.all(sizes)
        let newProps = Promise.all(properties)
        let newColors = Promise.all(colors)
        let [foundedCategory, savedSizes, savedProps,savedColors] = await Promise.all([category, newSizes, newProps,newColors])
        return this.productRepository.save({
            name: data.name,
            category: foundedCategory,
            price: data.price,
            properties: savedProps,
            description: data.description,
            discount: data.discount,
            sizes: savedSizes,
            colors:savedColors
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
            product.discount = data.discount
            // product.price = data.discount.changePrice ? product.price * (100 - data.discount) / 100 : product.price
        }
        if (data.name) {
            product.name = data.name
        }

        if (data.properties) {
            await this.propertyRepository.delete({ product })
            let propSavings: Array<Promise<Property | Error>> = []
            data.properties.forEach((prop) => {
                propSavings.push(new Promise((res, rej) => {
                    this.propertyRepository.save({
                        product: product,
                        key: prop.key,
                        value: prop.value
                    }).then(result => {
                        res(result)
                    }, err => rej({
                        success: false,
                        err: `new property save error: ${err}`
                    }))
                }))
            });
            try {
                await Promise.all(propSavings)
            } catch (e) {
                throw new HttpException(e, HttpStatus.I_AM_A_TEAPOT)
            }


        }
        if (data.sizes) {
            await this.sizeRepository.delete({ product })
            let sizesSavings: Array<Promise<Size | Error>> = []
            data.sizes.forEach(size => {
                sizesSavings.push(new Promise((res, rej) => {
                    this.sizeRepository.save({
                        product: product,
                        value: size.value
                    }).then(result => {
                        res(result)
                    }, err => rej({
                        success: false,
                        err: `new size save error: ${err}`
                    }))

                }))
            })
            try {
                await Promise.all(sizesSavings)
            } catch (e) {
                throw new HttpException(e, HttpStatus.I_AM_A_TEAPOT)
            }
        }
        if (data.colors) {
            await this.colorRepository.delete({ product })
            let colorsSavings: Array<Promise<Size | Error>> = []
            data.colors.forEach(color => {
                colorsSavings.push(new Promise((res, rej) => {
                    this.colorRepository.save({
                        product: product,
                        value: color.value
                    }).then(result => {
                        res(result)
                    }, err => rej({
                        success: false,
                        err: `new color save error: ${err}`
                    }))

                }))
            })
            try {
                await Promise.all(colorsSavings)
            } catch (e) {
                throw new HttpException(e, HttpStatus.I_AM_A_TEAPOT)
            }
        }

        return this.productRepository.save(product)
    }

    async setFavorite(id:number,favorite:boolean){
        const product = await this.productRepository.findOneBy({id})
        if((!product.favorite && favorite) || (product.favorite && !favorite) ){
            product.favorite = favorite
            await this.productRepository.save(product)
        }
        return product
    }

    async setLatest(id:number,latest:boolean){
        const product = await this.productRepository.findOneBy({id})
        if((!product.latest && latest) || (product.latest && !latest) ){
            product.latest = latest
            await this.productRepository.save(product)
        }
        return product
    }
    getFavorites(){
        return this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.properties', 'property')
        .leftJoinAndSelect('product.sizes', 'size')
        .leftJoinAndSelect('product.colors', 'color')
        .where('product.favorite').getMany()
    }
    getLatest(){
        return this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.properties', 'property')
        .leftJoinAndSelect('product.sizes', 'size')
        .leftJoinAndSelect('product.colors', 'color')
        .where('product.latest').getMany() 
    }

}
