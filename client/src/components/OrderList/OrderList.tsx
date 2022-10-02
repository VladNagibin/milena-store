import React from 'react'
import IOrder from '../../interfaces/IOrder'
import Order from './Order'

interface OrderListProps{
    orders:IOrder[]
}

export default function OrderList({orders}:OrderListProps) {
    if(!orders.length){
        return <div className='empty-cart'>
        Заказов пока нет
        <span className="material-symbols-outlined icon">
            sentiment_dissatisfied
        </span>
    </div>
    }
    return (
    <div className='order-list'>
      {
        orders.map(order=>{
            return <Order key = {order.id} order={order}/>
        })
      }
    </div>
  )
}
