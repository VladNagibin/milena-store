import React, { useContext, useEffect, useState } from 'react'
import { serverURL } from '../../auth'
import { AuthContext } from '../../context/AuthContext'

interface AdditionaPic {
    url: string
    active: boolean
}
interface AdditionalPicsProps {
    id: number
    reRender:()=>void
}
export default function AdditionalPics({ id,reRender }: AdditionalPicsProps) {
    const [additionalPics, setAdditionalPics] = useState<AdditionaPic[]>([])
    const [addedPics, setAddedPics] = useState<File[]>([])
    const {token} = useContext(AuthContext)
    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalPics((prev) => {
            var newAdditionalPics = prev.map(el => {
                if (el.url == event.target.name) {
                    return { url: event.target.name, active: event.target.checked }
                }
                return el
            })
            return newAdditionalPics
        })
    }
    const deletePic = (event: React.MouseEvent<HTMLDivElement>) => {
        var picId = event.currentTarget.id
        setAddedPics((prev) => {
            return [...prev.filter(el => el.name !== picId)]
        })
    }

    const handleAddedPics = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target || event.target.files == null || event.target.files.length == 0) {
            console.log('no pic')
            return

        }
        var fileArr: File[] = []
        for (var i = 0; i < event.target.files.length; i++) {
            fileArr.push(event.target.files[i])
        }
        setAddedPics((prev) => [...prev, ...fileArr])
    }

    const getAdditionalPics = () => {
        fetch(`${serverURL}/products/${id}`).then(responce => {
            responce.json().then((data: {
                pics?: string[]
            }) => {

                if (data.pics) {
                    setAdditionalPics(data.pics.map(el => { return { url: el, active: true } }))
                }
            })
        })
    }

    const save = () => {
        var savings:Promise<any>[] = [] 
        var toDelete:Array<{
            url:string
        }> = []
        additionalPics.filter(el=>!el.active).forEach(pic=>{
            toDelete.push({url:pic.url})
        })
        console.log(toDelete)
        savings.push(fetch(`${serverURL}/products/picture/additional`, {
            method: 'delete',
            body:JSON.stringify(toDelete),
            headers: {
                'authorization': token,
                'Content-type':'application/json'
            }
        }))
        addedPics.forEach(pic => {
            let formData = new FormData()
            formData.append('picture', pic)
            console.log(formData)
            savings.push(fetch(`${serverURL}/products/picture/additional/${id}`, {
                method: 'post',
                body: formData,
                headers: {
                    'authorization': token
                }
            }))
        })
        Promise.all(savings).then((data)=>{
            alert('Картинки сохранены')
            reRender()
        })
    }
    useEffect(() => {
        getAdditionalPics()
    }, [])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <h3>Картинки</h3><span className={`material-symbols-outlined`} onClick={save}>save</span>
            </div>
            <div className={`${additionalPics.length ? 'additional-pics' : 'hide-panel'}`}>
                {
                    additionalPics.map(el => <label htmlFor={el.url} key={el.url}><img src={serverURL + el.url} /><input id={el.url} type={'checkbox'} name={el.url} checked={el.active} onChange={handleCheckBox}></input></label>)
                }
            </div>
            <div className='added-pics'>
                <label htmlFor={`pics-${id}`}><span className={`material-symbols-outlined`}>add</span></label>
                <input id={`pics-${id}`} className='hide-panel' type={'file'} accept="image/*" multiple onChange={handleAddedPics}></input>
                {
                    addedPics.map(el => {
                        console.log(URL.createObjectURL(el))
                        return <div key={`${el.name}-${id}`} ><img id={`${el.name}`} onClick={deletePic} src={URL.createObjectURL(el)} /></div>
                    })
                }
            </div>
        </>
    )
}
