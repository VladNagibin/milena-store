export default interface IProduct{
    id:number
    name:string
    price:number
    discount:number
    description:string
    sizes:Array<{
        value:string
    }>
    colors:Array<{
        value:string
    }>
    properties:Array<{
        id?:number
        key:string
        value:string
    }>
}