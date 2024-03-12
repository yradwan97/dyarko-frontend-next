import React from 'react'
import HeadTitle from './HeadTitle'
import Image from 'next/image'
import { fixImageSource } from '@/app/utils/utils'

function InteriorDetails({ url }) {

  return (
    <div className='py-12 border-b border-gray-200'>
      <HeadTitle text='Interior Details' />
      <div className='w-full sm:w-[390px] h-[303px]'>
        <Image className='w-full h-full' loading='lazy'
          src={url}
          alt="property layout"
          width={200}
          height={200} />
      </div>
    </div>
  )
}

export default InteriorDetails