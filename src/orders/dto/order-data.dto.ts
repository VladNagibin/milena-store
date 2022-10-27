import Product from "src/entities/product.entity"
import Status from "src/types/status"
interface userData{
    login:string
    id:number
    phone:string
    email:string
}
export class OrderData {
    address: string
    id: number
    cost: number
    date: Date
    status: Status
    user?:userData
    products: Array<{
        id: number
        description: string
        discount: number
        price: number
        name: string
        count: number
        color:string|null
        size:string|null
    }>
}