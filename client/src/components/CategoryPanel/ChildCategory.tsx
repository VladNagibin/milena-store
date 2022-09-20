import React from 'react'
import { IChildCategory } from '../../interfaces/ICategory'
interface ChildCategoryProps{
    category:IChildCategory
}
export default function ChildCategory({category}:ChildCategoryProps) {
  return (
    <div className='category'>
      {category.name}
    </div>
  )
}
