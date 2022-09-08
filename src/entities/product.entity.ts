import {Entity, Column, PrimaryGeneratedColumn, ManyToMany,ManyToOne,OneToMany} from 'typeorm'
import Category from './category.entity';
import { Order } from './orders.entity';
import Property from './properties.entity';

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

    
    @ManyToMany(type=>Order,order=>order.products)
    orders:Order[]

    @OneToMany(type=>Property,prop => prop.product)
    properties:Property[]

}