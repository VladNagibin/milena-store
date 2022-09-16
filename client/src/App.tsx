import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './Routes'
import Header from './components/Header'
import { useAppSelector } from './hooks/redux.hook'
export default function App() {
    const {token} = useAppSelector((state)=>state.auth)
    const routes = useRoutes(!!token)
    
    
    return (
        <BrowserRouter>
            <Header />
            {routes}
        </BrowserRouter>
    )
}
