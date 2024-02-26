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
            <Image width={450} height={450} src={activeImage} className="w-full h-1/2 md:h-2/3 lg:h-full" alt="" />
          </div>
        </div>
      </Overlay>

      <div className='flex flex-col md:flex-row mt-2 md:h-[270px] h-[500px]'>
        <div className='h-3/4'>
          <Image src={property?.image} width={180} height={180} alt='Main Image' />
        </div>
        <div className='relative max-h-[16rem] mt-2 md:mt-0 md:ml-2' >
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
            style={{ height: "85%", width: "100%" }}
          >
            {property?.images && property?.images.length > 0 && property.images.map((image, index) => (
              <SwiperSlide key={index} onClick={() => openOverlay(image)}>
                <Image className='cursor-pointer object-cover object-center' width={350} height={350} src={image} alt={`Image ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>

  );
}

export default PropertySlider;
