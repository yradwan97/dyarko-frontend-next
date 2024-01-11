import React from 'react'
import HeadTitle from './HeadTitle'
import map from '../../../public/assets/map.png'
import Typography from '../../components/Shared/Typography'
import Button from '../../components/Shared/Button'
import ChevronRight from "../../components/UI/icons/ChevronRight"
import LocationIconSolid from "../../components/UI/icons/LocationIconSolid"
import Link from 'next/link'
import Image from 'next/image'
import Map from "@/app/components/UI/Map"


function Location({ coords }) {
  let { long, lat } = coords
  return (
    <div className='border-b border-gray-200 pt-12'>
      <HeadTitle text="Map" />
      <div className='relative'>
        <Map latitude={lat} longitude={long} isSelectable={false} onSelect={(values) => console.log(values)} />
        {/* <Button variant="primary" className=" absolute bottom-7 left-7 !bg-main-blue !border-main-blue flex items-center">
          <LocationIconSolid className='stroke-white fill-white w-3 h-4 mr-1' />
          <Typography variant='body-xs-bold' as='span' className="text-white transition-colors ease-in-out duration-500">Open Google Maps</Typography>
        </Button> */}
      </div>
      {/* <div className='flex items-center mt-8'>
            <Link href="/" className='text-main-600 text-md font-bold'>See more listings in Houston</Link> <ChevronRight className='w-2 h-2.5 ml-2.5 text-main-600'/>
        </div>
        <HeadTitle text='Similar listings' className="!mb-4"/> */}
    </div>
  )
}

export default Location