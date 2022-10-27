import { useParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import IProductDetailed from '../interfaces/IProductDetailed'
import CartButtons from '../components/Products/CartButtons'
import Pictures from '../components/Products/Pictures'

export default function ProductPage() {
    const id = useParams().id
    const [product, setProduct] = useState<IProductDetailed | null>(null)
    const [chosenColor,setChosenColor] = useState<string | null>(null)
    const [chosenSize,setChosenSize] = useState<string | null>(null)
    const { request, loading } = useHttp()
    const getProduct = useCallback(async (signal: AbortSignal) => {
        request<IProductDetailed>(`/products/${id}`, 'GET', null, {}, signal).then(data => {
            setProduct(data)
            if(data.colors && data.colors.length){
                setChosenColor(data.colors[0].value)
            }
            if(data.sizes && data.sizes.length){
                setChosenSize(data.sizes[0].value)
            }
        })
    }, [id])

    const handleSize = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setChosenSize(event.target.value)
    }

    useEffect(() => {
        const controller = new AbortController()
        getProduct(controller.signal)
        return (() => {
            controller.abort()
        })

    }, [])
    if (id == undefined) {
        location.href = '/'
    }
    if (loading || product == null) {
        return <Loader />
    }


    return (
        <div className='product-page'>
            <div className='name'>
                {product.name}
            </div>
            <div className='top-panel'>
                {
                    product.pics ? <Pictures id={id} pics={product.pics} /> :
                        <div className='pics'>

                            <img className='main-pic' src={`/pictures/${id}.png`} />

                        </div>
                }

                <div className='specs'>
                    <div className='specs-values'>
                        <h3>Технические характеристики</h3>
                        {
                            product.properties.map(prop => {
                                return <div className='spec' key={prop.id}>{prop.key}:{prop.value}</div>
                            })
                        }

                    </div>
                    {
                        product.colors ?
                            <div style={{ display: 'flex' }}>
                                {
                                    product.colors.map(color => <div key={color.value} onClick={()=>setChosenColor(color.value)} style={{ width: '30px', height: "30px", margin: '5px', borderRadius: '50%', backgroundColor: color.value,cursor:'pointer' }} className={`${chosenColor==color.value?'chosen-color':''}`}></div>)
                                }
                            </div>
                            : <></>
                    }
                    {
                        chosenSize && product.sizes ?
                            <select value={chosenSize} onChange={handleSize}  className='sizes'>
                                {
                                    product.sizes.map(size=><option key={size.value} value={size.value}>{size.value}</option>)
                                }
                            </select>
                            : <></>
                    }

                    <div className='bottom'>
                        <div className='price'>
                            <div className='value'>
                                {product.price}р
                            </div>
                            <div className='discount'>
                                -{product.discount}%
                            </div>
                        </div>
                        <CartButtons product={product} color={chosenColor} size={chosenSize}/>
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
