import React from 'react'
import { format } from "date-fns"
import { useTranslations } from 'next-intl'

const SingleTent = ({ tent }) => {
    const t = useTranslations("Properties.Details.Tents")
    return (
        <ul className='space-y-2 list-disc sm:space-y-5'>
            <li className='ml-4'>
                {t("code")}: <span className='ml-1 lg:ml-3'>{tent?.code}</span>
            </li>
            <li className='ml-4'>
                {t("available-from")}: <span className='ml-1 lg:ml-3'>{format(new Date(tent?.available_date), "dd/MM/yyyy")}</span>
            </li>
            <li className='ml-4'>
                {t("price")}: <span className='ml-1 lg:ml-3 text-main-600 font-bold'>{tent?.price} {t("kwd")}</span>
            </li>
            <li className='ml-4'>
                {t("insurance")}: <span className='ml-1 lg:ml-3 text-main-600 font-bold'>{tent?.insurance} {t("kwd")} </span>
            </li>
            <li className='ml-4'>
                {t("capacity")}: <span className='ml-1 lg:ml-3'>{tent?.capacity}</span>
            </li>

        </ul>
    )
}

export default SingleTent