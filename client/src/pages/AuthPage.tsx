import React, { useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useAppDispatch } from '../hooks/redux.hook'
import { enter } from '../reducers/authReducer'
import { ILoginData } from '../reducers/authReducer'
export default function AuthPage() {
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
    try{
      request<{
        success:boolean
        data:ILoginData
        error?:string
      }>('/users', 'POST', form).then(json=>{
        if(json.success){ 
          dispatch(enter(json.data))
        }else{
          alert(json.error)
        }
      })
    }catch(e){
      alert(e)
    }
    
  }
  return (
    <div>
      Auth page
      <input name='login' type={'text'} placeholder='login' value={form.login} onChange={formHandler} />
      <input name='password' type='password' placeholder='password' value={form.password} onChange={formHandler} />
      <button onClick={login}>Войти</button>

    </div>
  )
}
