import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hook'
import IProduct from '../../interfaces/IProduct'
import { add, remove } from '../../reducers/cartReducer'

interface ICartButtonsProps {
    product: IProduct
    color:string|null
    size:string|null
    settings?: {
        deleteButton: boolean,
        deleteButtonAction?: ()=>void
    }
}
export default function CartButtons({ product, settings,color,size }: ICartButtonsProps) {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(state => state.cart.products)
    const counter = useMemo<number>(() => { return cart.filter(el => el.id === product.id && el.color == color && el.size == size).length ? cart.filter(el => el.id === product.id && el.color == color && el.size == size)[0].count : 0 }, [product.id, cart,color,size])

    return (
        <div className='cart-buttons'>
            <span className="material-symbols-outlined icon" onClick={() => dispatch(add({ ...product, count: counter + 1,color,size }))}>
                add
            </span>
            <div className='counter'>
                {counter}
            </div>
            <span className="material-symbols-outlined icon" onClick={() => counter==1 && settings?.deleteButtonAction?settings.deleteButtonAction():dispatch(add({ ...product, count: counter - 1,color,size }))}>
                remove
            </span>
            {
                settings?.deleteButton ? <span className="material-symbols-outlined icon" onClick={() => settings.deleteButtonAction?settings.deleteButtonAction():dispatch(remove({...product,color,size}))}>
                    close
                </span>:<></>
            }

        </div>
    )
}
