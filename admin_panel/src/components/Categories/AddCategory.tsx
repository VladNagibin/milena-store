import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import INewCategory from '../../interfaces/INewCategory'

interface AddCategoryProps{
    reRender:()=>void
}

export default function AddCategory({reRender}:AddCategoryProps) {
    const [show, setShow] = useState(false)
    const {token} = useContext(AuthContext)
    const [category, setCategory] = useState<INewCategory>({
        name: "",
        parentId: null
    })
    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((prev) => { return { ...prev, [event.target.name]: event.target.value } })
    }
    const save = () => {
        if (window.confirm('Вы уверены что хотите создать категорию?')) {
            var parentId = category.parentId==0?null:category.parentId
            fetch('/categories', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    parent:parentId,
                    name: category.name
                })
            }).then(response => {
                reRender()
            })
        }
    }
    return (
        <div >
            <span className={`material-symbols-outlined icon add-btn`} onClick={() => setShow((prev) => !prev)}>add</span>
            <div className={`new-category ${show ? '' : 'hide-panel'}`} >
                <input type={'text'} name='name' placeholder='Имя категории' onChange={handleCategory} value={category.name}></input>
                <input type={'number'} name='parentId' placeholder='Ид родителя' onChange={handleCategory} value={category.parentId ? category.parentId : ''}></input>
                <button onClick={save}>Сохранить</button>
            </div>
        </div>
    )
}
