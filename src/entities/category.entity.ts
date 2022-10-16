import {Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne} from 'typeorm'
import Product from './product.entity'
@Entity()
export default class Category{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
///self-referencing
    @ManyToOne(type=>Category,cat=>cat.childCategories,{onDelete:'SET NULL',onUpdate:"NO ACTION"})
    parent:Category

    @OneToMany(type=>Category,cat=>cat.parent)
    childCategories:Category[]
///
    @OneToMany(type=>Product, product=> product.category )
    products:Product[]
}