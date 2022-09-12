import Product from "src/entities/product.entity"

export class ChangeOrder{
    id:number
    products:Array<Product|number>

}