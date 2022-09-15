import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
interface IAuthState {
    login: string
    token: string
    ready: boolean
}
const initialState:IAuthState={
    login:'',
    token:'',
    ready:false
}
export interface ILoginData{
    login:string
    token:string
}
const localstorageName = 'milena-store-authefication'

// const out = () => {
//     setLogin('')
//     setToken('')
//     localStorage.removeItem(localstorageName)
// }

// useEffect(() => {
//     const dataJSON = localStorage.getItem(localstorageName)
//     if (dataJSON) {
//         const data = JSON.parse(dataJSON)
//         if (data.login && data.token) {
//             setLogin(data.login)
//             setToken(data.token)
//         }
//     }
//     setReady(true)
// }, [])


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        enter:(state,action:PayloadAction<ILoginData>)=>{
            localStorage.setItem(localstorageName, JSON.stringify({
                login:action.payload.login,
                token:action.payload.token
            }))
            state = {
                login:action.payload.login,
                token:action.payload.token,
                ready:true
            }
        },
        out:(state)=>{
            localStorage.removeItem(localstorageName)
            state =  {
                login:'',
                token:'',
                ready:true
            }
        },
        alreadyLogged:(state)=>{
            return state
        }   

    }
})
export const {enter} = authSlice.actions

export default authSlice.reducer