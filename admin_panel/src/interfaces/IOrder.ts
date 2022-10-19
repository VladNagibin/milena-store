import IOrderProduct from "./IOrderProduct"

export type Status = 'created' | 'paid' | 'sent' | 'closed'

export default interface IOrder{
    address: string
    id: number
    cost: number
    date: Date
    status: Status
    user:{
        email:string
        id:number
        phone:string
        login:string
    }
    products: IOrderProduct[]
}