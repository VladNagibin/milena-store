import React, { useEffect, useState } from 'react'
import CreateItem from './CreateItem'


const ModalWindow = () => {
  return (
    <>
      <div className="modal_window"/>
      
      <div className='modal_window_border'>
        <h1></h1>

        <CreateItem/>
      </div>
        
      
    </>
  )
}

export default ModalWindow