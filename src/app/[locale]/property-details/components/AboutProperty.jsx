import React from 'react'
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import BathSolid from "../../components/UI/icons/BathSolid"
import BedSolid from "../../components/UI/icons/BedSolid"
import CheckCircleIcon from "../../components/UI/icons/CheckCircleIcon"
import SquareOutline from "../../components/UI/icons/SquareOutline"
import HelpIcon from "../../components/UI/icons/HelpIcon"
import PaperClipIcon from "../../components/UI/icons/PaperClipIcon"
import profile from '../../../../../public/assets/profile.png'
import FeatureComponent from './FeatureComponent'
import AmenetiesComponent from './AmenetiesComponent'
import InteriorDetails from './InteriorDetails'
import Location from './Location'
import ReservationBox from './ReservationBox'
import XCircleIcon from '../../components/UI/icons/XCirlceIcon';
import { capitalizeFirst } from '@/src/app/[locale]/utils/utils';
import Image from 'next/image';
import ServicesComponent from "./ServicesComponent"
import Link from "next/link"
import TentInformation from './TentInformation';
import { useLocale, useTranslations } from 'next-intl';
import UnitPricing from './UnitPricing';

function AboutProperty({ property }) {
   const { _id: ownerId, name: ownerName, image: ownerImage } = property?.owner
   const tListing = useTranslations('Properties.Listing')
   const t = useTranslations("Properties.Details")
   const locale = useLocale()
   const { long, lat, amenities, services, category, tents_info } = property
   return (
      <div className='grid grid-cols-3 gap-4 mt-9 '>
         <div className={`col-span-3 lg:col-span-2 order-2 ${locale === "ar" ? "lg:order-2" : "lg:order-1"}`}>
            <div className={`border-[1.5px] border-gray-200 rounded-md p-6 flex ${locale === "ar" ? "flex-row-reverse" : "flex-row"} flex-wrap -tracking-[0.005em] gap-x-2 md:gap-x-6 gap-y-6 lg:!gap-10`}>
               {property?.bedrooms && <div className='w-3/12 sm:w-auto'>
                  <Typography variant='body-md-medium' as="p" className="text-main-secondary">{tListing("beds")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     <BedSolid className='fill-main-secondary w-6 h-6' />
                     <Typography variant='body-lg-bold' as="p">{property.bedrooms}</Typography>
                  </div>
               </div>}
               {property?.bathrooms && <div className='w-3/12 sm:w-auto'>
                  <Typography variant='body-md-medium' as="p" className="text-main-secondary">{tListing("baths")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     <BathSolid className='fill-main-secondary w-6 h-6' />
                     <Typography variant='body-lg-bold' as="p">{property.bathrooms}</Typography>
                  </div>
               </div>}
               {property?.area && <div className='w-4/12 sm:w-auto'>
                  <Typography variant='body-md-medium' as="p" className="text-main-secondary">{t("area")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     <SquareOutline className='stroke-main-secondary w-6 h-6' />
                     <Typography variant='body-lg-bold' className={`flex ${locale === "en" ? "flex-row" : "flex-row-reverse"}`} as="p">
                        <>{property.area}</>
                        <span>
                           {t.rich("area-unit-1", {
                              sup: (chunks) => <sup>{chunks}</sup>
                           })}
                        </span>
                     </Typography>
                  </div>
               </div>}
               <div>
                  <Typography variant='body-md-medium' as="p" className=" text-main-secondary">{t("status")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     {property.is_active
                        ? <CheckCircleIcon className='stroke-main-secondary w-6 h-6' />
                        : <XCircleIcon className='stroke-main-secondary w-6 h-6' />}
                     <Typography variant='body-lg-bold' as="p">{property.is_active ? t("active") : t("inactive")}</Typography>
                  </div>
               </div>
               <div>
                  <Typography variant='body-md-medium' as="p" className=" text-main-secondary">{t("is-finished")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     {property.is_finished
                        ? <CheckCircleIcon className='stroke-main-secondary w-6 h-6' />
                        : <XCircleIcon className='stroke-main-secondary w-6 h-6' />}
                     <Typography variant='body-lg-bold' as="p">{property.is_finished ? t("finished") : t("not-finished")}</Typography>
                  </div>
               </div>
               {property?.is_finished && <div className='w-3/12 sm:w-auto'>
                  <Typography variant='body-md-medium' as="p" className="text-main-secondary">{t("finishing")}</Typography>
                  <div className='flex items-center space-x-2 mt-5'>
                     <Typography className='capitalize' variant='body-lg-bold' as="p">{property?.finish_type}</Typography>
                  </div>
               </div>}

            </div>
            {property?.description && <div className='mt-12 flex flex-col space-y-4'>
               <Typography variant='h4' as='h4' className>{t("about-this")} {locale === "en" && capitalizeFirst(property.category)}</Typography>
               <Typography variant='body-md-medium' as='p' className='text-gray-500 line-clamp-3 md:line-clamp-none overflow-hidden'>
                  {property.description}
               </Typography>
            </div>}

            {property?.contract && <Link href={property?.contract} legacyBehavior passHref>
               <a target='_blank' href={property?.contract} rel='noopener noreferrer'>
                  <div className='mt-4 sm:flex space-x-4 items-center flex flex-row'>
                     <div className='w-11 h-11 bg-gray-100 flex flex-row justify-center items-center rounded-2xl'>
                        <PaperClipIcon className='w-6 h-6 stroke-[#6D5DD3]' />
                     </div>
                     <Typography variant='body-md-bold' as="p" className="text-gray-800">{t("documents")}</Typography>
                  </div>
               </a>
            </Link>}
            <div className='pb-12 border-b border-gray-200'>
               <div className='sm:bg-main-100 border-[1.5px] border-main-200 rounded-md p-6 mt-8 '>
                  <Typography variant='body-md-medium' as="p" className="text-main-secondary text-center">{t("listed-by")}</Typography>
                  <div className={`flex flex-col ${locale === "ar" ? "sm:flex-row-reverse" : "sm:flex-row"} gap-4 justify-between items-start sm:items-center mt-6`}>
                     <div className={`flex ${locale === "ar" ? "flex-row-reverse" : "flex-row"} items-center`}>
                        <Image className='w-12 h-12 mx-4' width={150} height={150} src={ownerImage ? ownerImage : profile} alt='' />
                        <Typography variant='body-lg-bold' className='capitalize' as="p">{ownerName || "Company Name"}</Typography>
                     </div>
                     <Button variant='primary-outline'
                        className="stroke-main-600 hover:stroke-white w-full sm:w-auto flex justify-center items-center leading-6"
                        to={`/company-details/${ownerId}`}>
                        <HelpIcon className='stroke-inherit mr-1 w-4 h-4' />
                        {t("more-info")}
                     </Button>

                  </div>
               </div>
            </div>
            <FeatureComponent property={property} />
            <UnitPricing property={property} />
            {category && category === "tent_group" && tents_info?.length > 0 && <TentInformation tents={tents_info} />}
            {amenities && amenities.length > 0 && <AmenetiesComponent amenities={amenities} />}
            {services && services.length > 0 && <ServicesComponent services={services} />}
            {property?.interior_design !== null && <InteriorDetails url={property?.interior_design} />}
            <Location coords={{ long, lat }} />
         </div>
         <div className={`col-span-3 lg:col-span-1 order-1 ${locale === "ar" ? "lg:order-1" : "lg:order-2"}`}>
            <ReservationBox property={property} />
         </div>
      </div>
   )
}

export default AboutProperty