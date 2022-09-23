import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Categories from '../components/CategoryPanel/Categories'
import Loader from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import ICategory from '../interfaces/ICategory'



export default function CatalogPage() {
    const { request, loading } = useHttp()
    const [categories, setCategories] = useState<ICategory[]>([])
    const id = useParams().id
     //request('http://localhost:5000/categories/tree','GET')
    const getCategories = async (controller: AbortController) => {
        try {
            const data = await request<ICategory[]>(`/categories/tree${id?`/${id}`:''}`, 'GET', null, {}, controller.signal)
            setCategories(data)
        } catch (e) {
            alert(e)
        }
    }
    
    useEffect(() => {
        let controller = new AbortController()
        getCategories(controller)
        return (() => {
            controller.abort()
        })
    }, [])
    if (loading) {
        return (
            <Loader/>
        )
    }
    return (
        <div>
            <h1>Каталог</h1>
            <Categories categories={categories} />
        </div>
    )
}
