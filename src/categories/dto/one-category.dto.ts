
interface IProduct{
    id: string
    name: string
    price: number
    discount: number
    description: number
    properties: Array<{
        id: number
        key: string
        value: string
    }>
    sizes: Array<{
        id: number
        value: string
    }>
    colors: Array<{
        id: number
        value: string
    }>
}

export class OneCategory{
    id:number
    name:string
    products:Array<IProduct>
}