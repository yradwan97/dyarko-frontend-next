import React from 'react'
import HeadTitle from './HeadTitle'
import Map from "@/app/components/UI/Map"

function Location({ coords }) {
  let { long, lat } = coords
  return (
    <div className='border-b border-gray-200 pt-12'>
      <HeadTitle text="Map" />
      <div className='relative'>
        <Map latitude={lat} longitude={long} isSelectable={false} onSelect={(values) => console.log(values)} />
      </div>
    </div>
  )
}

export default Location