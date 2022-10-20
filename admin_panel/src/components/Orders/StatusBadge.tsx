import React, { useContext, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'
import { Status } from '../../interfaces/IOrder'
interface IStatusBadgeProps {
    status: Status
    reRender: () => void
    id: number

}


export default function StatusBadge({ status, reRender, id }: IStatusBadgeProps) {
    const {token} = useContext(AuthContext)
    const handleStatus = (event: React.MouseEvent<HTMLSpanElement>) => {
        if(window.confirm(`Вы уверены что хотите изменить статус заказа ${id} на ${event.currentTarget.innerHTML}?`))
        fetch(`${serverURL}/orders/${id}/${event.currentTarget.id}`, {
            headers: {
                'authorization': token
            },
            method:"PATCH"
        }).then(responce=>{
            responce.json().then(data=>{
                if(data.id){
                    reRender()
                }else{
                    alert('Произошла ошибка')
                }
            })
        })
    }
    const [show, setShow] = useState(false)
    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column",cursor:'pointer' }} onClick={()=>{setShow((prev)=>!prev)}}>
            <div className={`status ${status}`}>
                {status == 'created' ? 'Создан' : status == 'closed' ? 'Закрыт' : status == 'paid' ? 'Оплачен' : 'Отправлен'}
            </div>
            <div style={{ display: show ? "flex" : "none", flexDirection: "column", position: 'absolute', zIndex: '2', marginTop: "30px", border: "solid black 2px", borderRadius: "20px", padding: "10px" }}>
                <span id='created' className='status created' style={{ margin: "2px",cursor:'pointer' }} onClick={handleStatus}>Создан</span>
                <span id='paid' className='status paid' style={{ margin: "2px",cursor:'pointer' }} onClick={handleStatus}>Оплачен</span>
                <span id='sent' className='status sent' style={{ margin: "2px",cursor:'pointer' }} onClick={handleStatus}>Отправлен</span>
                <span id='closed' className='status closed' style={{ margin: "2px",cursor:'pointer' }} onClick={handleStatus}>Закрыт</span>

            </div>
        </div>
    )
}
