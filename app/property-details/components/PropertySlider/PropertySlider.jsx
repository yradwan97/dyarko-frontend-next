import React, { useState } from 'react';
import Button from "../../../components/Shared/Button";
import Typography from "../../../components/Shared/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import CloseOutline from '../../../components/UI/icons/CloseOutline';
import ImageIcon from '../../../components/UI/icons/ImageIcon';
import Overlay from '../Overlay';
import Image from 'next/image';

import "swiper/css";
import "swiper/css/pagination";
import './style.css';

function PropertySlider({ property }) {
  const images = Array(6).fill(property?.image)
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} !rounded-full !bg-black"></span>`;
      // return `<span class="${className} !rounded-full bg-main-orange-600" />`
    },
  };

  const openOverlay = (image) => {
    setActiveImage(image);
    setVisible(true);
  };

  return (
    <>
      <Overlay visible={visible} setVisible={setVisible}>
        <div style={{ position: 'relative' }}>
          <div className='absolute top-6 right-6 z-999 cursor-pointer' onClick={() => setVisible(false)}>
            <CloseOutline className=' stroke-white w-5 h-5' />
          </div>
          <Image width={250} loading='lazy' height={250} src={activeImage} className="w-auto h-auto" alt="" />
        </div>
      </Overlay>

      <div className='grid grid-cols-4 md:grid-cols-3 grid-rows-2 gap-4 mt-9'>
        <div className='col-span-4 md:col-span-2 row-span-2 relative'>
          <Swiper
            modules={[Pagination]}
            spaceBetween={5}
            slidesPerView={4}
            navigation
            pagination={pagination}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {property && property.images.length > 0 && property?.images.map((image, index) => (
              <SwiperSlide key={index} onClick={() => openOverlay(image)}>
                <Image className='h-full w-full object-cover cursor-pointer object-center' width={200} height={200} src={image} alt={`image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button variant='primary-outline' className="group flex sm:hidden z-2 items-center absolute bottom-5 right-4 " onClick={() => setVisible(true)}>
            <ImageIcon className='stroke-main-600 group-hover:stroke-white mr-1 w-4 h-4 transition-colors ease-in-out duration-500' />
            <Typography variant='body-sm-bold' as='span' className="text-black group-hover:text-white transition-colors ease-in-out duration-500">View all photos</Typography>
          </Button>
        </div>
      </div>
    </>
  );
}

export default PropertySlider;
