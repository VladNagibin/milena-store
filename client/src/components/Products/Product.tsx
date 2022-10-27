import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import { add } from '../../reducers/cartReducer'
import CartButtons from './CartButtons'
interface IProductProps {
  product: IProduct
}

export default function Product({ product }: IProductProps) {
  const [chosenColor, setChosenColor] = useState<string | null>(product.colors?.length ? product.colors[0].value : null)
  const [chosenSize, setChosenSize] = useState<string | null>(product.sizes?.length ? product.sizes[0].value : null)

  const handleSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenSize(event.target.value)
  }
  return (
    <div className='product'>
      <Link to={`/catalog/product/${product.id}`}>
        <img src={`/pictures/${product.id}.png`} />
      </Link>
      <div className='name'>
        <Link to={`/catalog/product/${product.id}`}>{product.name}</Link>
        <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between',height:"55px"}}>
          <div style={{ display: 'flex' }}>
            {
              product.colors ? product.colors.map(color => <div key={color.value} onClick={()=>setChosenColor(color.value)} style={{ width: '20px', height: "20px", margin: '5px', borderRadius: '50%', backgroundColor: color.value,boxSizing: 'border-box' }} className={`${chosenColor==color.value?'chosen-color':''}`}></div>) : <div></div>
            }
          </div>
          {
            chosenSize && product.sizes ?
              <select value={chosenSize} onChange={handleSize} className='sizes'>
                {
                  product.sizes.map(size => <option key={size.value} value={size.value}>{size.value}</option>)
                }
              </select>
              : <div></div>
          }
        </div>

      </div>

      <div className='bottom-panel'>
        <div className='price'>
          <span>{product.price}p</span>
        </div>
        <CartButtons product={product} color={chosenColor} size={chosenSize} />
      </div>
    </div>
  )
}
