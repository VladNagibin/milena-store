import IProduct from "./IProduct";

export default interface ICartProduct extends IProduct {
    count: number
    color:string|null
    size:string|null
}