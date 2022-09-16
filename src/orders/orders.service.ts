import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Order } from 'src/entities/orders.entity';
import { NewOrder } from './dto/new-order.dto';
import { User } from 'src/entities/user.entity';
import Product from 'src/entities/product.entity';
import Status from 'src/types/status';
import { SetStatus } from './dto/set-status.dto';
import { ChangeOrder } from './dto/change-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }
    getById(id: number): Promise<Order> {
        return this.orderRepository.createQueryBuilder('order').leftJoinAndSelect('product.orders', 'products').where(`order.id = ${id}`).getOne()
    }

    async createNew(data: NewOrder): Promise<Order | Error> {
        let user = new Promise<User>((res, rej) => {
            if (typeof data.user == 'number') {
                this.userRepository.findOneBy({ id: data.user }).then(user => {
                    res(user)
                }, err => {
                    rej(err)
                })
            } else {
                res(data.user)
            }
        })
        let products = new Promise<Array<Product>>((res, rej) => {
            let allProducts: Array<Promise<Product>>= []
            data.products.forEach(id => {
                allProducts.push(new Promise((resolve, reject) => {
                    if (typeof id == 'number') {
                        this.productRepository.findOneBy({ id: id }).then(product => {
                            resolve(product)
                        }, err => {
                            reject(err)
                        })
                    } else {
                        resolve(id)
                    }
                }))
            });
            Promise.all(allProducts).then(foundedProducts => {
                res(foundedProducts)
            }, err => {
                rej(err)
            })
        })
        try {
            let orderData = await Promise.all([user, products])
            let [userOrder, productsOrder] = orderData
            let cost = 0
            productsOrder.forEach(el => {
                cost += el.price
            })
            return this.orderRepository.save({
                date: new Date(),
                products: productsOrder,
                user: userOrder,
                status: 'created',
                cost,
            })
        } catch (e) {
            return new HttpException(e,HttpStatus.BAD_REQUEST)
        }


    }

    async setStatus(data: SetStatus): Promise<Order> {
        let order = await this.orderRepository.findOneBy({ id: data.id })
        return this.orderRepository.save({
            ...order,
            status: data.status
        })
    }

    async changeOrder(data: ChangeOrder):Promise<Error|Order> {
        let order = await this.orderRepository.findOneBy({ id: data.id })
        if (order.status == 'created') {
            let orderProductsPromise: Array<Promise<Product> | Product> = []
            data.products.forEach(el => {
                if (typeof el == 'number') {
                    orderProductsPromise.push(this.productRepository.findOneBy({ id: el }))
                } else {
                    orderProductsPromise.push(el)
                }
            })
            let orderProducts = await Promise.all(orderProductsPromise)
            return this.orderRepository.save({
                ...order,
                products: orderProducts
            })
        }
        return new HttpException(`this order already in status ${order.status}`,HttpStatus.BAD_REQUEST)
    }
}
