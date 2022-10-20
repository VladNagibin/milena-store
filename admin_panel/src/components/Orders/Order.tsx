import React, { useState } from 'react'
import IOrder from '../../interfaces/IOrder'
import CartProducts from '../OrderProducts/CartProducts'
import DateBadge from './DateBadge'
import StatusBadge from './StatusBadge'
interface IOrderProps {
    order: IOrder
    reRender: () => void
}
export default function Order({ order, reRender }: IOrderProps) {
    const [editing, setEditing] = useState(false)
    return (
        <div style={{ borderBottom: "1px solid #22004D", padding: "20px" }}>
            <div className='order'>
                <div className='id'>
                    {order.id}
                </div>
                <div className='left'>
                    <div className='address-div'>
                        Адрес:{order.address ? order.address : 'Не указан'}
                    </div>
                    <DateBadge date={order.date} />
                </div>
                <div className='right'>
                    <div className='cost'>
                        {order.cost}Р
                    </div>
                    <StatusBadge status={order.status} reRender={reRender} id={order.id} />
                </div>
                <div style={{ display: 'flex', width: '112px', justifyContent: 'flex-end', alignItems: "center" }}>
                    {/* <span className={`material-symbols-outlined icon ${editing ? '' : 'hide'}`}>
                        save
                    </span> */}
                    <span className={`material-symbols-outlined icon ${editing ? 'opened' : 'closed-btn'}`} onClick={() => setEditing((prev) => !prev)}>
                        keyboard_tab
                    </span>
                </div>
            </div>
            <div style={editing?{display:'flex',justifyContent:"space-between"}:{display:'none'}}>
                <div style={{border:"solid black 2px",borderRadius:"20px",width:"fit-content",height:"fit-content",padding:"20px"}}>
                    <h3>Данные покупателя</h3>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <span>Id: {order.user.id}</span>
                        <span>Логин: {order.user.login}</span>
                        <span>email: {order.user.email}</span>
                        <span>Телефон: {order.user.phone}</span>
                    </div>

                </div>
                <CartProducts products={order.products}/>
            </div>
        </div>
    )
}
