import React, { useState } from 'react'
import Button from "../../../components/Shared/Button";
import Typography from "../../../components/Shared/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import CloseOutline from '../../../components/UI/icons/CloseOutline';
import ImageIcon from '../../../components/UI/icons/ImageIcon';
import Overlay from '../Overlay';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/pagination";
import './style.css'

function PropertySlider({ property }) {
  const [visible, setVisible] = useState(false)
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span key= class="' + `${className} !rounded-full` + '">' + '</span>';
    },
  };

  return (
    <>
      <Overlay visible={visible} setVisible={setVisible}>
        <div>
          <div className='absolute top-6 right-6 cursor-pointer' onClick={() => setVisible(false)}>
            <CloseOutline className=' stroke-white w-5 h-5' />
          </div>
          <Image width={250}
            loading='lazy'
            height={250}
            src={(property && property.image)}
            className="w-auto h-auto" alt="" />
        </div>
      </Overlay>
      <div className='grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4 mt-9'>
        <div className='col-span-4 md:col-span-2 row-span-2 relative'>
          <Swiper
            pagination={pagination}
            modules={[Pagination, Autoplay]}
            className="mySwiper h-56"
          >
            {property && property.images.length > 0 && property.images.map((image, index) => {
              return <SwiperSlide key={index}>
                <Image priority className='h-full' width={150} height={150} src={image} alt="slide 1" />
              </SwiperSlide>
            })}

          </Swiper>
          <Button variant='primary-outline' className="group flex sm:hidden z-2 items-center absolute bottom-5 right-4 " onClick={() => setVisible(true)}>
            <ImageIcon className='stroke-main-600 group-hover:stroke-white mr-1 w-4 h-4 transition-colors ease-in-out duration-500' />
            <Typography variant='body-sm-bold' as='span' className="text-black group-hover:text-white transition-colors ease-in-out duration-500">View all photos</Typography>
          </Button>

        </div>

      </div>
    </>
  )
}

export default PropertySlider