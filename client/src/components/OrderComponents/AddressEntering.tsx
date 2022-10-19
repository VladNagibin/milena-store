import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import IOrderData from '../../interfaces/IOrderData'
import IUserData from '../../interfaces/IUserData'
import { clear } from '../../reducers/cartReducer'
import Loader from '../Loader'
import InputMask from 'react-input-mask';



const initialState: IOrderData = {
    city: '',
    house: '',
    privateHouse: false,
    street: '',
    entrance: undefined,
    flat: 0,
    floor: undefined,
    intercom: undefined,

}

export default function AddressEntering() {
    const [orderData, setOrderData] = useState<IOrderData>(initialState)
    const [cart, login, token] = useAppSelector(state => [state.cart.products, state.auth.login, state.auth.token])
    const [userData, setUserData] = useState<{
        email: string | null
        phone: number | null,
        changed: boolean
    }>({
        email: null,
        phone: null,
        changed: false
    })
    const dispatch = useAppDispatch()
    const orderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderData({ ...orderData, [event.target.name]: event.target.value })
    }
    const userDataHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [event.target.name]: event.target.value, changed: true })
    }

    const { request, loading } = useHttp()
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

    const createNewOrder = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (userData.changed) {
            request(`/users/${login}`, 'PATCH', {
                email: userData.email,
                phone: userData.phone
            }, { Authorization: token })
        }
        request('/orders', 'POST', {
            user: login,
            address: `${orderData.city},${orderData.street},${orderData.house}, ${orderData.privateHouse ? 'частный дом' : `${orderData.flat},${orderData.entrance ? `подъезд ${orderData.entrance}` : ''},${orderData.floor ? `этаж ${orderData.floor}` : ''},${orderData.intercom ? `домофон ${orderData.intercom}` : ''}`}`,
            products: cart
        }).then(result => {
            toast.success('Ваш заказ создан, скоро с вами свяжутся для подтверждения заказа')
            dispatch(clear())
            navigate('/profile')
        })
    }

    const getUserData = useCallback(async (controller: AbortController) => {
        try {
            const data = await request<IUserData>(`/users/${login}`, 'GET', null, { Authorization: token }, controller.signal)
            setUserData({
                email: data.email,
                phone: data.phone,
                changed: false
            })

        } catch (e) {
            alert(e)
        }
    }, [login])

    useEffect(() => {
        let controller = new AbortController()

        getUserData(controller)
        return (() => {
            controller.abort()
        })

    }, [])
    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <form className='order-data' onSubmit={createNewOrder}>
            <div className='top-panel'>
                <h2>Оформление заказа</h2>
                <button onClick={() => setOrderData(initialState)}><span className="material-symbols-outlined">
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
                <input required name='email' placeholder='Email' onChange={userDataHandler} value={userData.email ? userData.email : ''}></input>
                <InputMask required mask="+7(999) 999-99-99" name='phone' placeholder='Телефон' onChange={userDataHandler} value={userData.phone ? userData.phone : ''} />
            </div>
            <div className='bottom-panel'>
                <button type='submit'><span className="material-symbols-outlined">
                    keyboard_tab
                </span>Создать заказ</button>
            </div>

        </form>
    )
}
