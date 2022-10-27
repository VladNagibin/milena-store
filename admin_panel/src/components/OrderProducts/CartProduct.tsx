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
            <div className='size-color'>
                {product.size?<div>{product.size}</div>:<></>}
                {product.color?<div style={{width:'20px',height:"20px",margin:'5px',borderRadius:'50%',backgroundColor:product.color,border: '2px solid #22004D'}}></div>:<></>}
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
