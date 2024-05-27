import React from 'react'
import Typography from "../components/Shared/Typography"
import Image from "next/image"
import Link from "next/link"
import { capitalizeFirst } from '../utils/utils'
import { useTranslations } from 'next-intl'

const SingleCategory = ({ category }) => {
  const t = useTranslations("General.Categories")
  return (
    <Link href={`/property-listing/rent?category=${category.name}`}>
      <div className={`flex flex-col items-center text-center justify-center space-y-5`}>
        <Image src={category?.image} width={100} height={100} alt={`${category.name} image`} />
        <Typography variant='body-lg-medium' as='p' className="capitalize text-black">
          {t(category?.name)}
        </Typography>
      </div>
    </Link>
  )
}

export default SingleCategory