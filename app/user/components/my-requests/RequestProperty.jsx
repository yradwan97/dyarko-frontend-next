import propertyOne from "../../../../public/assets/property-1.png";
import Typography from "../../../components/Shared/Typography"
import BathSolid from "../../../components/UI/icons/BathSolid"
import BedSolid from "../../../components/UI/icons/BedSolid"
import SquareOutline from "../../../components/UI/icons/SquareOutline"
import Image from "next/image"
import AddWishlist from "../../../landingPage/properties/AddWishList";
import Price from "../../../landingPage/properties/Price";
import TopBadge from "../../../landingPage/properties/TopBadge";
import Link from "next/link";
import RequestBadge from "./RequestBadge";
import { capitalizeFirst, getPropertyPeriod, getPropertyPrice } from "@/app/utils/utils";

function RequestProperty({ badge, property }) {

  return (
    <div
      className={`relative flex flex-col rounded-lg border border-main-200 p-1 md:flex-row`}
    >
      {badge === "pending" ? (
        <RequestBadge text="pending" bgColor="bg-main-orange-600" />
      ) : badge === "approved" ? (
        <RequestBadge text="approved" bgColor="bg-main-600" />
      ) : (
        <RequestBadge text="visited" bgColor="bg-main-yellow-600" />
      )}
      <div className="relative">
        {property?.payment_type === "rent" && <TopBadge />}
        <Link href={`/property-details/${property?._id}`}>
          <Image
            src={property?.image || propertyOne}
            alt="property"
            className="h-[200px] w-full rounded-lg md:w-[200px]"
            width={150}
            height={150}
          />
        </Link>
      </div>
      <div className="flex-grow bg-white p-4">
        <div className="flex items-center justify-between">
          <Price paymentType={property?.payment_type} price={getPropertyPrice(property)} period={getPropertyPeriod(property)} />
          <AddWishlist property={property} id={property?._id} />
        </div>
        <Typography variant="h4" as="h4" className="mt-1">
          {capitalizeFirst(property?.title)}
        </Typography>
        <Typography
          variant="body-sm-medium"
          as="p"
          className="my-2 text-gray-500"
        >
          {property?.locations.join(", ")}
        </Typography>
        <div className="mt-5 mb-4 flex items-center justify-between space-x-4 border-t border-main-100 pt-3 md:justify-start">
          <div className="flex items-end justify-between space-x-2">
            <BedSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.bedrooms || 0} Beds
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2 py-2">
            <BathSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.bathrooms || 0} Bathrooms
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2">
            <SquareOutline className="h-4 w-4 stroke-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              {property?.area || 0} m²
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestProperty;
