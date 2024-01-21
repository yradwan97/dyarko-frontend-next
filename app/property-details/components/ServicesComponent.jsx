import React from 'react'
import Typography from '../../components/Shared/Typography'
import FeatureItem from './FeatureItem'
import { format } from '@/app/utils/utils'

function ServicesComponent({ services }) {

    return (
        <div className='py-12 border-b border-gray-200'>
            <Typography variant='h4' as="h4" className="mb-8">Available Extra Services</Typography>
            <div className='flex space-x-20'>
                <div className='flex-1'>
                    <ul className='space-y-2 sm:space-y-5'>
                        {services.map((s, i) => (
                            <FeatureItem className="text-black capitalize font-medium" key={i} firstText={s.name} secondText={format(s.price)} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ServicesComponent