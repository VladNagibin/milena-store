import {Entity, Column, PrimaryGeneratedColumn,ManyToOne,OneToMany} from 'typeorm'
import Category from './category.entity';
import Color from './colors.entity';
import { ProductsInOrders } from './productsInOrders.entity';
import Property from './properties.entity';
import Size from './sizes.entity';

@Entity()
export default class Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    price:number

    @Column({nullable:true})
    discount:number
    
    @Column({nullable:true})
    description:string

    @ManyToOne(type=>Category,category=>category.products,{onDelete:'SET NULL'})
    category:Category

    @OneToMany(type=>ProductsInOrders,order=>order.product,{onDelete:'SET NULL'})
    orders:ProductsInOrders[]

    @OneToMany(type=>Property,prop => prop.product)
    properties:Property[]

    @OneToMany(type=>Size,size => size.product)
    sizes:Size[]

    @OneToMany(type=>Color,color => color.product)
    colors:Color[]

}