import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import IProductDetailed from '../interfaces/IProductDetailed'
import CartButtons from '../components/Products/CartButtons'

export default function ProductPage() {
    const id = useParams().id
    const [product, setProduct] = useState<IProductDetailed | null>(null)
    const { request, loading } = useHttp()
    const getProduct = useCallback(async (signal: AbortSignal) => {
        request<IProductDetailed>(`/products/${id}`, 'GET', null, {}, signal).then(data=>{
            setProduct(data)
        })
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
                    <div className='bottom'>
                        <div className='price'>
                            <div className='value'>
                                {product.price}р
                            </div>
                            <div className='discount'>
                                -{product.discount}%
                            </div>
                        </div>
                        <CartButtons product={product}/>
                    </div>
                </div>

            </div>
            <h2>Описание</h2>
            <div className='description'>
                <div className='desc-value'>
                    {product.description}
                </div>
                <div className='banner'>
                    Товары представлены в ассортименте, выбор цветов или моделей не предоставляется. На фотографиях могут быть представлены не все варианты.
                </div>
            </div>
            <div className='similar-products'>

            </div>
        </div>
    )
}
