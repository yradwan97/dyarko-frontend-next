import propertyOne from "../../../public/assets/property-1.png";
import Typography from "../../components/Shared/Typography";
import BathSolid from "../../components/UI/icons/BathSolid";
import BedSolid from "../../components/UI/icons/BedSolid";
import SquareOutline from "../../components/UI/icons/SquareOutline"
import Link from "next/link";
import Image from "next/image";
import AddWishlist from "./AddWishList";
import PopularBadge from "./PopularBadge";
import Price from "./Price";
import TopBadge from "./TopBadge";
import { getPropertyAddress, getPropertyPeriod, getPropertyPrice } from "../../utils/utils"

const SingleProperty = ({ property, className, location, listView, onTriggerRefetch }) => {
  // console.log(property)
  return (
    <Link href={`/property-details/${property?._id}`}>
      <div className={`flex-1 hover:border-main-600 ${className || ""}`}>
        <div className={`relative ${listView && "w-1/2"}`}>
          {property?.payment_type === "rent" && <TopBadge />}
          {property?.popular && <PopularBadge />}
          <Image
            src={property?.image || propertyOne}
            alt="property"
            className={` w-full ${listView ? "h-full rounded-l-lg" : "h-44 rounded-t-lg sm:h-32"
              } `}
            width={250}
            height={250}
            priority
          />
        </div>
        <div
          className={`bg-white  ${listView
            ? "w-1/2 rounded-r-lg border-0 p-4 sm:p-6"
            : "border border-main-100 py-8 px-6"
            }`}
        >
          <div className="flex items-center justify-between">
            {property?.payment_type === ("rent" || "installment") &&
              <Price
                paymentType={property?.payment_type}
                price={getPropertyPrice(property)}
                period={getPropertyPeriod(property)}
              />
            }
            <AddWishlist location={location} id={property?._id} onTriggerRefetch={onTriggerRefetch} />
          </div>

          <Typography variant="h4" as="h4" className="mt-1">
            {property?.title}
          </Typography>

          <Typography
            variant="body-sm-medium"
            as="p"
            className="my-2 text-gray-500"
          >
            {property && getPropertyAddress(property)}
          </Typography>
          <div className="mt-5 flex items-center justify-between border-t border-main-100 pt-3">
            <div className="flex items-end justify-between space-x-2 mx-2">
              {property?.bedrooms &&
                <>
                  <BedSolid className="h-4 w-4 fill-main-600" />
                  <Typography
                    variant="body-xs-medium"
                    as="p"
                    className="text-gray-500"
                  >
                    {property?.bedrooms || 5} {location !== "search" ? "Bed" : ""}
                  </Typography>
                </>
              }
            </div>
            <div className="flex items-end justify-between space-x-2 mx-2">
              {property?.bathrooms &&
                <>
                  <BathSolid className="h-4 w-4 fill-main-600" />
                  <Typography
                    variant="body-xs-medium"
                    as="p"
                    className="text-gray-500 "
                  >
                    {property?.bathrooms} {location !== "search" ? "Bath" : ""}
                  </Typography>
                </>
              }
            </div>
            <div className="flex items-end justify-stretch space-x-2 mx-2">
              {property?.area &&
                <>
                  <SquareOutline className="h-4 w-4 stroke-main-600" />
                  <Typography
                    variant="body-xs-medium"
                    as="p"
                    className="text-gray-500 "
                  >
                    {property?.area || 100} m²
                  </Typography>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleProperty;
