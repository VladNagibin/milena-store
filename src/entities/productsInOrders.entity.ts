import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Product from "./product.entity"
import { Order } from "./orders.entity"

@Entity()
export class ProductsInOrders {
    @PrimaryGeneratedColumn()
    public id!: number

    @Column()
    public count!: number

    @Column({nullable:true})
    public size: string

    @Column({nullable:true})
    public color: string

    @ManyToOne(() => Order, (order) => order.products)
    public order!: Order

    @ManyToOne(() => Product, (product) => product.orders)
    public product!: Product
}