import React from 'react'
import { format } from "date-fns"

const SingleTent = ({ tent }) => {
    return (
        <ul className='space-y-2 list-disc sm:space-y-5'>
            <li className='ml-4'>
                Tent code: <span className='ml-1 lg:ml-3'>{tent?.code}</span>
            </li>
            <li className='ml-4'>
                Available from: <span className='ml-1 lg:ml-3'>{format(new Date(tent?.available_date), "dd/MM/yyyy")}</span>
            </li>
            <li className='ml-4'>
                Price: <span className='ml-1 lg:ml-3 text-main-yellow-500'>KWD {tent?.price}</span>
            </li>
            <li className='ml-4'>
                Capacity: <span className='ml-1 lg:ml-3'>{tent?.capacity}</span>
            </li>

        </ul>
    )
}

export default SingleTent