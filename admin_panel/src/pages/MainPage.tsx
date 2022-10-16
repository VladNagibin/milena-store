import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Categories from '../components/Categories/Categories'
import { AuthContext } from '../context/AuthContext'
import ICategory from '../interfaces/ICategory'

const MainPage = () => {
  const { token } = useContext(AuthContext)
  const [categories, setCategories] = useState<ICategory[]>([])
  const getCategories = async () => {
    const responce = await fetch(`/categories/admin/tree`, {
      method: 'GET',
      body: null,
      headers: {
        'authorization': token
      }
    })
    const data: ICategory[] = await responce.json()
    setCategories(data)
  }
  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      
      <h1>Панель администратора</h1>
      <span className={`material-symbols-outlined icon add-btn`} >add</span>
      <Categories categories={categories} />
      {/* <div className='main_buttons'>
                <div className='top_buttons'>
                <Link className='main_button' to={'/create_item'}>
                  Создать товар
                </Link>
                    <button className='main_button'>Создать категорию</button>
                    <button className='main_button'>Поиск</button>
                </div>
                <div className='bot_buttons'>
                    <button className='main_button'>...</button>
                    <button className='main_button'>...</button>
                    <button className='main_button'>...</button>
                </div>
            </div> */}

    </>
  )
}

export default MainPage