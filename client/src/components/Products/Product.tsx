import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import { add } from '../../reducers/cartReducer'
import CartButtons from './CartButtons'
interface IProductProps {
  product: IProduct
}

export default function Product({ product }: IProductProps) {
  return (
    <div className='product'>
      <Link to={`/catalog/product/${product.id}`}>
        <img src={`/${product.id}.png`} />
      </Link>
      <span className='name'>{product.name}</span>
      <div className='bottom-panel'>
        <div className='price'>
          <span>{product.price}p</span>
        </div>
        <CartButtons product={product}/>
      </div>
    </div>
  )
}
