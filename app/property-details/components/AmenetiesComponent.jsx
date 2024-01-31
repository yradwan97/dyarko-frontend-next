import React from 'react'
import Typography from '../../components/Shared/Typography'
import FeatureItem from './FeatureItem'

function AmenetiesComponent({ amenities }) {
    return (
        <div className='py-12 border-b border-gray-200'>
            <Typography variant='h4' as="h4" className="mb-8">Rental features</Typography>
            <div className='flex space-x-20'>
                <div className='flex-1'>
                    <ul className='space-y-2 list-disc sm:space-y-5'>
                        {amenities.map((a, i) => (
                            <li className='ml-4' key={i}>
                                <FeatureItem className="text-black capitalize font-medium" key={i} firstText={a.name} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AmenetiesComponent