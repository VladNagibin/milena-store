import React from 'react'

interface IDateBadgeProps {
    date: Date | string
}

export default function DateBadge({ date }: IDateBadgeProps) {
    return (
        <div className='date'>
            <input type='datetime-local' value={(typeof date == 'string' ? date : date.toISOString()).slice(0, 19)} disabled={true} />
        </div>
    )
}
