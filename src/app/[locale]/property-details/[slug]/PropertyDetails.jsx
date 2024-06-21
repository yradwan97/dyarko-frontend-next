'use client'
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import BackButton from "../components/BackButton";
import HeartOutline from "../../components/UI/icons/HeartOutline"
import HeartSolid from "../../components/UI/icons/HeartSolid"
import LinkIcon from "../../components/UI/icons/LinkIcon";
import { useEffect, useState } from "react";
import AboutProperty from "../components/AboutProperty";
import PropertySlider from "../components/PropertySlider/PropertySlider";
import Loader from "@/src/app/[locale]/components/Shared/Loader";
import { getPropertyAddress } from "@/src/app/[locale]/utils/utils";
import { useQuery } from "react-query";
import { capitalizeFirst } from '@/src/app/[locale]/utils/utils';
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import { createPropertyView, useGetSingleProperty, useIsPropertySaved } from "../../property-listing/propertiesApis"
import { toast } from "react-toastify"
import { useLocale, useTranslations } from "next-intl";

const PropertyDetails = ({ slug }) => {

  const [property, setProperty] = useState(null)
  const isLiked = useIsPropertySaved(slug)
  const [liked, setLiked] = useState(isLiked)
  const t = useTranslations("Properties.Details")
  const locale = useLocale()

  useEffect(() => {
    setLiked(isLiked)
  }, [isLiked])


  const { isLoading, data, refetch } = useGetSingleProperty(slug)

  useEffect(() => {
    if (data?.data?.success) {
      setProperty(data.data.data)
    }
  }, [data])

  useEffect(() => {
    if (property) {
      createPropertyView(slug)
    }
  }, [property])

  useEffect(() => {
    refetch()
  }, [slug, refetch])

  const handleShareClicked = (e) => {

    e.preventDefault()

    const textToCopy = window?.location.href

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast.success(t("Share.success"))
      })
      .catch(err => {
        console.error('Could not copy URL: ', err);
        toast.error(t("Share.error"));
      });
  }

  const handleLikePressed = async (method) => {
    try {
      let response =
        method === "post" ?
          await axios.post(`/save_properties/${slug}`) :
          await axios.delete(`/save_properties/${slug}`)
      if (response.data.success) {
        setLiked(!liked)
        if (liked) {
          toast.error(t("Save.unsaved"))
        } else {
          toast.success(t("Save.saved"))
        }
      }
      return response
    } catch (e) {
      console.error(e)
      return
    }
  }

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <BackButton />

      {property && <div className="container relative pt-11">
        <Typography
          variant="body-xl-bold"
          as="h2"
          className={`mt-4 text-[40px] capitalize leading-[56px] ${locale === "ar" && "text-end"}`}
        >
          {property.title}
        </Typography>
        <div className={`mt-4 flex flex-col space-y-4 ${locale === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"} lg:items-center lg:justify-between lg:space-y-0`}>
          <Typography
            variant="body-xl"
            as="p"
            className="font-medium leading-8 text-gray-500"
          >
            {getPropertyAddress(property)}
          </Typography>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <Button
              variant="primary-outline"
              onClick={handleShareClicked}
              className="flex flex-1 items-center justify-center stroke-main-600 leading-6 hover:stroke-white sm:flex-none sm:justify-start"
            >
              <LinkIcon className="stroke-inherit mr-1 h-4 w-4" />
              <span className="">{t("Share.title")}</span>
            </Button>
            <Button
              variant="primary-outline"
              onClick={() => handleLikePressed(liked ? "delete" : "post")}
              className="flex flex-1 items-center justify-center stroke-main-600 leading-6 hover:stroke-white sm:flex-none sm:justify-start"
            >
              {liked ?
                <HeartSolid className="fill-red stroke-red w-4 h-4 mr-2" />
                :
                <HeartOutline className="stroke-main-600 fill-white w-4 h-4 mr-2" />
              }

              <span className="">{liked ? t("Save.unfavorite") : t("Save.favorite")}</span>
            </Button>
          </div>
        </div>
        {(property !== undefined && property?.image) && <PropertySlider property={property} />}
        {property !== undefined && <AboutProperty property={property} />}
      </div >}

      <Footer />
    </>
  );
}

export default PropertyDetails;
