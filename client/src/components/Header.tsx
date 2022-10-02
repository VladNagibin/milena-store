import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook'
import { out } from '../reducers/authReducer'
export default function Header() {
  const { login } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const lenght = useAppSelector(state=>state.cart.products.length)
  return (
    <div className='header'>
      <div className='panel'>
        <div className='navigation'>
          <ul>
            <NavLink to={'/'} end >
              {({ isActive }) => {
                return <li className={`list ${isActive ? 'active' : ''}`}>
                  <div><span className="material-symbols-outlined icon">
                    home
                  </span>
                    <span className='text'>Домой</span></div>
                </li>
              }}

            </NavLink>
            <NavLink to={'/catalog'} >
              {({ isActive }) => {
                return <li className={`list ${isActive ? 'active' : ''}`}>
                  <div><span className="material-symbols-outlined icon">
                    category
                  </span>
                    <span className='text'>Каталог</span></div>
                </li>
              }}

            </NavLink>
            <NavLink to={'/cart'} >
                  {({ isActive }) => {
                    return <li className={`list ${isActive ? 'active' : ''}`}>
                      <div>
                        
                        <span className="material-symbols-outlined icon">
                        {
                          lenght?"shopping_cart_checkout":"shopping_cart"
                        }
                        </span>
                        <span className='text'>Корзина</span></div>
                    </li>
                  }}

                </NavLink>
            {login ?
              <><NavLink to={'/profile'} >
                {({ isActive }) => {
                  return <li className={`list ${isActive ? 'active' : ''}`}>
                    <div>
                      <span className="material-symbols-outlined icon">
                        person
                      </span>
                      <span className='text'>Профиль</span></div>
                  </li>
                }}

              </NavLink>
              </>
              :
              <NavLink to={'/auth'}>
                {({ isActive }) => {
                  return <li className={`list ${isActive ? 'active' : ''}`}>
                    <div>
                      <span className="material-symbols-outlined icon">
                        login
                      </span>
                      <span className='text'>Вход</span></div>
                  </li>
                }}

              </NavLink>}
            <div className='indicator'></div>
          </ul>
        </div>
        <div className='right'>
          <div className='logo'></div>
          {
            login?<div className='out-button' onClick={() => { dispatch(out()) }}>
            <span className="material-symbols-outlined" >
              logout
            </span>
            Выйти
          </div>:<></>
          }
          
        </div>

      </div>
    </div >
  )
}
