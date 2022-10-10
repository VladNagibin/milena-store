import Status from 'src/types/status'
import {Entity, Column, PrimaryGeneratedColumn, ManyToMany,ManyToOne, JoinTable, OneToMany} from 'typeorm'
import Product from './product.entity'
import { ProductsInOrders } from './productsInOrders.entity'
import { User } from './user.entity'

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    date:Date

    @Column()
    status:Status

    @Column()
    cost:number

    @Column({nullable:true})
    address:string

    @ManyToOne(type => User, user => user.orders,{onDelete:'SET NULL'})
    user:User

    @OneToMany(type=>ProductsInOrders,product=>product.order,{onDelete:'CASCADE'})
    products:ProductsInOrders[]
}