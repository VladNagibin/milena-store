import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './Routes'
import Header from './components/Header'
import { store } from './store/store'
import { Provider } from 'react-redux'
export default function App() {
    const routes = useRoutes(true)
    // const {login,token,enter,out,ready} = useAuth()

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                {routes}
            </BrowserRouter>
        </Provider>
    )
}
