import React from 'react'
import FeatureItem from './FeatureItem'
import HeadTitle from './HeadTitle'
import { calculateDifference, capitalizeFirst } from '@/src/app/[locale]/utils/utils'
import { getYear, format } from "date-fns"
import { useLocale, useTranslations } from 'next-intl'

function FeatureComponent({ property }) {
    const weeksDiff = calculateDifference(property?.createdAt ? new Date(property?.createdAt) : new Date(property?.updatedAt), true)
    const isAvailable = calculateDifference(property?.available_date, false) >= 0
    const t = useTranslations("Properties.Details.Features")
    const locale = useLocale()
    return (
        <div className='py-12 border-b  border-gray-200'>
            <HeadTitle text={t("title")} />
            <div className={`flex flex-col ${locale === "ar" ? "md:flex-row-reverse" : "md:flex-row"} md:space-x-20`}>
                <div className={`md:w-1/2 ${locale === "ar" && "pl-5"}`}>
                    <ul className='space-y-5'>
                        <FeatureItem firstText={t("listed-on")} secondText={`${weeksDiff} ${weeksDiff === 1 ? t("week") : t("weeks")}`} companyName={true} />
                        <FeatureItem firstText={t("available-date")} secondText={isAvailable ? t("available-now") : `${t('available-from')} ${format(new Date(property?.available_date), "dd/MM/yyyy")}`} />
                        <FeatureItem firstText={t("year")} secondText={getYear(new Date(property?.createdAt)).toString()} />
                        <FeatureItem firstText={t("type")} secondText={capitalizeFirst(property.type)} />
                        <FeatureItem firstText={t("city")} secondText={capitalizeFirst(property.city)} />
                    </ul>
                </div>
                <div className='md:w-1/2 mt-5 md:mt-0'>
                    <ul className='space-y-5'>
                        {property.area && <FeatureItem firstText={t("size")} secondText={`${property.area} m2`} />}
                        {property?.payment_type === "share" && (
                            <>
                                <FeatureItem firstText={t('capacity')} secondText={property?.capacity} />
                                <FeatureItem firstText={t("available-capacity")} secondText={property?.available_capacity} />
                            </>
                        )}
                        {property?.category === "chalet" && (
                            <>
                                {property?.capacity && <FeatureItem firstText={t('capacity')} secondText={property?.capacity} />}
                                <FeatureItem firstText={t('has-garden')} secondText={property?.has_garden ? t("yes") : t("no")} />
                                <FeatureItem firstText={t('has-beach')} secondText={property?.has_beach ? t("yes") : t("no")} />
                                <FeatureItem firstText={t('has-pool')} secondText={property?.has_pool ? t("yes") : t("no")} />
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FeatureComponent