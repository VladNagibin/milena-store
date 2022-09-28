import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import { add } from '../../reducers/cartReducer'
interface IProductProps {
  product: IProduct
  counter: number
}

export default function Product({ product, counter }: IProductProps) {
  const dispatch = useAppDispatch()
  console.log(product.price)
  return (
    <div className='product'>
      <Link to={`/catalog/product/${product.id}`}>
        <img src={`/${product.id}.png`} />
      </Link>
      <span className='name'>{product.name}</span>
      <div className='bottom-panel'>
        <div className='price'>
          {/* <span>{product.discount}</span> */}
          <span>{product.price}p</span>
        </div>
        <div className='cart'>
          <span className="material-symbols-outlined icon" onClick={() => dispatch(add({ ...product, count: counter + 1 }))}>
            add
          </span>
          <div className='counter'>
            {counter}
          </div>
          <span className="material-symbols-outlined icon" onClick={() => dispatch(add({ ...product, count: counter - 1 }))}>
            remove
          </span>
        </div>

      </div>
      {/* <span>{product.description}</span> */}
    </div>
  )
}
