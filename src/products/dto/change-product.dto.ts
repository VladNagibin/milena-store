export class ChangeProduct{
    id:number
    name?:string
    price?:number
    discount?:{
        value:number,
        changePrice:boolean
    }
    description?:string
    categoryId?:number
    properties?:Array<{
        id?:number
        key:string
        value:string
    }>
}