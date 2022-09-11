import Category from "src/entities/category.entity"

export class ChangeCategory{
    id:number
    name?:string
    parent?:Category|number|null
}