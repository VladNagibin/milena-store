import React from 'react'
import ICategory, { IChildCategory } from '../../interfaces/ICategory'

interface ParentCategoryProps {
    category: ICategory
    setChildCategories: (state:IChildCategory[]) => void
}

export default function ParentCategory({ category, setChildCategories }: ParentCategoryProps) {
    return (
        <div className='category' onMouseEnter={()=>setChildCategories(category.categories)}>
            {category.name}
        </div>
    )
}
