import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './Routes'
import Header from './components/Header'
import {ToastContainer} from 'react-toastify'
import { useAppSelector } from './hooks/redux.hook'
import Footer from './components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function App() {
    const { token } = useAppSelector((state) => state.auth)
    const routes = useRoutes(!!token)


    return (
        <BrowserRouter>
            <Header />
            <div className='container'>
                {routes}
            </div>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}
