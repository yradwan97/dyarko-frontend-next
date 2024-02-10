import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import CloseOutline from '../../../components/UI/icons/CloseOutline';
import Overlay from '../Overlay';
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import './style.css'


function PropertySlider({ property }) {
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const openOverlay = (image) => {
    setActiveImage(image);
    setVisible(true);
  };

  return (
    <>
      <Overlay visible={visible} setVisible={setVisible}>
        <div style={{ position: 'relative', width: '80%', height: '80%' }}>
          <div className='absolute top-6 right-6 z-999 cursor-pointer' onClick={() => setVisible(false)}>
            <CloseOutline className=' stroke-white w-5 h-5' />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Image width={450} height={450} src={activeImage} className="w-full h-full" alt="" />
          </div>
        </div>
      </Overlay>

      <div className='flex flex-col md:flex-row mt-2 lg:h-[270px] h-[500px]'>
        <div className='h-full'>
          <Image src={property?.image} width={350} height={350} alt='Main Image' />
        </div>
        <div className='max-h-72 sm:mt-2 md:ml-2 -translate-x-[70px] md:-translate-x-6 md:mt-0 lg:h-full' >
          <Swiper
            direction={'vertical'}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            style={{ height: "85%" }}
          >
            {property?.images && property?.images.length > 0 && property.images.map((image, index) => (
              <SwiperSlide key={index} onClick={() => openOverlay(image)}>
                <Image className='cursor-pointer object-cover object-center' width={300} height={300} src={image} alt={`Image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>

  );
}

export default PropertySlider;
