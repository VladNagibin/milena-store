import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import IProductDetailed from '../interfaces/IProductDetailed'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { add } from '../reducers/cartReducer'

export default function ProductPage() {
    const id = useParams().id
    const [product, setProduct] = useState<IProductDetailed | null>(null)
    const { request, loading } = useHttp()
    const cart = useAppSelector(state=>state.cart.products)
    const dispatch = useAppDispatch()
    const getProduct = useCallback(async (signal: AbortSignal) => {
        const data = await request<IProductDetailed>(`/products/${id}`, 'GET', null, {}, signal)
        setProduct(data)
    }, [id])
    useEffect(() => {
        const controller = new AbortController()
        getProduct(controller.signal)
        return (() => {
            controller.abort()
        })

    }, [])
    if (loading || product == null) {
        return <Loader />
    }
    const counter = cart.length?cart.filter(el=>el.id === product.id)[0].count:0

    return (
        <div className='product-page'>
            <div className='name'>
                {product.name}
            </div>
            <div className='top-panel'>
                <img src={`/${id}.png`} />
                <div className='specs'>
                    <div className='specs-values'>
                        <h3>Технические характеристики</h3>
                        {
                            product.properties.map(prop => {
                                return <div className='spec' key={prop.id}>{prop.key}:{prop.value}</div>
                            })
                        }
                    </div>
                    <div className='cart-buttons'>
                        <span className="material-symbols-outlined icon" onClick={() => dispatch(add({ ...product, count: counter + 1 }))}>
                            add
                        </span>
                        <div className='counter'>
                            {counter}
                        </div>
                        <span className="material-symbols-outlined icon" onClick={() => dispatch(add({ ...product, count: counter - 1 }))}>
                            remove
                        </span>
                    </div>
                </div>

            </div>
            <div className='description'>
                <div className='desc-value'>
                    {product.description}
                </div>
                <div className='banner'>

                </div>
            </div>
            <div className='similar-products'>

            </div>
        </div>
    )
}
