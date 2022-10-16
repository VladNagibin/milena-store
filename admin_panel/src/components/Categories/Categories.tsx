import React from 'react'
import ICategory from '../../interfaces/ICategory'
import Category from './Category'
interface ICategoriesProps{
    categories:ICategory[]
}

export default function Categories({categories}:ICategoriesProps) {
  return (
    <div>
      {
        categories.map(category=>{
            return <Category category={category} key={category.id}/>
        })
      }
    </div>
  )
}
