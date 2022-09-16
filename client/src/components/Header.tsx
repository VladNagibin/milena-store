import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { out } from '../reducers/authReducer'
export default function Header() {
  const { login } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  return (
    <div className='navigation'>
      <ul>
        <li className='list'>
          <Link to={'/'}><span className="material-symbols-outlined icon">
            home
          </span>
          <span className='text'>Домой</span></Link>
        </li>
        {login ?
          <><li className='list'>
            <Link to={'/profile'}>
              <span className="material-symbols-outlined icon">
                person
              </span>
              <span className='text'>Профиль</span></Link>
          </li>
          </> :
          <li className='list'>
            <Link to={'/auth'}>
              <span className="material-symbols-outlined icon">
                login
              </span>
              <span className='text'>Вход</span></Link>
          </li>}
      </ul>

      {login?<div>Ваш логин: {login}
        <button onClick={() => {
          dispatch(out())
        }}>Выйти
        </button>
      </div>:<></>}

    </div>
  )
}
