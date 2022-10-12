import React, { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { useHttp } from '../../hooks/http.hook'

interface RegistrationProps {
    setEnter: () => void
}
interface form {
    login: string,
    password: string,
    phone?: string,
    email?: string
}

export default function Registration({ setEnter }: RegistrationProps) {
    const [form, setForm] = useState<form>({
        login: '',
        password: ''
    })
    const { request, loading } = useHttp()
    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const register = () => {
        if (form.login == '') {
            toast.error('Вы не ввели логин')
        }
        if (form.password == '') {
            toast.error('Вы не ввели пароль')
        }


        request<{
            success?: boolean
            response: string
        }>('/users', 'PUT', form).then(json => { 
            if (json.success) {
                toast.success('Вы зарегистрированы')
                setEnter()
            } else {
                toast.error(json.response)
            }

        }, err => {
            toast.error(err)
        })


    }
    return (
        <div className='enter'>
            <input name='login' type={'text'} placeholder='Логин' value={form.login} onChange={formHandler} />
            <input name='password' type='password' placeholder='Пароль' value={form.password} onChange={formHandler} />
            <input name='email' placeholder='Email' value={form.email ? form.email : ''} onChange={formHandler}></input>
            <ReactInputMask mask="+7(999) 999-99-99" name='phone' placeholder='Телефон' value={form.phone ? form.phone : ''} onChange={formHandler} />

            <button onClick={register}>Зарегистрироваться</button>
        </div>
    )
}
