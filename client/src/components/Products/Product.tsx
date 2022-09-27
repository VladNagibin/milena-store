import React from 'react'
import IProduct from '../../interfaces/IProduct'
interface IProductProps{
    product:IProduct
}

export default function Product({product}:IProductProps) {
  return (
    <div>
      <span>{product.name}</span>
      <span>{product.discount}</span>
      <span>{product.price}</span>
      <span>{product.description}</span>
    </div>
  )
}
