import { response } from 'express'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import ICategory from '../../interfaces/ICategory'
interface ICategoryProps {
    category: ICategory
    reRender:()=>void
}

export default function Category({ category,reRender}: ICategoryProps) {
    const [categoryData, setCategoryData] = useState<ICategory>({
        children:[],
        id:'',
        name:"",
        parentId:null,
        level:0
    })
    const [editing, setEditing] = useState(false)
    const { token } = useContext(AuthContext)
    const handleCategoryData = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryData((prev) => { return { ...prev, [event.target.name]: event.target.value } })
    }
    const deleteCategory = () => {
        if (window.confirm(`Удалить категорию ${category.name}`)) {
            fetch(`/categories/${categoryData.id}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    'authorization': token
                }
            }).then(response => {
                reRender()
            })
        }
    }
    const save = () => {
        if (window.confirm(`Изменить категорию ${category.name}`)) {
            if (changesCheck()) {
                fetch('/categories', {
                    method: "PATCH",
                    headers: {
                        'Content-type': 'application/json',
                        'authorization': token
                    },
                    body: JSON.stringify({
                        id: categoryData.id,
                        parent: categoryData.parentId,
                        name: categoryData.name
                    })
                }).then(response => {
                    reRender()
                })
            }
        }
    }
    const changesCheck = () => {
        if (category.name !== categoryData.name) {
            return true
        }
        if (category.parentId !== categoryData.parentId) {
            return true
        }
        return false
    }
    useEffect(()=>{
        setCategoryData(category)
    },[category])
    return (
        <div className='category'>
            <div className={`name color-${categoryData.level}`}>
                <div className='data'>
                    <span className='id'>{categoryData.id})</span>
                    <input type={'text'} name='name' onChange={handleCategoryData} disabled={!editing} value={categoryData.name}></input>
                    <span className="material-symbols-outlined icon" onClick={() => setEditing((prev) => !prev)}>edit</span>
                    <span className={`material-symbols-outlined icon ${editing ? '' : 'hide'}`} onClick={save} >save</span>
                    <span className={`material-symbols-outlined icon ${editing ? '' : 'hide'}`} onClick={deleteCategory} >delete</span>
                </div>
                {
                    editing ? <div className='parentId'>
                        <label>Родитель</label>
                        <input type="number" name='parentId' onChange={handleCategoryData} value={categoryData.parentId ? categoryData.parentId : ''}></input>
                    </div> : <></>
                }

            </div>
            <div className='child-categories'>
                {
                    categoryData.children.map(el => {
                        return <Category category={el} key={el.id} reRender={reRender}/>
                    })
                }
            </div>
        </div>

    )
}
