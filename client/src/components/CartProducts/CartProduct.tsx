import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import { remove } from '../../reducers/cartReducer'
import CartButtons from '../Products/CartButtons'
interface ICartProductProps {
    product: ICartProduct
    settings?: {
        hideCartButtons: boolean
    }
}
interface ICartProduct extends IProduct {
    count: number
}
export default function CartProduct({ product, settings }: ICartProductProps) {
    const [hide, setHide] = useState(false)
    const dispatch = useAppDispatch()
    if (hide) {
        return (
            <div className='pre-delete'>
                <button onClick={() => dispatch(remove(product))}>
                    Удалить
                </button>
                <button onClick={() => setHide(false)}>
                    Вернуть
                </button>
            </div>
        )
    }
    return (
        <div className='cart-product'>
            <div className='right'>
                <Link to={`/catalog/product/${product.id}`}><img className='pic' src={`/pictures/${product.id}.png`} /></Link>
                <div className='name'>
                    {product.name}
                </div>
            </div>
            <div className='center'>
                <div className='price'>
                    {product.price * product.count}р
                </div>
                <div className='discount'>
                    -{product.discount}%
                </div>
            </div>
            {settings?.hideCartButtons ? <div className='cart-buttons'><div className='counter'>
                {product.count}
            </div></div> :
                <CartButtons product={product} settings={{
                    deleteButton: true,
                    deleteButtonAction: () => setHide(true)
                }} />}
        </div>
    )
}
