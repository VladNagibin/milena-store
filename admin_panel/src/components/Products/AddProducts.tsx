import React, { useContext, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'
import INewProduct from '../../interfaces/INewProduct'
import AdditionalPics from './AdditionalPics'
import ColorsSettings from './ColorsSettings'
import PropertiesSettings from './PropertiesSettings'
import SizesSettings from './SizesSettings'

interface AddProductsProps {
    reRender: () => void
    id: number | undefined
}

export default function AddProducts({ reRender, id }: AddProductsProps) {
    const [show, setShow] = useState(false)
    const { token } = useContext(AuthContext)
    const [product, setProduct] = useState<INewProduct>({
        name: "",
        categoryId: id ? id : 0,
        price: 0,
        discount: 0,
        description: '',
        properties: [],
        picture: null,
        colors: [],
        sizes: []
    })
    const handleProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProduct((prev) => { return { ...prev, [event.target.name]: event.target.value } })
    }
    const picHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target || event.target.files == null || event.target.files.length == 0) {
            console.log('no pic')
            return

        }
        setProduct({ ...product, picture: event.target.files[0] })

    }
    const addProperty = (key: string, value: string) => {
        setProduct((prev) => {
            prev.properties.push({
                value,
                key
            })
            return { ...prev }

        })
    }

    const addSize = (value: string) => {
        setProduct((prev) => {
            prev.sizes.push({
                value
            })
            return { ...prev }

        })
    }
    const deleteSize = (value: string) => {
        setProduct((prev) => {
            var index = prev.sizes.findIndex(el => el.value == value)
            var sizes = [...prev.sizes.slice(0, index), ...prev.sizes.slice(index + 1)]
            return { ...prev, sizes }
        })
    }
    const addColor = (value: string) => {
        setProduct((prev) => {
            prev.colors.push({
                value
            })
            return { ...prev }

        })
    }
    const deleteColor = (value: string) => {
        setProduct((prev) => {
            var index = prev.colors.findIndex(el => el.value == value)
            var colors = [...prev.colors.slice(0, index), ...prev.sizes.slice(index + 1)]
            return { ...prev, colors }
        })
    }

    const savePic = async (id: string) => {
        if (product.picture == null) {
            return
        }
        let formData = new FormData()
        formData.append('picture', product.picture)
        console.log(formData)
        const data = await fetch(`${serverURL}/products/picture/${id}`, {
            method: 'post',
            body: formData,
            headers: {
                'authorization': token
            }
        })
        setShow(false)
        reRender()
    }
    const deleteProperty = (key: string) => {
        setProduct((prev) => {
            var index = prev.properties.findIndex(el => el.key == key)
            var props = [...prev.properties.slice(0, index), ...prev.properties.slice(index + 1)]
            return { ...prev, properties: props }
        })
    }
    const save = () => {
        if (window.confirm('Вы уверены что хотите создать товар?')) {
            fetch(`${serverURL}/products`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'authorization': token
                },
                body: JSON.stringify({ ...product })
            }).then(response => {
                response.json().then((data) => {
                    savePic(data.id)
                })
            })
        }
    }
    return (
        <div >
            <span className={`material-symbols-outlined icon add-btn`} onClick={() => setShow((prev) => !prev)}>add</span>
            <div className={`new-category new-product ${show ? '' : 'hide-panel'}`} >
                <label htmlFor='name'>Наименование</label>
                <input id='name' type={'text'} name='name' onChange={handleProduct} value={product.name}></input>
                <label htmlFor='price'>Цена</label>
                <input id='price' type={'number'} name='price' onChange={handleProduct} value={product.price}></input>
                <label htmlFor='discount'>Скидка</label>
                <input id='discount' type={'number'} name='discount' onChange={handleProduct} value={product.discount}></input>
                <label htmlFor='description'>Описание</label>
                <input id='description' type={'text'} name='description' onChange={handleProduct} value={product.description}></input>
                <PropertiesSettings properties={product.properties} addProperty={addProperty} deleteProperty={deleteProperty} id={0} />
                <SizesSettings addSize={addSize} deleteSize={deleteSize} sizes={product.sizes} id={0} />
                <ColorsSettings addColor={addColor} deleteColor={deleteColor} colors={product.colors} id={0} />
                
                <label htmlFor='parentId'>Родитель</label>
                <input id='parentId' type={'number'} name='parentId' onChange={handleProduct} value={product.categoryId}></input>
                <label htmlFor="picture" className={`pic-label ${product.picture == null ? '' : 'uploaded'}`}>Картинка
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={picHandler}
                        multiple />
                </label>
                <img className={`${product.picture ? "" : "hide-panel"}`} style={{ marginBottom: '10px' }} src={product.picture ? URL.createObjectURL(product.picture) : ''} />
                <button onClick={save}>Сохранить</button>
            </div>
        </div>
    )
}
