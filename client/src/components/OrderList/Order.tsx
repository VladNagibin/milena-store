import React from 'react'
import { Link } from 'react-router-dom'
import IOrder from '../../interfaces/IOrder'
import DateBadge from './DateBadge'
import StatusBadge from './StatusBadge'

interface IOrderProps {
    order: IOrder
}

export default function Order({ order }: IOrderProps) {
    console.log(order.date)
    return (
        <div className='order'>
            <div className='id'>
                {order.id}
            </div>
            <div className='address-div'>
                Адрес:{order.address ? order.address : 'Не указан'}
            </div>
            <DateBadge date={order.date}/>
            <div className='right'>
                <div className='cost'>
                    {order.cost}Р
                </div>
                <StatusBadge status={order.status}/>
            </div>
            <div>
                <Link to={`/profile/order/${order.id}`}><span className="material-symbols-outlined icon">
                    keyboard_tab
                </span></Link>
            </div>

        </div>
    )
}
