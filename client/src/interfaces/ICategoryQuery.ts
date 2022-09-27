import ICategory from "./ICategory"
import IProduct from "./IProduct"

export default interface ICategoryQuery{
    id:number
    name:string
    products:IProduct[]
}