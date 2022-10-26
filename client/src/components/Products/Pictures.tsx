import React, { useState } from 'react'

interface PicturesProps{
    pics:string[]
    id:string|undefined
}

export default function Pictures({pics,id}:PicturesProps) {
    const [mainPic,setMainPic] = useState(`/pictures/${id}.png`)
    const [additional,setAdditional] = useState([...pics,`/pictures/${id}.png`])
    return (
        <div className='pics'>
            <img className='main-pic' src={mainPic} />
            <div className='additional'>
                {
                    additional.map(pic => {
                        return <img onClick={()=>setMainPic(pic)} src={pic} key={pic}></img>
                    })
                }
            </div>
           

        </div>
    )
}
