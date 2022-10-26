import React, { useContext, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'
import INewCategory from '../../interfaces/INewCategory'

interface AddCategoryProps {
    reRender: () => void
}

export default function AddCategory({ reRender }: AddCategoryProps) {
    const [show, setShow] = useState(false)
    const { token } = useContext(AuthContext)
    const [category, setCategory] = useState<INewCategory>({
        name: "",
        parentId: 0
    })
    const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory((prev) => { return { ...prev, [event.target.name]: event.target.value } })
    }
    const save = () => {
        if (window.confirm('Вы уверены что хотите создать категорию?')) {
            var parentId = category.parentId == 0 ? null : category.parentId
            fetch(`${serverURL}/categories`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({
                    parent: parentId,
                    name: category.name
                })
            }).then(response => {
                reRender()
                setShow(false)
            })
        }
    }
    return (
        <div >
            <span className={`material-symbols-outlined icon add-btn`} onClick={() => setShow((prev) => !prev)}>add</span>
            <div className={`new-category ${show ? '' : 'hide-panel'}`} >
                <label htmlFor='name'>Наименование</label>
                <input id='name' type={'text'} name='name'  onChange={handleCategory} value={category.name}></input>
                <label htmlFor='parentId'>Родитель</label>
                <input id='parentId' type={'number'} name='parentId'  onChange={handleCategory} value={category.parentId}></input>
                <button onClick={save}>Сохранить</button>
            </div>
        </div>
    )
}
