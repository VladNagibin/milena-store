import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    const { enter, out } = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const clickHandler = (event: React.FormEvent) => {
        event.preventDefault()
        enter(form.login, form.password)
        navigate('/')
    }

    const changeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }


    return (
        <div className='enter'>
            <h1>Вход</h1>
            <input onChange={changeForm} type="text" name='login' placeholder='Введите логин' />
            <input onChange={changeForm} type="password" name='password' placeholder='Введите пароль' />

            <button onClick={clickHandler}>Войти</button>
        </div>
    )
}

export default AuthPage