import React, { useState } from 'react'
import { serverURL } from '../../auth'
import IOrderProduct from '../../interfaces/IOrderProduct'
import IProduct from '../../interfaces/IProduct'
interface ICartProductProps {
    product: IOrderProduct

}
export default function CartProduct({ product }: ICartProductProps) {
    return (
        <div className='cart-product'>
            <div className='right'>
                <img className='pic' src={`${serverURL}/pictures/${product.id}.png`} />
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
            <div className='cart-buttons'>
                <div className='counter'>
                    {product.count}
                </div>
            </div>
        </div>
    )
}
