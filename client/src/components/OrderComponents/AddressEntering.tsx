import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import IOrderData from '../../interfaces/IOrderData'
import { clear } from '../../reducers/cartReducer'

const localStorageOrderName = 'milena-store-new-order-data' 

const localStorageData = localStorage.getItem(localStorageOrderName)
const emptyState:IOrderData = {
    city: '',
    email: '',
    house: '',
    phone: undefined,
    privateHouse: false,
    street: '',
    entrance: undefined,
    flat: 0,
    floor: undefined,
    intercom: undefined,

}
const initialState: IOrderData = localStorageData?JSON.parse(localStorageData):emptyState

export default function AddressEntering() {
    const [orderData, setOrderData] = useState<IOrderData>(initialState)
    const [cart,login] = useAppSelector(state=>[state.cart.products,state.auth.login])
    const dispatch = useAppDispatch()
    const orderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({ ...orderData, [event.target.name]: event.target.value })
    }
    
    const {request, loading} = useHttp()
    const navigate = useNavigate()
    const privateHouseHandler = () => {
        if (!orderData.privateHouse) {
            setOrderData(prev => {
                return {
                    ...prev,
                    privateHouse: !prev.privateHouse,
                    entrance: undefined,
                    flat: undefined,
                    intercom: undefined,
                    floor: undefined
                }
            })
        } else {
            setOrderData(prev => {
                return {
                    ...prev,
                    privateHouse: !prev.privateHouse,
                }
            })
        }
    }

    const createNewOrder = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        localStorage.setItem(localStorageOrderName,JSON.stringify(orderData))
        request('/orders','POST',{
            user:login,
            address: `${orderData.city},${orderData.street},${orderData.house}, ${orderData.privateHouse?'частный дом':`${orderData.flat},${orderData.entrance?`подъезд ${orderData.entrance}`:''},${orderData.floor?`этаж ${orderData.floor}`:''},${orderData.intercom?`домофон ${orderData.intercom}`:''}`}`,
            products:cart
        }).then(result=>{
            alert('Ваш заказ создан, скоро с вами свяжутся для подтверждения заказа')
            dispatch(clear())
            localStorage.removeItem(localStorageOrderName)
            navigate('/profile')
        })
    }

    return (
        <form className='order-data'  onSubmit={createNewOrder}>
            <div className='top-panel'>
                <h2>Оформление заказа</h2>
                <button onClick={() => setOrderData(emptyState)}><span className="material-symbols-outlined">
                    clear_all
                </span>Очистить</button>
            </div>
            <div className='address'>
                <div>
                    <input name='city' required placeholder='Город' onChange={orderHandler} value={orderData.city}></input>
                    <input name='street' required placeholder='Улица' onChange={orderHandler} value={orderData.street}></input>
                    <input name='house' required placeholder='Дом' onChange={orderHandler} value={orderData.house}></input>
                </div>
                <div>
                    <div className='private-house'>
                        <label htmlFor='private-house'>Частный дом</label>
                        <input id='private-house' name='privateHouse' type="checkbox" className='custom-checkbox' onChange={privateHouseHandler} checked={orderData.privateHouse} />
                    </div>
                    <input required={!orderData.privateHouse} disabled={orderData.privateHouse} name='flat' placeholder='Квартира' type='number' onChange={orderHandler} value={orderData.flat ? orderData.flat : ''}></input>
                    <input disabled={orderData.privateHouse} name='intercom' placeholder='Домофон' type={'number'} onChange={orderHandler} value={orderData.intercom ? orderData.intercom : ''}></input>
                    <input disabled={orderData.privateHouse} name='entrance' placeholder='Подъезд' type={'number'} onChange={orderHandler} value={orderData.entrance ? orderData.entrance : ''}></input>
                    <input disabled={orderData.privateHouse} name='floor' placeholder='Этаж' type={'number'} onChange={orderHandler} value={orderData.floor ? orderData.floor : ''}></input>
                </div>
            </div>
            <h2>Контактная информация</h2>
            <div className='contact-fields'>
                <input required name='email' placeholder='Email' onChange={orderHandler} value={orderData.email}></input>
                <input required name='phone' placeholder='Телефон' type={'number'} onChange={orderHandler} value={orderData.phone ? orderData.phone : ''}></input>
            </div>
            <div className='bottom-panel'>
                <button type='submit'><span className="material-symbols-outlined">
                    keyboard_tab
                </span>Создать заказ</button>
            </div>

        </form>
    )
}
