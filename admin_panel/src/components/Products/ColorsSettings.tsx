import React, { useEffect, useState } from 'react'

interface colorsSettingsProps {
    colors: Array<{
        value: string
    }>
    id:number
    addColor: (value: string) => void
    deleteColor: (value: string) => void
}

export default function ColorsSettings({ colors, addColor, deleteColor,id }: colorsSettingsProps) {
    const [color, setColor] = useState({
        value: ''
    })
    const handleColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }
    const add = () =>{
        addColor(color.value)
        setColor({
            value:""
        })
    }

    return (
        <div className='property-settings'>
            <h3>Цвета</h3>
            <div className='inputs'>
                <input name='value' type={'color'} value={color.value} onChange={handleColor}></input>
            </div>
            <span className={`material-symbols-outlined icon add-btn`} onClick={add}>add</span>
            {
                colors.map(elem => {
                    return <div className='inputs' key={`${elem.value+id}`}>
                        <span className='data'><input type={'color'} value={elem.value} disabled></input></span>
                        <span className={`material-symbols-outlined icon add-btn`} onClick={() => deleteColor(elem.value)}>delete</span>
                    </div>
                })
            }
        </div>
    )
}
