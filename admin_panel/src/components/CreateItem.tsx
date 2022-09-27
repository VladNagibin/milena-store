import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

interface formState {
  name: string
  price: number
  discount: number
  description: string
  category: string
  properties: string
  picture: File | null
}

const CreateItem = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState<formState>({
    name: '',
    price: 0,
    discount: 0,
    description: '',
    category: '',
    properties: '',
    picture: null
  })

  const picHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || event.target.files == null || event.target.files.length==0) {
      console.log('no pic')
      return
      
    }
    console.log('pic')
    setForm({ ...form, picture: event.target.files[0] })
    
  }


  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('drtyui')
    if(form.picture == null){
      return
    }
    let formData = new FormData()
      formData.append('picture', form.picture)
      console.log(formData)
      const data = await fetch(`/products/picture/1`, {
        method: 'post',
        body: formData,
        headers: {
          'authorization': token
        }
      })
      console.log(data)
    navigate('/')
  }

  const changeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <div className='create_item_form' >

      <label htmlFor="name">Название</label>
      <input
        type="text"
        name='name'
        value={form.name}
        onChange={changeForm}
      />

      <label htmlFor="price">Цена</label>
      <input
        type="text"
        name='price'
        value={form.price}
        onChange={changeForm}
      />

      <label htmlFor="discount">Скидка</label>
      <input
        type="text"
        name='discount'
        value={form.discount}
        onChange={changeForm}
      />

      <label htmlFor="description">Описание</label>
      <input
        type="text"
        name='description'
        value={form.description}
        onChange={changeForm}
      />

      <label htmlFor="category">Категория</label>
      <input
        type="text"
        name='category'
        value={form.category}
        onChange={changeForm}
      />

      <label htmlFor="properties">Характеристики</label>
      <input
        type="text"
        name='properties'
        value={form.properties}
        onChange={changeForm}
      />

      <label htmlFor="picture"></label>
      <input
        type="file"
        id="picture"
        name="picture"
        onChange={picHandler}
        multiple />

      <button type='submit' onClick={submitHandler} >Готово</button>
    </div>
  )
}

export default CreateItem