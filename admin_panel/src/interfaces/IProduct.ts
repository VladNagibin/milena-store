export default interface IProduct{
    id:number
    name:string
    price:number
    discount:number
    description:string
    properties:Array<{
        id?:number
        key:string
        value:string
    }>
}