import React from 'react'
import { useAppSelector } from '../../hooks/redux.hook'
import CartProducts from './CartProducts'
import Summary from './Summary'


export default function CartProductsPanel() {
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
            <CartProducts products={cart}/>
            <Summary summ={summ}/>
        </div>
    )
}
