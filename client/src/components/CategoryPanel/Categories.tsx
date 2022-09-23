import React, { useState } from 'react'
import ICategory, { IChildCategory } from '../../interfaces/ICategory'
import ChildCategory from './ChildCategory'
import ParentCategory from './ParentCategory'

interface CategoriesProps {
  categories: ICategory[]
}


export default function Categories({ categories }: CategoriesProps) {
  const [show,setShow] = useState(false)
  const handleShow = () =>{
    setShow(prev=>!prev)
  }
  if (categories.length === 0) {
    return <></>
  }
  const [childCategories, setChildCategories] = useState<IChildCategory[]>(categories[0].categories)
  return (
    <><div className={`hide-button ${show ? 'rotated' : ''}`} onClick={handleShow}>
      <span className="material-symbols-outlined">
        expand_more
      </span>
    </div>
      <div className={`${show?'categories':'hide'}`} onMouseLeave={() => setChildCategories(categories[0].categories)}>
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
