import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IProduct from '../interfaces/IProduct'
interface ICartProduct extends IProduct{
    count:number
}
interface ICartState{
    products:ICartProduct[]
}

const localstorageName = 'milena-store-cart'
const sLocalstorage = localStorage.getItem(localstorageName)
const initialState: ICartState = sLocalstorage ? JSON.parse(sLocalstorage) : {products:[]}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<ICartProduct>) => {
            const productIndex = state.products.findIndex(el => el.id === action.payload.id)
            if (productIndex == -1 && action.payload.count > 0) {
                state.products.push(action.payload)
            } else {
                if (action.payload.count < 1) {
                    state.products = state.products.filter(el => el.id !== action.payload.id)
                } else {
                    state.products[productIndex].count = action.payload.count
                }
            }
            localStorage.setItem(localstorageName, JSON.stringify(state))
        },
        remove: (state, action: PayloadAction<IProduct>) => {
            const productIndex = state.products.findIndex(el => el.id === action.payload.id)
            if (productIndex !== -1) {
                state.products = [...state.products.slice(0, productIndex), ...state.products.slice(productIndex + 1)]
            }
            localStorage.setItem(localstorageName, JSON.stringify(state))
        },
        clear:(state)=> {
            state.products = []
            localStorage.removeItem(localstorageName)
        }
    }
})
export const { add, remove,clear } = cartSlice.actions
export default cartSlice.reducer