import React from 'react'
import IOrder from '../../interfaces/IOrder'
import Order from './Order'

interface IOrdersProps{
    orders:IOrder[]
    reRender:()=>void
}

export default function Orders({orders,reRender}:IOrdersProps) {
  return (
    <div className='order-list'>
      {
        orders.map(order=>{
            return <Order order={order} reRender={reRender} key={order.id}/>
        })
      }
    </div>
  )
}
