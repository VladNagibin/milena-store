import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from 'src/entities/orders.entity';
import { NewOrder } from './dto/new-order.dto';
import { User } from 'src/entities/user.entity';
import Product from 'src/entities/product.entity';
import Status from 'src/types/status';
import { SetStatus } from './dto/set-status.dto';
import { ChangeOrder } from './dto/change-order.dto';
import { ProductsInOrders } from 'src/entities/productsInOrders.entity';
import { OrderData } from './dto/order-data.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(ProductsInOrders)
        private productsInOrdersRepository: Repository<ProductsInOrders>
    ) { }

    async getAll(): Promise<OrderData[]> {
        var data = await this.orderRepository.query(`select  
        product."name",
        product.description,
        product.discount,
        product.price,
        product.id as productId,
        "order".id,
        "order".date,
        "order".status,
        "order".address,
        "order".cost,
		users.login,
		users.email,
        users.id as userId,
		users.phone,
        "products_in_orders"."count",
        "products_in_orders"."size",
        "products_in_orders"."color"
        from "order"
        left join products_in_orders ON products_in_orders."orderId" = "order".id 
        left join product ON product.id = products_in_orders."productId" 
		left join users ON users.id = "order"."userId"
        ORDER BY "order".date DESC`)
        if (!data.length) {
            throw new HttpException('order not found', 400)
        }
        var result: OrderData[] = []
        data.forEach(el => {
            var index = result.findIndex(order => order.id == el.id)
            if (index == -1) {
                result.push(
                    {
                        address: el.address,
                        cost: el.cost,
                        id: el.id,
                        date: el.date,
                        status: el.status,
                        user:{
                            email:el.email,
                            id:el.userid,
                            login:el.login,
                            phone:el.phone
                        },
                        products: []
                    }
                )
            }
            result[index==-1?result.length-1:index].products.push({
                id: el.productid,
                description: el.description,
                discount: el.discount,
                price: el.price,
                name: el.name,
                count: el.count,
                size:el.size,
                color:el.color
            })
        })
        return result
    }
    async getById(id: number): Promise<OrderData> {
        var data = await this.orderRepository.query(`select  
        product."name",
        product.description,
        product.discount,
        product.price,
        product.id as productId,
        "order".id,
        "order".date,
        "order".status,
        "order".address,
        "order".cost,
        "products_in_orders"."count",
        "products_in_orders"."size",
        "products_in_orders"."color"
        from "order"
        left join products_in_orders ON products_in_orders."orderId" = "order".id 
        left join product ON product.id = products_in_orders."productId" 
        where "order".id = ${id}`)
        if (!data.length) {
            throw new HttpException('order not found', 400)
        }
        var result: OrderData = {
            address: data[0].address,
            cost: data[0].cost,
            id,
            date: data[0].date,
            status: data[0].status,
            products: []
        }
        data.forEach(el => {
            result.products.push({
                id: el.productid,
                description: el.description,
                discount: el.discount,
                price: el.price,
                name: el.name,
                count: el.count,
                size:el.size,
                color:el.color
            })
        })
        return result
        //return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('order.products', 'productsInOrders').where(`order.id = ${id}`).getOne()
    }

    async createNew(data: NewOrder): Promise<Order | Error> {
        let user = await new Promise<User>((res, rej) => {
            if (typeof data.user == 'number') {
                this.userRepository.findOneBy({ id: data.user }).then(user => {
                    res(user)
                }, err => {
                    rej(err)
                })
            } else if (typeof data.user == 'string') {
                this.userRepository.findOneBy({ login: data.user }).then(user => {
                    res(user)
                }, err => {
                    rej(err)
                })
            } else {
                res(data.user)
            }
        })
        let cost = 0
        let productsP: Promise<ProductsInOrders>[] = []
        data.products.forEach(el => {
            cost += el.price * el.count
            productsP.push(this.productsInOrdersRepository.save({
                product: el,
                count: el.count,
                color:el.color,
                size:el.size
            }))
        })
        try {
            const products = await Promise.all(productsP)
            return this.orderRepository.save({
                date: new Date(),
                products: products,
                user,
                status: 'created',
                address: data.address,
                cost
            })
        } catch {
            return new HttpException('products error', 400)
        }

    }

    async setStatus(data: SetStatus): Promise<Order> {
        let order = await this.orderRepository.findOneBy({ id: data.id })
        return this.orderRepository.save({
            ...order,
            status: data.status
        })
    }

    async changeOrder(data: ChangeOrder): Promise<Error | Order> {
        let order = await this.orderRepository.findOneBy({ id: data.id })
        // if (order.status == 'created') {
        //     let orderProductsPromise: Array<Promise<Product> | Product> = []
        //     data.products.forEach(el => {
        //         if (typeof el == 'number') {
        //             orderProductsPromise.push(this.productsInOrdersRepository.findOneBy({ id: el }))
        //         } else {
        //             orderProductsPromise.push(el)
        //         }
        //     })
        //     let orderProducts = await Promise.all(orderProductsPromise)
        //     return this.orderRepository.save({
        //         ...order,
        //         products: orderProducts
        //     })
        // }
        return new HttpException(`this order already in status ${order.status}`, HttpStatus.BAD_REQUEST)
    }
}
