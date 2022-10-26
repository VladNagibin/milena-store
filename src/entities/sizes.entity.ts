import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import Product from './product.entity';


@Entity()
export default class Size{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    value:string

    @ManyToOne(type=>Product, product=>product.sizes,{onDelete:"CASCADE"})
    product:Product
}