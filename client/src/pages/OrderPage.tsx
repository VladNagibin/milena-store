import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import CartProducts from '../components/CartProducts/CartProducts'
import Loader from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import ICartProduct from '../interfaces/ICartProduct'
import IOrder from '../interfaces/IOrder'
import StatusBadge from '../components/OrderList/StatusBadge'
import DateBadge from '../components/OrderList/DateBadge'

interface IOrderQuery extends IOrder {
    products: ICartProduct[]
}

export default function OrderPage() {
    const id = useParams().id
    const { request, loading } = useHttp()
    const [orderData, setOrderData] = useState<IOrder>({
        address: '',
        cost: 0,
        date: '',
        id: 0,
        status: "closed"
    })
    const [products, setProducts] = useState<ICartProduct[]>([])

    const getOrderData = useCallback((signal: AbortSignal) => {
        request<IOrderQuery>(`/orders/${id}`, 'GET', null, {}, signal).then(result => {
            setOrderData({
                address: result.address,
                cost: result.cost,
                date: result.date,
                id: result.id,
                status: result.status
            })
            setProducts(result.products)
        })
    }, [id])
    useEffect(() => {
        const controller = new AbortController()
        getOrderData(controller.signal)
    }, [id])
    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <h1>Заказ №{orderData.id}</h1>
            <div className='order-data'>
                <div>
                    Адрес доставки:{orderData.address}
                </div>
                <DateBadge date={orderData.date}/>
                <div className='status-div'>
                    Статус:
                    <StatusBadge status={orderData.status}/>
                </div>

            </div>

            <h2>Товары в заказе на сумму {orderData.cost}Р</h2>
            <CartProducts products={products} settings={{ hideCartButtons: true }} />
        </div>
    )
}
