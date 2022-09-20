export class TreeCategories{
    id:number
    name:string
    parentId:number|null
    categories:Array<{
        id:number
        name:string
        parentId:number|null
    }>
}