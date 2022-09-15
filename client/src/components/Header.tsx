import React from 'react'
import {Link} from 'react-router-dom'
export default function Header() {
  return (
    <div>
      <Link to={'/'}>Домой</Link>
      <Link to={'/auth'}>Вход</Link>
      <Link to={'/profile'}>Профиль</Link>
    </div>
  )
}
