import React, { useEffect, useState } from 'react'

interface SizesSettingsProps {
    sizes: Array<{
        value: string
    }>
    id:number
    addSize: (value: string) => void
    deleteSize: (value: string) => void
}

export default function SizesSettings({ sizes, addSize, deleteSize,id }: SizesSettingsProps) {
    const [size, setSize] = useState({
        value: ''
    })
    const handleSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }
    const add = () =>{
        addSize(size.value)
        setSize({
            value:""
        })
    }

    return (
        <div className='property-settings'>
            <h3>Размеры</h3>
            <div className='inputs'>
                <input name='value' value={size.value} onChange={handleSize}></input>
            </div>
            <span className={`material-symbols-outlined icon add-btn`} onClick={add}>add</span>
            {
                sizes.map(elem => {
                    return <div className='inputs' key={`${elem.value+id}`}>
                        <span className='data'>{elem.value}</span>
                        <span className={`material-symbols-outlined icon add-btn`} onClick={() => deleteSize(elem.value)}>delete</span>
                    </div>
                })
            }
        </div>
    )
}
