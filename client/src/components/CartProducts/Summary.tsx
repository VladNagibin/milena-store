import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import { clear } from '../../reducers/cartReducer'
import ConfirmPanel from './ConfirmPanel'

interface SummaryProps {
    summ: number
}

export default function Summary({ summ }: SummaryProps) {
    const dispatch = useAppDispatch()
    const logged = useAppSelector(state=>!!state.auth.token)
    const navigate = useNavigate()
    const [showPanel,setShowPanel] = useState(false)
    const toOrderCreation = () =>{
        if(logged){
            navigate('/profile/order')
        }else{
            alert('Для создания заказа необходимо войти в аккаунт или зарегистрироваться')
        }
    }
    return (
        <div className='summary'>
            <div className='summ'>
                <div className='text'>
                    Итого:
                </div>
                <div className='value'>
                    {summ}р
                    <div className='small-text'>
                        Цена без учета доставки
                    </div>
                </div>
            </div>
            <div className='buttons'>
                <button onClick={()=>setShowPanel(prev=>!prev)}>Очистить</button>
                <button onClick={toOrderCreation}>Заказ</button>
                {
                    showPanel?<ConfirmPanel yesAction={()=>dispatch(clear())} noAction={()=>setShowPanel(false)} />:<></>
                }
                
            </div>

        </div>
    )
}
