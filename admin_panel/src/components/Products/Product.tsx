import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'
import IProduct from '../../interfaces/IProduct'
import PropertiesSettings from './PropertiesSettings'
interface IProductProps {
  product: IProduct
  reRender:()=>void
}

interface ChangableProduct extends IProduct {
  picture: File | null
}

export default function Product({ product,reRender }: IProductProps) {
  const { token } = useContext(AuthContext)
  const [editing, setEditing] = useState(false)
  const [productData, setProductData] = useState<ChangableProduct>({
    description: '',
    discount: 0,
    id: 0,
    name: '',
    price: 0,
    picture: null,
    properties: []
  })

  const deleteProduct = () => {
    if (window.confirm(`Удалить товар ${product.name}`)) {
      fetch(`${serverURL}/products/${product.id}`, {
        method: "DELETE",
        headers: {
          'authorization': token
        }
      }).then(response => {
        reRender()
      })

    }
  }

  const changeProduct = () => {
    if (window.confirm(`Изменить товар ${product.name}`)) {
      fetch(`${serverURL}/products`, {
        method: "PATCH",
        headers: {
          'Content-type': 'application/json',
          'authorization': token
        },
        body: JSON.stringify({
          id: productData.id,
          description: productData.description,
          name: productData.name,
          price: productData.price,
          discount: productData.discount,
          properties: productData.properties
        })
      }).then(response => {
        reRender()
      })
    }

  }

  const picHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || event.target.files == null || event.target.files.length == 0) {
      console.log('no pic')
      return

    }
    setProductData({ ...productData, picture: event.target.files[0] })

  }
  const clearPic = () => {
    setProductData({ ...productData, picture: null })
  }
  const addProperty = (key: string, value: string) => {
    setProductData((prev) => {
      prev.properties.push({
        value,
        key
      })
      return { ...prev }

    })
  }
  const deleteProperty = (key: string) => {
    setProductData((prev) => {
      var index = prev.properties.findIndex(el => el.key == key)
      var props = [...prev.properties.slice(0, index), ...prev.properties.slice(index + 1)]
      return { ...prev, properties: props }
    })
  }

  const handleProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductData((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }
  useEffect(() => {
    setProductData({ ...product, picture: null })
  }, [product])
  return (
    <div className='product' style={editing?{}:{maxHeight:"367px"}}>
      <div style={{ display: 'flex', justifyContent: "flex-end", marginBottom: '10px' }}>
        <span className={`material-symbols-outlined icon ${editing ? '' : 'hide-panel'}`} style={{ textAlign: 'right' }} onClick={clearPic} >clear</span>
        <span className={`material-symbols-outlined icon ${editing ? '' : 'hide-panel'}`} style={{ textAlign: 'right' }} onClick={changeProduct}>save</span>
        <span className={`material-symbols-outlined icon ${editing ? '' : 'hide-panel'}`} style={{ textAlign: 'right' }} onClick={deleteProduct}>delete</span>
        <span className={`material-symbols-outlined icon`} style={{ textAlign: 'right' }} onClick={() => setEditing((prev) => !prev)} >edit</span>
      </div>

      <label htmlFor={`file_${product.id}`} >
        <img className={`${editing ? 'active' : ''}  ${productData.picture ? "chosen" : ""}`} src={productData.picture ? URL.createObjectURL(productData.picture) : `${serverURL}/pictures/${product.id}.png`} />
      </label>
      <input id={`file_${product.id}`} type={'file'} accept="image/*" className='hide-panel' disabled={!editing} onChange={picHandler} />
      <input type={'text'} className='name' name='name' disabled={!editing} value={productData.name} onChange={handleProduct}></input>
      <div className='bottom-panel'>
        <div className='price'>
          <input disabled={!editing} type={'number'} name='price' value={productData.price} onChange={handleProduct}></input>
        </div>
      </div>
      <div className={`${editing?'':'hide-panel'}`}>
        <div>
          <input disabled={!editing} type={'text'} name='description' value={productData.description} onChange={handleProduct}></input>
          <input disabled={!editing} type={'number'} name='discount' value={productData.discount} onChange={handleProduct}></input>
        </div>
        <PropertiesSettings addProperty={addProperty} deleteProperty={deleteProperty} properties={productData.properties} id={product.id} />
      </div>

    </div>
  )
}
