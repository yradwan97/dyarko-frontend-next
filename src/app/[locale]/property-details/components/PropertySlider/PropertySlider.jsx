import React, { useState } from 'react';
import Image from 'next/image';
import CloseOutline from '../../../components/UI/icons/CloseOutline';
import Overlay from '../Overlay';
import Slider from "react-slick";
import { Flex, Box } from "@chakra-ui/react"

function PropertySlider({ property }) {
  const [visible, setVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  const openOverlay = (image) => {
    console.log(image)
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

      <Flex flexWrap="wrap" className='overflow-hidden' mt={10}>
        <Box
          height="350px"
          borderRadius={4}
          border="1px solid"
          borderColor="main.600"
          padding={3}
          pe={{ base: 0, md: 6 }}
          width="50%"
          mb={{ base: 4, md: 0 }}
        >
          <Image
            src={property?.image}
            height={400}
            width={380}
            className='object-cover w-full h-full'
          />
        </Box>
        {(property?.images && property.images.length > 1) && (
          <Box width="200px">
            <Slider
              dots={false}
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToScroll={1}
              slidesToShow={2}
              autoplaySpeed={3000}
              vertical
            >
              {property?.images.map((img, index) => (
                <Box
                  onClick={() => openOverlay(img)}
                  p={3}
                  height="172px"
                  borderRadius={4}
                  key={index}
                  marginLeft={3}
                  width="200px"
                  border="1px solid"
                  borderColor="main.600"
                >
                  <Image
                    src={img}
                    height={100}
                    width={200}
                    className='object-cover h-full'
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        )}
      </Flex>
    </>

  );
}

export default PropertySlider;
