import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './Routes'
import Header from './components/Header'
import { useAppSelector } from './hooks/redux.hook'
import Footer from './components/Footer'
export default function App() {
    const { token } = useAppSelector((state) => state.auth)
    const routes = useRoutes(!!token)


    return (
        <BrowserRouter>
            <Header />
            <div className='container'>
                {routes}
            </div>
            <Footer/>
        </BrowserRouter>
    )
}
