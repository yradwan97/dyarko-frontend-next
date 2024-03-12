'use client'
import React, { Suspense } from "react";
import Title from "../components/Title";
import companyPlaceholder from "../../../public/assets/companies/company placeholder.png";
import Typography from "../../components/Shared/Typography";
import Image from "next/image";
import { useGetCompanies } from "@/app/companies/ownersApi";
import Link from "next/link"

function FeaturedCompanies() {

  const { data } = useGetCompanies()

  let sortedCompanies = data?.data.sort((a, b) => {
    if (a.image !== null && b.image === null) {
      return -1;
    } else if (a.image === null && b.image !== null) {
      return 1;
    } else {
      return 0;
    }
  }) || []

  let companiesWithImages = sortedCompanies?.filter(d => d.image !== null) || []
  let companyImages = companiesWithImages.length > 0 && companiesWithImages?.map(c => {
    return { src: c.image, name: c.name, id: c._id }
  }) || []
  let i = companyImages.length
  while (i < 8) {
    companyImages.push({ src: companyPlaceholder.src, name: data?.data[i].name, id: data?.data[i]._id })
    i++
  }

  let images = [...companyImages]

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
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {images && images?.map((image, index) => (
              <div className="mx-5 flex flex-col h-full align-text-bottom justify-center rounded-full" key={index}>
                <Link className="flex justify-center" href={`/company-details/${image.id}`}>
                  <Image className="rounded-full" width={100} height={100} src={image?.src} alt="company image" />
                </Link>
                <Typography
                  variant="body-sm"
                  as="p"
                  className="text-center capitalize justify-center"
                >
                  {image?.name}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default FeaturedCompanies;