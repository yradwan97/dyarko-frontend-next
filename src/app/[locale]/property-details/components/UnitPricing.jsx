import React from 'react'
import HeadTitle from './HeadTitle'
import { useLocale, useTranslations } from 'next-intl'
import FeatureItem from './FeatureItem'

const UnitPricing = ({ property }) => {
    console.log(property)
    const t = useTranslations("Properties.Details.Pricing")
    const locale = useLocale()
    return (
        <div className='py-12 border-b  border-gray-200'>
            <HeadTitle text={t("title")} />
            <div className={`flex flex-col ${locale === "ar" ? "md:flex-row-reverse" : "md:flex-row"} md:space-x-20`}>
                <div className={`md:w-1/2 ${locale === "ar" && "pl-5"}`}>
                    <ul className='space-y-5'>
                        {property?.is_daily && <FeatureItem firstText={t("daily")} secondText={`${property?.daily_price} ${t("kwd")}`} secondTextClassName='text-main-yellow-600' />}
                        {property?.is_weekly && <FeatureItem firstText={t("weekly")} secondText={`${property?.weekly_price} ${t("kwd")}`} secondTextClassName='text-main-yellow-600' />}
                        {property?.is_monthly && <FeatureItem firstText={t("monthly")} secondText={`${property?.monthly_price} ${t("kwd")}`} secondTextClassName='text-main-yellow-600' />}
                        {property?.commission && typeof property?.commission === "number" && <FeatureItem firstText={t("commission")} secondText={`${property?.commission} ${t("kwd")}`} secondTextClassName='text-main-yellow-600' />}
                        {property?.price && typeof property?.price === "number" && <FeatureItem firstText={t("price")} secondText={`${property?.price} ${t("kwd")}`} secondTextClassName='text-main-yellow-600' />}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UnitPricing