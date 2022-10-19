import React from 'react'
import IProduct from '../../interfaces/IProduct'
import Product from './Product'

interface IProductsProps {
  products: Array<IProduct>
  reRender:()=>void
}

export default function Products({ products,reRender }: IProductsProps) {
  return (
    <div className='products'>
      {
        products.map(product => {
          return <Product key = {product.id} product={product} reRender={reRender}/>
        })
      }
    </div>
  )
}
