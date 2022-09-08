import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { Order } from './orders.entity';
import Product from './product.entity';


@Entity()
export default class Property{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    key:string

    @Column()
    value:string

    @ManyToOne(type=>Product, product=>product.properties,{onDelete:"CASCADE"})
    product:Product
}