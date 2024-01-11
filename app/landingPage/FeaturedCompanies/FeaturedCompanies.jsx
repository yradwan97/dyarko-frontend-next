'use client'
import React from "react";
import Title from "../components/Title";
import company1 from "../../../public/assets/companies/company1.png";
import company2 from "../../../public/assets/companies/company2.png";
import company3 from "../../../public/assets/companies/company3.png";
import company4 from "../../../public/assets/companies/company4.png";
import company5 from "../../../public/assets/companies/company5.png";
import company6 from "../../../public/assets/companies/company6.png";
import company7 from "../../../public/assets/companies/company7.png";
import Typography from "../../components/Shared/Typography";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useGetCompanies } from "@/app/companies/ownersApi";
import Link from "next/link"

function FeaturedCompanies() {
  const { data } = useGetCompanies()
  const staticImages = [company1, company2, company3, company4, company5, company6, company7]
  let companiesWithImages = data?.data?.filter(d => d.image !== null) || []
  let companyImages = companiesWithImages.length > 0 && companiesWithImages?.map(c => {
    return { src: c.image, name: c.name, id: c._id }
  }) || []

  let testImages = []
  let i = 0
  while (i < 7) {
    testImages.push(companyImages[0])
    i++
  }


  staticImages.length = 7 - companyImages?.length || 7
  let finalStaticImages = staticImages.map(s => {
    return {
      src: s.src,
      name: "Real Estate Company"
    }
  })

  let images = [...companyImages, ...finalStaticImages]
  return (
    <div className="bg-main-100 py-20 ">
      <div className="px-[1rem] md:px-[86px]">
        <div className="flex flex-col items-center space-y-4 text-center">
          <Title
            type="main"
            head="Featured Companies"
            desc="We are working with 100+ companies from whome you can get your desired property."
          />
        </div>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          className="mt-[72px] flex flex-row items-center justify-between space-x-3"
        >
          {images && images.map((image, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col align-middle items-center">
                  <div className=" rounded-[50%] inline-block" style={{ width: '100px', height: '100px' }}>
                    {
                      image?.id ?
                        <Link href={`/company-details/${image.id}`}>
                          <Image className="rounded-[50%] max-w-[90px] max-h-[90px]" width={100} height={100} src={image?.src} alt="company image" />
                        </Link>
                        :
                        <Image className="rounded-[50%] max-w-[90px] max-h-[90px]" width={100} height={100} src={image?.src} alt="company image" />
                    }
                  </div>
                  <Typography
                    variant="body-sm-medium"
                    as="p"
                    className="text-center justify-between leading-[19px]"
                  >
                    {image?.name}
                  </Typography>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default FeaturedCompanies;
