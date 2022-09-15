import React from 'react'
import { Routes, Route, Navigate,createBrowserRouter } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import MainPage from './pages/MainPage'
import ProfilePage from './pages/ProfilePage'

export const useRoutes = (isAutheficated:boolean) => {
    return(
        <Routes>
            
            <Route path='/' element={<MainPage/>}/>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            
            <Route path = '*' element={<Navigate replace to="/"/>}/>
        </Routes>
    )
}