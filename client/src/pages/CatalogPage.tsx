import React, { useEffect, useState } from 'react'
import Categories from '../components/CategoryPanel/Categories'
import { useHttp } from '../hooks/http.hook'
import ICategory from '../interfaces/ICategory'

 

export default function CatalogPage() {
    const {request, loading} = useHttp()
    const [categories, setCategories] = useState<ICategory[]>([])
    //request('http://localhost:5000/categories/tree','GET')
    const getCategories = async (controller:AbortController)=>{
        try{
            const data = await request<ICategory[]>('/categories/tree','GET',null,{},controller.signal)
            setCategories(data)
        }catch(e){
            alert(e)
        }
    }
    useEffect(()=>{
        let controller = new AbortController()
        getCategories(controller)
        return (()=>{
            controller.abort()
        })
    },[])
    if(loading){
        return(
            <div>loading</div>
        )
    }
    return (
    <div>
      <Categories categories={categories}/>
    </div>
  )
}
