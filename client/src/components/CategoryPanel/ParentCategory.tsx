import React from 'react'
import { Link } from 'react-router-dom'
import ICategory, { IChildCategory } from '../../interfaces/ICategory'

interface ParentCategoryProps {
    category: ICategory
    setChildCategories: (state:IChildCategory[]) => void
}

export default function ParentCategory({ category, setChildCategories }: ParentCategoryProps) {
    return (
        <Link to={`/catalog/${category.id}`} className='category' onMouseEnter={()=>setChildCategories(category.categories)}>
            {category.name}
        </Link>
    )
}
