import React from 'react'
import Typography from "../components/Shared/Typography"
import Image from "next/image"
import Link from "next/link"
import { capitalizeFirst } from '../utils/utils'

const SingleCategory = ({category, className}) => {
  return (
    <div className={`flex-1 ${className}`}>
        <div className="relative h-[200px]">
            <Link href={`/property-listing/rent?category=${category.name}`}>
                <Image src={category?.image} width={150} height={150} alt={`${category.name} image`} />
            </Link>
        </div>
        <Typography variant='body-lg-medium' as='p' className="text-black mr-auto mb-5 mt-3">
            {capitalizeFirst(category?.name)}
        </Typography>
    </div>
  )
}

export default SingleCategory