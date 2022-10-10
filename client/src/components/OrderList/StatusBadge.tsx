import React from 'react'
import Status from '../../types/status'

interface IStatusBadgeProps{
    status:Status
    
}

export default function StatusBadge({status}:IStatusBadgeProps) {
    return (
        <div className={`status ${status}`}>
            {status == 'created' ? 'Создан' : status == 'closed' ? 'Закрыт' : status == 'paid' ? 'Оплачен' : 'Отправлен'}
        </div>
    )
}
