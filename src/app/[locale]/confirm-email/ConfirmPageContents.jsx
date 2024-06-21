import React from 'react'
import Typography from "@/src/app/[locale]/components/Shared/Typography"
import VerifiedCheck from "../components/UI/icons/VerifiedCheck"
import { useTranslations } from 'next-intl'

const ConfirmPageContents = () => {
    const t = useTranslations("Login.Confirm")
    return (
        <div className='flex flex-col border items-center h-96 justify-center rounded-lg space-y-4 mt-3 border-gray-300 px-8 pb-8 pt-2'>
            <VerifiedCheck />
            <Typography className='text-center' as='h2' variant='h2'>
                {t("header")}
            </Typography>
            <Typography className='text-center' as="p" variant='body-md-medium'>
                {t("subheader")}
            </Typography>
        </div>
    )
}

export default ConfirmPageContents