import React from 'react'

export default function Footer() {
    return (
        <div className='footer'>
            <div onClick={() => {
                window.open('https://vk.com/milena.store', '_blank');
            }}>
                VK
            </div>
            <div onClick={() => {
                window.open('https://www.instagram.com/olga.milenastore', '_blank');
            }}>
                INSTAGRAM
            </div>
            <div onClick={() => {
                window.open('https://wa.me/79609913978', '_blank');
            }}>
                WHATSAPP
            </div>
            <div>
                TELEGRAM
            </div>
        </div>
    )
}
//https://www.instagram.com/olga.milenastore/
//https://wa.me/79609913978