import React from 'react'
import { useAppSelector } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import Product from './Product'

interface IProductsProps {
  products: Array<IProduct>
}

export default function Products({ products }: IProductsProps) {
  const cart = useAppSelector(state => state.cart.products)
  return (
    <div className='products'>
      {
        products.map(product => {
          var productInCart = cart.length?cart.filter(el => el.id == product.id):[]
          return <Product key = {product.id} product={product} counter={productInCart.length?productInCart[0].count:0} />
        })
      }
    </div>
  )
}
