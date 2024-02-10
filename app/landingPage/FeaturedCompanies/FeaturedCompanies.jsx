'use client'
import React, { Suspense } from "react";
import Flickity from "react-flickity-component"
import Title from "../components/Title";
import company1 from "../../../public/assets/companies/company1.png";
import company2 from "../../../public/assets/companies/company2.png";
import company3 from "../../../public/assets/companies/company3.png";
import company4 from "../../../public/assets/companies/company4.png";
import company5 from "../../../public/assets/companies/company5.png";
import company6 from "../../../public/assets/companies/company6.png";
import company7 from "../../../public/assets/companies/company7.png";
import Typography from "../../components/Shared/Typography";
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

  const flickityOptions = {
    initialIndex: 3,
    pageDots: false,
    prevNextButtons: true,
    adaptiveHeight: true,
    contain: true,
    arrowShape: {
      x0: 10,
      x1: 60,
      y1: 50,
      x2: 70,
      y2: 45,
      x3: 20,
    }
  }
  return (
    <Suspense>
      <div className="bg-main-100 py-20 ">
        <div className="px-[1rem] md:px-[86px]">
          <div className="flex flex-col mb-3 items-center space-y-4 text-center">
            <Title
              type="main"
              head="Featured Companies"
              desc="We are working with 100+ companies from whome you can get your desired property."
            />
          </div>
          <Flickity
            className="z-[9999]"
            options={flickityOptions}

          >
            {images && images?.map((image, index) => (
              <div className="mx-3" key={index}>
                {
                  image?.id ?
                    <Link href={`/company-details/${image.id}`}>
                      <Image className="rounded-[50%] max-w-[90px] max-h-[90px]" width={100} height={100} src={image?.src} alt="company image" />
                    </Link>
                    :
                    <Image className="rounded-[50%] max-w-[90px] max-h-[90px]" width={100} height={100} src={image?.src} alt="company image" />
                }

                <Typography
                  variant="body-sm"
                  as="p"
                  className="text-center capitalize justify-center leading-[19px]"
                >
                  {image?.name}
                </Typography>
              </div>
            ))}
          </Flickity>
        </div>
      </div>
    </Suspense>
  );
}

export default FeaturedCompanies;