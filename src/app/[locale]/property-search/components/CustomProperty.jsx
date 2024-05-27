import Image from "next/image";
import propertyOne from "../../../../../public/assets/property-1.png"
import Typography from "../../components/Shared/Typography";

import BathSolid from "../../components/UI/icons/BathSolid"
import BedSolid from "../../components/UI/icons/BedSolid"
import SquareOutline from "../../components/UI/icons/SquareOutline"

import AddWishlist from "../../landingPage/properties/AddWishList";
import PopularBadge from "../../landingPage/properties/PopularBadge";
import TopBadge from "../../landingPage/properties/TopBadge";

function CustomProperty(props) {
  return (
    <div className={` ${props.className}`}>
      <div className={`relative ${props.listView && "w-1/2"}`}>
        <TopBadge />
        {props.popular && <PopularBadge />}
        <Image
          priority
          src={propertyOne}
          alt="property"
          className={` w-full ${props.listView ? "h-full rounded-l-lg" : "h-44 rounded-t-lg sm:h-32"
            } `}
        />
      </div>
      <div
        className={`bg-white  ${props.listView
          ? "w-1/2 rounded-r-lg border-0 p-4 sm:p-6"
          : "border border-main-100 py-8 px-6"
          }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-end">
            <Typography
              variant="body-lg-bold"
              as="p"
              className="tracking-tightest text-main-yellow-600"
            >
              $1,600
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="text-gray-400"
            >
              /month
            </Typography>
          </div>
          <AddWishlist />
        </div>
        <Typography
          variant="h4"
          as="h4"
          className="mt-1 w-full overflow-hidden text-ellipsis whitespace-nowrap"
        >
          House with pool
        </Typography>
        <Typography
          variant="body-xs-medium"
          as="p"
          className="my-2 text-gray-500"
        >
          13086 Safat, Kuwait City
        </Typography>
        <div className="mt-5 flex items-center justify-between border-t border-main-100 pt-3">
          <div className="flex items-end justify-between space-x-2">
            <BedSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              3
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2 py-2">
            <BathSolid className="h-4 w-4 fill-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              3
            </Typography>
          </div>
          <div className="flex items-end justify-between space-x-2">
            <SquareOutline className="h-4 w-4 stroke-main-600" />
            <Typography
              variant="body-xs-medium"
              as="p"
              className="text-gray-500 "
            >
              5x7 m²
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomProperty;
