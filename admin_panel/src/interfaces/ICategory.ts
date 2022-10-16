export default interface ICategory{
    name:string
    id:string
    parentId:number|null
    path:string
    level:number
    children:ICategory[]
}