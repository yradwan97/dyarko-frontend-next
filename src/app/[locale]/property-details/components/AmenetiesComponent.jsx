import React from 'react'
import Typography from '../../components/Shared/Typography'
import FeatureItem from './FeatureItem'
import { useTranslations } from 'next-intl'
import HeadTitle from './HeadTitle'

function AmenetiesComponent({ amenities }) {
    const t = useTranslations("Properties.Details")
    return (
        <div className='py-12 border-b border-gray-200'>
            <HeadTitle text={t("rental-amenities")} />
            <div className='flex space-x-20'>
                <div className='flex-1'>
                    <ul className='space-y-2 list-disc sm:space-y-5'>
                        {amenities.map((a, i) => (
                            <FeatureItem className="text-black capitalize font-medium" key={i} firstText={a.name} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AmenetiesComponent