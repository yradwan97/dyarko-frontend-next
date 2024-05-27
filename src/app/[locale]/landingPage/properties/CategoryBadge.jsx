import Typography from '@/src/app/[locale]/components/Shared/Typography'
import { useTranslations } from 'next-intl'
import React from 'react'

const CategoryBadge = ({ category }) => {
    const t = useTranslations("General.Categories")
    return (
        <div className="absolute top-2 left-2 rounded-md bg-white py-1 px-2 ">
            <Typography className="capitalize" variant="body-xs-medium" as="p">
                {t(category)}
            </Typography>
        </div>
    )
}

export default CategoryBadge