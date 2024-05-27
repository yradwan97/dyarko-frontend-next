import React from 'react'
import Typography from '@/src/app/[locale]/components/Shared/Typography'
import SquareOutline from '../../../components/UI/icons/SquareOutline'
import BedSolid from '../../../components/UI/icons/BedSolid'
import BathSolid from '../../../components/UI/icons/BathSolid'
import { capitalizeFirst, getPropertyPeriod, getPropertyPrice } from '@/src/app/[locale]/utils/utils'
import Image from 'next/image'
import property1 from "@/public/assets/property-1.png"
import { useTranslations } from 'next-intl'
import Price from '../../../landingPage/properties/Price'

function CustomProperty({property}) {
  const t = useTranslations("Application.Property")
  return (
     <div className={`flex flex-col sm:flex-row mt-16 p-3 rounded-lg shadow-basicMd overflow-hidden border border-[#F0EFFB]`}>
      <div className='relative sm:h-auto bg-cover bg-center w-auto h-auto'>
        <Image src={property?.image  || property1} width={100} height={200} alt='property' />
      </div>
      <div className='bg-white py-4 px-6 border border-main-100 grow'>
      {/* <div className='flex items-end'>
          <Typography variant='body-lg-bold' as="p" className="tracking-tightest text-main-yellow-600">{t("KWD")} {getPropertyPrice(property)}</Typography>
          <Typography variant='body-md-medium' as="p" className="text-gray-400">/{t(getPropertyPeriod(property))}</Typography>
      </div> */}
      <Price paymentType={property?.payment_type} price={getPropertyPrice(property)} period={getPropertyPeriod(property)}/>
        <Typography variant='h4' as="h4" className="mt-1">{capitalizeFirst(property?.title)}</Typography>
        {property?.locations?.length > 0 && <Typography variant='body-sm-medium' as="p" className="text-gray-500 capitalize my-2">{property?.locations.join(", ")}</Typography>}
        <div className='border-t border-main-100 flex space-x-4 items-center mt-3 pt-3'>
             <div className='flex justify-between items-end space-x-2'>
                <BedSolid className='fill-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500">{property?.bedrooms} {t("beds")}</Typography>
             </div>
              <div className='flex justify-between items-end py-2 space-x-2'>
                <BathSolid className='fill-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500 ">{property?.bathrooms} {t("baths")}</Typography>
             </div>
              <div className='flex justify-between items-end space-x-2'>
                <SquareOutline className='stroke-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500 ">{property?.area} {t.rich("area-unit", {
                              sup: (chunks) => <sup>{chunks}</sup>
                           })}</Typography>
             </div>
        </div>
      </div>
    </div>
  )
}

export default CustomProperty