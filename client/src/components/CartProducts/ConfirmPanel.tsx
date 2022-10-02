import { IfVoid } from '@reduxjs/toolkit/dist/tsHelpers'
import React, { useState } from 'react'

interface ConfirmPanelProps {
    yesAction: () => void
    noAction: () => void
}

export default function ConfirmPanel({ yesAction,noAction }: ConfirmPanelProps) {
    return (
        <div className='confirm-panel'>
            <a>Уверены?</a>
            <div>
                <button onClick={yesAction}>Да</button>
                <button onClick={noAction}>Нет</button>
            </div>
        </div>
    )
}
