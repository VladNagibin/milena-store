import React from 'react'
import { useAppSelector } from '../hooks/redux.hook'

export default function CartPage() {
  const products = useAppSelector(state=>state.cart.products)
  return (
    <div>
      {
        products.map(product=>{
          return <div key={product.id}>{product.name},{product.count}</div>
        })
      }
    </div>
  )
}
