'use client'
import Header from "../../components/Shared/Header/Header";
import Footer from "../../components/Shared/Footer/Footer";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import BackButton from "../components/BackButton";
import DocumentOutline from "../../components/UI/icons/DocumentOutline";
import HeartOutline from "../../components/UI/icons/HeartOutline"
import HeartSolid from "../../components/UI/icons/HeartSolid"
import LinkIcon from "../../components/UI/icons/LinkIcon";
import SearchOutline from "../../components/UI/icons/SearchOutline"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AboutProperty from "../components/AboutProperty";
import ScheduleTour from "../components/ScheduleTour";
import PropertySlider from "../components/PropertySlider/PropertySlider";
import Loader from "@/app/components/Shared/Loader";
import { getPropertyAddress, getPropertyPeriod, getPropertyPrice } from "@/app/utils/utils";
import { useQuery } from "react-query";
import { capitalizeFirst } from '@/app/utils/utils';
import { axiosClient as axios } from "@/app/services/axiosClient"
import { useIsPropertySaved } from "../../property-listing/propertiesApis"

const baseUrl = process.env.NEXT_PUBLIC_NEXT_APP_API_URI

const PropertyDetails = ({ slug }) => {

  const [ownerId, setOwnerId] = useState("")
  const [property, setProperty] = useState()
  const isLiked = useIsPropertySaved(slug)
  const [liked, setLiked] = useState(isLiked)

  useEffect(() => {
    setLiked(isLiked)
  }, [isLiked])

  useEffect(() => {
    if (property && property?.owner && property?.owner._id) {
      setOwnerId(property.owner._id)
    }
  }, [property])

  const { isLoading, data, refetch } = useQuery(
    ["property-details"],
    async () => await axios.get(`/properties/${slug}`).then(
      (response) => {
        if (response?.data?.success) {
          setOwnerId(response.data.data.owner._id)
          setProperty(response.data.data)
        }
        return response
      }
    )
  )

  useEffect(() => {
    refetch()
  }, [slug])

  const handleLikePressed = async (method) => {
    try {
      let response =
        method === "post" ?
          await axios.post(`/save_properties/${slug}`) :
          await axios.delete(`/save_properties/${slug}`)
      if (response.data.success) {
        setLiked(!liked)
      }
      return response
    } catch (e) {
      console.log(e)
      return
    }
  }

  let [visible, setVisible] = useState(false);

  return (
    <>
      {isLoading && <Loader />}
      <Header />
      <BackButton />

      {property && <div className="container relative pt-11">
        <Typography
          variant="body-xl-bold"
          as="h2"
          className="mt-4 text-[40px] leading-[56px]"
        >
          {capitalizeFirst(property.title)}
        </Typography>
        <div className="mt-4 flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <Typography
            variant="body-xl"
            as="p"
            className="font-medium leading-8 text-gray-500"
          >
            {getPropertyAddress(property)}
          </Typography>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {/* TODO: add share functionality */}
            <Button
              variant="primary-outline"
              className="flex flex-1 items-center justify-center stroke-main-600 leading-6 hover:stroke-white sm:flex-none sm:justify-start"
            >
              <LinkIcon className="stroke-inherit mr-1 h-4 w-4" />
              <span className="">Share</span>
            </Button>
            <Button
              variant="primary-outline"
              onClick={() => handleLikePressed(liked ? "delete" : "post")}
              className="flex flex-1 items-center justify-center stroke-main-600 leading-6 hover:stroke-white sm:flex-none sm:justify-start"
            >
              {liked && <HeartSolid className="fill-red stroke-red w-4 h-4 mr-2" />}
              {!liked && <HeartOutline className="stroke-main-600 w-4 h-4 mr-2" />}

              <span className="">{liked ? "Unfavorite" : "Favorite"}</span>
            </Button>
          </div>
        </div>
        {property !== undefined && <PropertySlider property={property} />}
        {property !== undefined && <AboutProperty property={property} />}
      </div>}

      <Footer />
      {/* {ownerId && <ScheduleTour id={ownerId} visible={visible} setVisible={setVisible} />} */}
    </>
  );
}

export default PropertyDetails;
