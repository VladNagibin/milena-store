import React from 'react'
import IOrder from '../../interfaces/IOrder'

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
            <div className='date'>
                <input type='datetime-local' value={(typeof order.date == 'string' ? order.date : order.date.toISOString()).slice(0, 19)} disabled={true} />
            </div>
            <div className='right'>
                <div className='cost'>
                    {order.cost}Р
                </div>
                <div className={`status ${order.status}`}>
                    {order.status=='created'?'Создан':order.status=='closed'?'Закрыт':order.status=='paid'?'Оплачен':'Отправлен'}
                </div>
            </div>

        </div>
    )
}
