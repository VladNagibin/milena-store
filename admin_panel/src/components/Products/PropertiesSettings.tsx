import React, { useEffect, useState } from 'react'

interface PropertiesSettingsProps {
    properties: Array<{
        key: string
        value: string
    }>
    id:number
    addProperty: (key: string, value: string) => void
    deleteProperty: (key: string) => void
}

export default function PropertiesSettings({ properties, addProperty, deleteProperty,id }: PropertiesSettingsProps) {
    const [prop, setProp] = useState({
        key: '',
        value: ''
    })
    const handleProp = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProp((prev) => {
            return { ...prev, [event.target.name]: event.target.value }
        })
    }
    const add = () =>{
        addProperty(prop.key, prop.value)
        setProp({
            key:'',
            value:""
        })
    }

    return (
        <div className='property-settings'>
            <h3>Свойства</h3>
            <div className='inputs'>
                <input name='key' value={prop.key} onChange={handleProp}></input>
                <input name='value' value={prop.value} onChange={handleProp}></input>
            </div>
            <span className={`material-symbols-outlined icon add-btn`} onClick={add}>add</span>
            {
                properties.map(elem => {
                    return <div className='inputs' key={`${elem.key+id}`}>
                        <span className='data'>{elem.key}</span>
                        <span className={`material-symbols-outlined icon add-btn`} onClick={() => deleteProperty(elem.key)}>delete</span>
                        <span className='data'>{elem.value}</span>
                    </div>
                })
            }
        </div>
    )
}
