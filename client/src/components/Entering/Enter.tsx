import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../hooks/redux.hook'
import { enter, ILoginData } from '../../reducers/authReducer'

export default function Enter() {
    const [form, setForm] = useState({
        login: '',
        password: ''
    })
    const { loading, request } = useHttp()
    const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const dispatch = useAppDispatch()

    const login = () => {
        if (form.login == '') {
            toast.error('Вы не ввели логин')
        }
        if (form.password == '') {
            toast.error('Вы не ввели пароль')
        }

        try {
            request<{
                success: boolean
                data: ILoginData
                error?: string
            }>('/users', 'POST', form).then(json => {
                if (json.success) {
                    dispatch(enter(json.data))
                    toast.success('Вы вошли в аккаунт')
                } else {
                    toast.error(json.error)
                }
            })
        } catch (e) {
            toast.error('При попытке регистрации произошла ошибка')
        }

    }
    return (
        <div className='enter'>
            <input name='login' type={'text'} placeholder='Логин/Email' value={form.login} onChange={formHandler} />
            <input name='password' type='password' placeholder='Пароль' value={form.password} onChange={formHandler} />
            <button onClick={login}>Войти</button>

        </div>
    )
}
