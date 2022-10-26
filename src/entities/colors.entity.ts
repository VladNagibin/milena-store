import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import Product from './product.entity';


@Entity()
export default class Color{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    value:string

    @ManyToOne(type=>Product, product=>product.colors,{onDelete:"CASCADE"})
    product:Product
}