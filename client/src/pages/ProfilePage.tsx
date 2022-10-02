import React, { useCallback, useEffect, useState } from 'react'
import ContactInfo from '../components/ContactInfo/ContactInfo'
import Loader from '../components/Loader'
import OrderList from '../components/OrderList/OrderList'
import { useHttp } from '../hooks/http.hook'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import IOrder from '../interfaces/IOrder'
import { out } from '../reducers/authReducer'

export default function ProfilePage() {
  const { login, token } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const [orders, setOrders] = useState<IOrder[]>([])
  const [contactInfo,setContactInfo] = useState<{
    email:string|null
    phone:number|null
  }>({
    email:null,
    phone:null
  })
  const { request, loading } = useHttp()


  const getProduct = useCallback(async (signal: AbortSignal) => {
    
    const data = await request<{
      orders: IOrder[],
      email:string,
      phone:number
    }>(`/users/orders/${login}`, 'GET', null, { Authorization: token }, signal)
    setOrders(data.orders)
    setContactInfo({
      phone:data.phone,
      email:data.email
    })
  }, [login])
  useEffect(() => {
    const controller = new AbortController()
    getProduct(controller.signal)
    return (() => {
      controller.abort()
    })

  }, [])
  if (loading) {
    return <Loader />
  }
  return (
    <div>
      Profile page
      <div>Ваш логин: {login}
        <button onClick={() => {
          dispatch(out())
        }}>Выйти
        </button>
        <h2>Контактная информация</h2>
        <ContactInfo email={contactInfo.email} phone={contactInfo.phone}/>
        <h2>Ваши заказы</h2>
        <OrderList orders={orders} />
      </div>
    </div>
  )
}
