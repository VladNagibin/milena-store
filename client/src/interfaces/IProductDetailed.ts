import IProduct from "./IProduct";

export default interface IProductDetailed extends IProduct{
    categoryId:number
    properties:Array<{
        id:number
        key:string
        value:string
    }>
    pics:Array<string>
}