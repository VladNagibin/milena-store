import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'
import IProduct from '../../interfaces/IProduct'
import AdditionalPics from './AdditionalPics'
import ColorsSettings from './ColorsSettings'
import PropertiesSettings from './PropertiesSettings'
import SizesSettings from './SizesSettings'
interface IProductProps {
  product: IProduct
  reRender: () => void
}

interface ChangableProduct extends IProduct {
  picture: File | null

}

export default function Product({ product, reRender }: IProductProps) {
  console.log(product)
  const { token } = useContext(AuthContext)
  const [editing, setEditing] = useState(false)
  const [productData, setProductData] = useState<ChangableProduct>({
    description: '',
    discount: 0,
    id: 0,
    name: '',
    price: 0,
    picture: null,
    sizes: [],
    properties: [],
    colors: []
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

  const savePic = async (id: number) => {
    if (productData.picture == null) {
      return
    }
    let formData = new FormData()
    formData.append('picture', productData.picture)
    console.log(formData)
    const data = await fetch(`${serverURL}/products/picture/${id}`, {
      method: 'post',
      body: formData,
      headers: {
        'authorization': token
      }
    })
    reRender()
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
          properties: productData.properties,
          sizes: productData.sizes,
          colors: productData.colors
        })
      }).then(response => {
        savePic(productData.id)
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
  const addSize = (value: string) => {
    setProductData((prev) => {
      prev.sizes.push({
        value
      })
      return { ...prev }

    })
  }
  const deleteSize = (value: string) => {
    setProductData((prev) => {
      var index = prev.sizes.findIndex(el => el.value == value)
      var sizes = [...prev.sizes.slice(0, index), ...prev.sizes.slice(index + 1)]
      return { ...prev, sizes }
    })
  }
  const addColor = (value: string) => {
    setProductData((prev) => {
      prev.colors.push({
        value
      })
      return { ...prev }

    })
  }
  const deleteColor = (value: string) => {
    setProductData((prev) => {
      var index = prev.colors.findIndex(el => el.value == value)
      var colors = [...prev.colors.slice(0, index), ...prev.sizes.slice(index + 1)]
      return { ...prev, colors }
    })
  }

  const handleProduct = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductData((prev) => {
      return { ...prev, [event.target.name]: event.target.value }
    })
  }
  useEffect(() => {
    setProductData({ ...product, picture: null })
  }, [product])
  return (
    <div className='product' style={editing ? {} : { maxHeight: "370px" }}>
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
      <label htmlFor='name'>Наименование</label>
      <input id='name' type={'text'} name='name' disabled={!editing} value={productData.name} onChange={handleProduct}></input>
      <div className='bottom-panel'>
        <div className='price'>
          <label htmlFor='price'>Цена</label>
          <input id='price' disabled={!editing} type={'number'} name='price' value={productData.price} onChange={handleProduct}></input>
        </div>
      </div>
      <div className={`${editing ? '' : 'hide-panel'}`}>
        <div>
          <label htmlFor='discount'>Скидка</label>
          <input id='discount' type={'number'} name='discount' value={productData.discount} onChange={handleProduct}></input>
          <div style={{display:'flex',flexDirection:"column"}}>
            <label htmlFor='description'>Описание</label>
            <textarea id='description' name='description' style={{borderRadius:"20px",padding:"5px"}} value={productData.description} onChange={handleProduct}></textarea>
          </div>
        </div>
        <PropertiesSettings addProperty={addProperty} deleteProperty={deleteProperty} properties={productData.properties} id={product.id} />
        <SizesSettings addSize={addSize} deleteSize={deleteSize} sizes={productData.sizes} id={product.id} />
        <ColorsSettings addColor={addColor} deleteColor={deleteColor} colors={productData.colors} id={product.id} />
        <AdditionalPics id={product.id} reRender={reRender}/>

      </div>

    </div>
  )
}
