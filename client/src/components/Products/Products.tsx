import React from 'react'
import { useAppSelector } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import Product from './Product'

interface IProductsProps {
  products: Array<IProduct>
}

export default function Products({ products }: IProductsProps) {
  return (
    <div className='products'>
      {
        products.map(product => {
          return <Product key = {product.id} product={product} />
        })
      }
    </div>
  )
}
