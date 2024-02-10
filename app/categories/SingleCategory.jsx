import React from 'react'
import Typography from "../components/Shared/Typography"
import Image from "next/image"
import Link from "next/link"
import { capitalizeFirst } from '../utils/utils'

const SingleCategory = ({ category }) => {
  return (
    <Link href={`/property-listing/rent?category=${category.name}`}>
      <div className={`flex-1 items-center justify-center`}>
        <Image src={category?.image} width={100} height={100} alt={`${category.name} image`} />
        <Typography variant='body-lg-medium' as='p' className="text-black mr-auto mb-5 mt-3">
          {capitalizeFirst(category?.name)}
        </Typography>
      </div>
    </Link>
  )
}

export default SingleCategory