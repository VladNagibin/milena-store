export default interface ICategory{
    name:string
    id:string
    parentId:number|null
    level:number
    children:ICategory[]
}