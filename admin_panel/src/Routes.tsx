import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import ModalWindow from './components/ModalWindow'
import AuthPage from './pages/AuthPage'
import CatalogPage from './pages/CatalogPage'
import MainPage from './pages/MainPage'
import OrderPage from './pages/OrderPage'

export const userRoutes = (isAuth: boolean) =>{
    if(isAuth){
        return(
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/auth' element={<AuthPage/>} />
                <Route path='/create_item' element={<ModalWindow/>}/>
                <Route path='/catalog/:id' element={<CatalogPage/>}/>
                <Route path='/order' element={<OrderPage/>}/>
                <Route path='*' element={<Navigate replace to ='/'/>} />
                
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path='/auth' element={<AuthPage/>} />
            <Route path='*' element={<Navigate replace to ='/auth'/>} />
        </Routes>
    )
    
}