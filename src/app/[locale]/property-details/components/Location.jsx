import React from 'react'
import HeadTitle from './HeadTitle'
import Map from "@/src/app/[locale]/components/UI/Map"
import { useTranslations } from 'next-intl'

function Location({ coords }) {
  const t = useTranslations("Properties.Details")
  let { long, lat } = coords
  return (
    <div className='border-b border-gray-200 pt-12'>
      <HeadTitle text={t("map")} />
      <div className='relative'>
        <Map latitude={lat} longitude={long} isSelectable={false} onSelect={(values) => console.log(values)} />
      </div>
    </div>
  )
}

export default Location