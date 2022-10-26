export default interface ICategory{
    name:string
    id:string
    parentId:number
    level:number
    children:ICategory[]
}