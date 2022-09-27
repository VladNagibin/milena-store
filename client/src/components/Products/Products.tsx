import React from 'react'
import IProduct from '../../interfaces/IProduct'
import Product from './Product'

interface IProductsProps{
    products:Array<IProduct>    
}

export default function Products({products}:IProductsProps) {
  return (
    <div>
        {
            products.map(product=>{
                return <Product product={product}/>
            })
        }
    </div>
  )
}
