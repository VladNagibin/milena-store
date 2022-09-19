import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import CartPage from './pages/CartPage'
import MainPage from './pages/MainPage'
import ProfilePage from './pages/ProfilePage'

export const useRoutes = (isAutheficated: boolean) => {
    if (isAutheficated) {
        return (
            <Routes>
                
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/' element={<MainPage />} />
                <Route path='*' element={<Navigate replace to="/" />} />
            </Routes>
        )
    }
    return (
        <Routes>

            <Route path='/' element={<MainPage />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='*' element={<Navigate replace to="/" />} />
        </Routes>
    )
}