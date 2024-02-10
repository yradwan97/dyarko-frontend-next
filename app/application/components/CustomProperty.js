import React from 'react'
import Typography from '@/app/components/Shared/Typography'
import SquareOutline from '../../components/UI/icons/SquareOutline'
import BedSolid from '../../components/UI/icons/BedSolid'
import BathSolid from '../../components/UI/icons/BathSolid'
import { capitalizeFirst, getPropertyPeriod, getPropertyPrice } from '@/app/utils/utils'
import Image from 'next/image'
import property1 from "@/public/assets/property-1.png"

function CustomProperty({property}) {
  return (
     <div className={`flex flex-col sm:flex-row mt-16 p-3 rounded-lg shadow-basicMd overflow-hidden border border-[#F0EFFB]`}>
      <div className='relative sm:h-auto bg-cover bg-center w-auto h-auto'>
        <Image src={property?.image  || property1} width={100} height={200} alt='property' />
      </div>
      <div className='bg-white py-4 px-6 border border-main-100 grow'>
      <div className='flex items-end'>
          <Typography variant='body-lg-bold' as="p" className="tracking-tightest text-main-yellow-600">KWD {getPropertyPrice(property)}</Typography>
          <Typography variant='body-md-medium' as="p" className="text-gray-400">{getPropertyPeriod(property)}</Typography>
      </div>
        <Typography variant='h4' as="h4" className="mt-1">{capitalizeFirst(property?.title)}</Typography>
        <Typography variant='body-sm-medium' as="p" className="text-gray-500 my-2">13086 Safat, Kuwait City</Typography>
        <div className='border-t border-main-100 flex space-x-4 items-center mt-3 pt-3'>
             <div className='flex justify-between items-end space-x-2'>
                <BedSolid className='fill-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500">{property?.bedrooms} Beds</Typography>
             </div>
              <div className='flex justify-between items-end py-2 space-x-2'>
                <BathSolid className='fill-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500 ">{property?.bathrooms} Bathrooms</Typography>
             </div>
              <div className='flex justify-between items-end space-x-2'>
                <SquareOutline className='stroke-main-600 w-4 h-4'/>
                <Typography variant='body-xs-medium' as="p" className="text-gray-500 ">{property?.area} m²</Typography>
             </div>
        </div>
      </div>
    </div>
  )
}

export default CustomProperty