import Product from "src/entities/product.entity"
import { User } from "src/entities/user.entity"

export class NewOrder{
    user:number|User|string
    address:string
    products:Array<CartProduct>

}

class CartProduct extends Product{
    count:number
    size:string|null
    color:string|null
}