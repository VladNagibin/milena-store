import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    const {enter, out} = useContext(AuthContext)
    const navigate = useNavigate()
    const [form, setForm] = useState({
        login: '', 
        password: ''
    })
    const clickHandler = (event: React.FormEvent) => {
        event.preventDefault()
        console.log(form)
        enter(form.login,form.password)
        navigate('/')
    }

    const changeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }   

    
   return (
    <div>
        <h1>MilenaStore - Admin panel</h1>
        <label htmlFor="login">Логин</label>
        <input onChange={changeForm} type="text" name='login' placeholder='Введите логин'/>

        <label htmlFor="password">Пароль</label>
        <input onChange={changeForm} type="password" name='password' placeholder='Введите пароль'/>

        <button onClick={clickHandler}>Войти</button>
        <button onClick={out}>Выйти</button>
        <Link to={'/'}>Главная</Link>
    </div>
  )
}

export default AuthPage