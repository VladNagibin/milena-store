
export default interface ICategory{
    name:string
    id:number,
    parentId:number|null,
    categories:Array<IChildCategory>
}
export interface IChildCategory{
    id:number
    name:string
    parentId:null|number
}