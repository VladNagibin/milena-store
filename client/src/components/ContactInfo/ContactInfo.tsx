import React, { useState } from 'react'

interface IContactInfoProps {
    email: string | null
    phone: number | null
}

export default function ContactInfo({ email, phone }: IContactInfoProps) {
    const [changing, setChanging] = useState(false)
    return (
        <div className='contact-fields'>
            <input disabled={!changing} name='email' placeholder='Email' className={changing ? '' : 'unable'} value={email ? email : ''}></input>
            <input disabled={!changing} name='phone' placeholder='Телефон' className={changing ? '' : 'unable'} type={'number'} value={phone ? phone : ''}></input>
            <div className='buttons'>
                <span className="material-symbols-outlined icon" onClick={() => setChanging(!changing)}>
                    edit
                </span>
                <span className={`material-symbols-outlined icon ${changing ? '' : 'hide'}`}>
                    save
                </span>
            </div>
        </div>
    )
}
