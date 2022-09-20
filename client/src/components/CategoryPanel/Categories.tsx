import React, { useState } from 'react'
import ICategory, { IChildCategory } from '../../interfaces/ICategory'
import ChildCategory from './ChildCategory'
import ParentCategory from './ParentCategory'

interface CategoriesProps{
    categories: ICategory[]
}


export default function Categories({categories}:CategoriesProps) {
    const [childCategories,setChildCategories] = useState<IChildCategory[]>([])
    return (
    <div className='categories'  onMouseLeave={()=>setChildCategories([])}>
      <div className='parent'>
        {
            categories.map(category=>{
                return <ParentCategory category={category} setChildCategories={setChildCategories}/>
            })
        }
      </div>
      <div className='child'>
        {
            childCategories.map(category=>{
                return <ChildCategory category={category}/>
            })
        }
      </div>
    </div>
  )
}
