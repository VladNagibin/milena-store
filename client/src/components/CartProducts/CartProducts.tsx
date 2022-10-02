import React from 'react'
import { useAppSelector } from '../../hooks/redux.hook'
import CartProduct from './CartProduct'
import Summary from './Summary'


export default function CartProducts() {
    const cart = useAppSelector(state => state.cart.products)
    if (!cart.length) {
        return <div className='empty-cart'>
            В корзине пока пусто
            <span className="material-symbols-outlined icon">
                sentiment_dissatisfied
            </span>
        </div>
    }
    var summ = 0
    cart.forEach(elem=>{
        summ +=elem.price*elem.count
    })
    return (
        <div>
            <h2>В корзине {cart.length} товар(ов)</h2>
            <div className='cart-products'>{
                cart.map(product => {
                    return <CartProduct key={product.id} product={product} />
                })
            }</div>
            <Summary summ={summ}/>
        </div>
    )
}
