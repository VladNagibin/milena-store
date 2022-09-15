import { useEffect, useState } from "react"

interface ILogin {
    login: string
    token: string
}

const localstorageName = 'milena-store-authefication'

export const useAuth = () => {
    const [login, setLogin] = useState('')
    const [token, setToken] = useState('')
    const [ready, setReady] = useState(false)

    const enter = (data: ILogin) => {
        setLogin(data.login)
        setToken(data.token)
        localStorage.setItem(localstorageName, JSON.stringify({
            login,
            token
        }))
    }

    const out = () => {
        setLogin('')
        setToken('')
        localStorage.removeItem(localstorageName)
    }

    useEffect(() => {
        const dataJSON = localStorage.getItem(localstorageName)
        if (dataJSON) {
            const data = JSON.parse(dataJSON)
            if (data.login && data.token) {
                setLogin(data.login)
                setToken(data.token)
            }
        }
        setReady(true)
    }, [])

    return ({token,login,enter,out,ready})

}