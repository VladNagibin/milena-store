export default interface INewProduct{
    name:string
    price:number
    discount:number
    description:string
    properties:Array<{
        key:string,
        value:string
    }>
    sizes:Array<{
        value:string
    }>
    colors:Array<{
        value:string
    }>
    categoryId:number
    picture:File|null
}