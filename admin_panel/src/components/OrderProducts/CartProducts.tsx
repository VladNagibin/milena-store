import React from 'react'
import IOrderProduct from '../../interfaces/IOrderProduct'
import IProduct from '../../interfaces/IProduct'
import CartProduct from './CartProduct'

interface ICartProductsProps {
    products: IOrderProduct[],
    
}


export default function CartProducts({ products }: ICartProductsProps) {
    return (
        <div className='cart-products' style={{width:'70%'}}>
            <h3>Товары</h3>
            {
            products.map(product => {
                return <CartProduct key={product.id} product={product} />
            })
        }</div>
    )
}
