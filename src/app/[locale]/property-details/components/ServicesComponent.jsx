import React from 'react'
import Typography from '../../components/Shared/Typography'
import FeatureItem from './FeatureItem'
import { format } from '@/src/app/[locale]/utils/utils'
import { useTranslations } from 'next-intl'
import HeadTitle from './HeadTitle'

function ServicesComponent({ services }) {
    const t = useTranslations("Properties.Details")
    return (
        <div className='py-12 border-b border-gray-200'>
            <HeadTitle text={t("services")} />
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