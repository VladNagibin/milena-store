import Product from "src/entities/product.entity"
import Status from "src/types/status"

export class OrderData {
    address: string
    id: number
    cost: number
    date: Date
    status: Status
    products: Array<{
        id: number
        description: string
        discount: number
        price: number
        name: string
        count: number
    }>
}