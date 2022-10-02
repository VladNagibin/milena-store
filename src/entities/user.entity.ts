import { type } from 'os';
import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { Order } from './orders.entity';

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    login:string;

    @Column()
    password:string

    @Column({nullable:true})
    email:string

    @Column({nullable:true ,type:'bigint'})
    phone:number

    @OneToMany(type=>Order, (order)=> order.user)
    orders:Order[]
}