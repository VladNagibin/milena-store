import React from 'react'
import ICartProduct from '../../interfaces/ICartProduct'
import CartProduct from './CartProduct'

interface ICartProductsProps {
    products: ICartProduct[],
    settings?:{
        hideCartButtons:boolean
    }
}


export default function CartProducts({ products,settings }: ICartProductsProps) {
    return (
        <div className='cart-products'>{
            products.map(product => {
                return <CartProduct key={`${product.id}-${product.color}-${product.size}`} product={product} settings={settings} />
            })
        }</div>
    )
}
