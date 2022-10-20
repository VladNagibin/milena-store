import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../auth'
import Orders from '../components/Orders/Orders'
import { AuthContext } from '../context/AuthContext'
import IOrder from '../interfaces/IOrder'

export default function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([])
  const {token} = useContext(AuthContext)
  const getOrders = () => {
    fetch(`${serverURL}/orders/all`, {
      headers: {
        'authorization': token
      }
    }).then(response => {
      response.json().then((data: IOrder[]) => {
        setOrders(data)
      })
    })
  }
  useEffect(() => {
    getOrders()
  }, [])
  return (
    <div>
      <h1>Заказы</h1>
      <Orders orders={orders} reRender={getOrders} />
    </div>
  )
}
