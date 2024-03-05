import React, { useState } from 'react';
import Image from 'next/image';
import CloseOutline from '../../../components/UI/icons/CloseOutline';
import Overlay from '../Overlay';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

      <div className='flex flex-col md:flex-row mt-2'>
        <div className='h-1/2 lg:h-full'>
          <Image src={property?.image} width={400} height={400} alt='Main Image' />
        </div>
        <div className='h-1/2 lg:h-auto mt-2 md:mt-0 md:ml-2'>
          <Carousel
            autoPlay
            interval={2000}
            axis='vertical'
            infiniteLoop
            showArrows={false}
            showStatus={false}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              const defStyle = {
                marginLeft: 20,
                cursor: "pointer",
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: isSelected ? "black" : "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
                border: "1px solid black",
              };

              return (
                <span
                  style={defStyle}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  aria-label={`${label} ${index + 1}`}
                />
              );
            }}
          >
            {property?.images && property?.images.length > 0 && property.images.map((image, index) => (
              <div key={index} className='cursor-pointer' onClick={() => openOverlay(image)}>
                <Image
                  src={image}
                  width={370}
                  height={370}
                  alt={`property-pic ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>

  );
}

export default PropertySlider;
