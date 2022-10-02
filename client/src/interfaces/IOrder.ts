import Status from "../types/status"

export default interface IOrder{
    id:number
    date:Date|string
    status:Status
    cost:number
    address:string|null
}