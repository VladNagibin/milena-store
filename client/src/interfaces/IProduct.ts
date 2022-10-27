export default interface IProduct{
    id:number
    name:string
    price:number
    discount:number
    description:string
    colors?:Array<{
        value:string
    }>
    sizes?:Array<{
        value:string
    }>
    
}