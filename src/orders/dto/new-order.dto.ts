import Product from "src/entities/product.entity"
import { User } from "src/entities/user.entity"

export class NewOrder{
    user:number|User
    products:Array<number|Product>

}