import React from 'react'
import { Link } from 'react-router-dom'

export default function MainPage() {
  return (
    <div>
      <Link to={'/catalog'}><img className='banner' src='/banners/banner-top.png'></img></Link>
    </div>
  )
}
