import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddCategory from '../components/Categories/AddCategory'
import Categories from '../components/Categories/Categories'
import { AuthContext } from '../context/AuthContext'
import ICategory from '../interfaces/ICategory'

const MainPage = () => {
  const { token } = useContext(AuthContext)
  const [categories, setCategories] = useState<ICategory[]>([])
  const getCategories = async () => {
    console.log('render')
    const responce = await fetch(`/categories/admin/tree`, {
      method: 'GET',
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
    <div>
      
      <h1>Категории</h1>
      <AddCategory reRender={getCategories}/>
      <Categories reRender={getCategories} categories={categories} />
    </div>
  )
}

export default MainPage