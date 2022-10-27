export default interface IOrderProduct{
    id: number
    description: string
    discount: number
    price: number
    name: string
    count: number
    size:string|null
    color:string|null
}