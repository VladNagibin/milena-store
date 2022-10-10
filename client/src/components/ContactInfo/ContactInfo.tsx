import React, { useCallback, useEffect, useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useHttp } from '../../hooks/http.hook'
import { useAppSelector } from '../../hooks/redux.hook'
import InputMask from 'react-input-mask';
import Loader from '../Loader';


export default function ContactInfo() {
  const { login, token } = useAppSelector(state => state.auth)
  const [changing, setChanging] = useState(false)
  const [contactInfo, setContactInfo] = useState<{
    email: string | null
    phone: string | null
  }>({
    email: null,
    phone: null
  })
  const { request, loading } = useHttp()

  const contactInfoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo(prev => { return { ...prev, [event.target.name]: event.target.value } })
  }

  const saveContactData = async () => {
    request(`/users/${login}`, 'PATCH', contactInfo, { Authorization: token }).then(result => {
      alert('Ваши контактные данные обновлены')
    })
  }

  const getContactData = useCallback(async (signal: AbortSignal) => {

    const data = await request<{
      email: string,
      phone: string
    }>(`/users/${login}`, 'GET', null, { Authorization: token }, signal)
    setContactInfo({
      phone: data.phone,
      email: data.email
    })
  }, [login])

  useEffect(() => {
    const controller = new AbortController()
    getContactData(controller.signal)
    return (() => {
      controller.abort()
    })

  }, [])
  if (loading) {
    return <Loader />
  }
  return (
    <div className='contact-fields'>
      <input disabled={!changing} name='email' placeholder='Email' className={changing ? '' : 'unable'} value={contactInfo.email ? contactInfo.email : ''} onChange={contactInfoHandler}></input>
      <InputMask mask="+7(999) 999-99-99" disabled={!changing} name='phone' placeholder='Телефон' className={changing ? '' : 'unable'} value={contactInfo.phone ? contactInfo.phone : ''} onChange={contactInfoHandler} />
      <div className='buttons'>
        <span className="material-symbols-outlined icon" onClick={() => setChanging(!changing)}>
          edit
        </span>
        <span className={`material-symbols-outlined icon ${changing ? '' : 'hide'}`} onClick={saveContactData}>
          save
        </span>
      </div>
    </div>
  )
}
