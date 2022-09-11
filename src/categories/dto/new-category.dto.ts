import Category from "src/entities/category.entity"

export class NewCategory{
    name:string
    parent:Category|number|null
}