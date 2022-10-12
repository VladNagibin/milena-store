import React, { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import ICategory, { IChildCategory } from '../../interfaces/ICategory'
import ICategoryTree from '../../interfaces/ICategoryQuery'
import ChildCategory from './ChildCategory'
import ParentCategory from './ParentCategory'

interface CategoriesProps {
  id: string | undefined
}


export default function Categories({ id }: CategoriesProps) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [childCategories, setChildCategories] = useState<IChildCategory[]>([])
  const [show, setShow] = useState(false)
  const { request, loading } = useHttp()
  const handleShow = () => {
    setShow(prev => !prev)
  }
  const getCategories = async (controller: AbortController) => {
    request<ICategory[]>(`/categories/tree${id ? `/${id}` : ''}`, 'GET', null, {}, controller.signal).then(data => {
      setCategories(data)
      setShow(!!data.length)
    })
  }

  useEffect(() => {
    let controller = new AbortController()
    getCategories(controller)
    return (() => {
      controller.abort()
    })
  }, [id])
  if (loading) {
    return <></>
  }
  return (
    <><div className={`hide-button ${show ? 'rotated' : ''}`} onClick={handleShow}>
      <span className="material-symbols-outlined">
        expand_more
      </span>
    </div>
      <div className={`${show ? 'categories' : 'hide'}`} onMouseLeave={() => setChildCategories([])}>
        <div className='parent'>
          {
            categories.map(category => {
              return <ParentCategory key={category.id} category={category} setChildCategories={setChildCategories} />
            })
          }
        </div>
        <div className='child'>
          {
            childCategories.map(category => {
              return <ChildCategory key={category.id} category={category} />
            })
          }
        </div>
      </div>
    </>
  )
}
