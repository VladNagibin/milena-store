import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { out } from '../reducers/authReducer'

export default function ProfilePage() {
  const { login } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  
  return (
    <div>
      Profile page
      <div>Ваш логин: {login}
        <button onClick={() => {
          dispatch(out())
        }}>Выйти
        </button>
      </div>
    </div>
  )
}
