import Typography from '@/app/components/Shared/Typography'
import React from 'react'

const CategoryBadge = ({ category }) => {
    return (
        <div className="absolute top-2 left-2 rounded-md bg-white py-1 px-2 ">
            <Typography className="capitalize" variant="body-xs-medium" as="p">
                {category}
            </Typography>
        </div>
    )
}

export default CategoryBadge