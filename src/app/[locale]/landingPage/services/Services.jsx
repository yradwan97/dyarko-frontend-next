import React from "react";
import service from "../../../../../public/assets/service.png";
import BestPriceSolid from "../../components/UI/icons/BestPriceSolid"
import LocationControlSolid from "../../components/UI/icons/LocationControlSolid"
import PropertyCommisionSolid from "../../components/UI/icons/PropertyCommisionSolid"
import PropertyInsuranceSolid from "../../components/UI/icons/PropertyInsuranceSolid"
import CircleIcon from "../../components/UI/icons/CircleIcon";
import FixedLock from "../../components/UI/icons/serviceIcons/FixedLock";
import FixedPercentage from "../../components/UI/icons/serviceIcons/FixedPercentage";
import FixedDollarSign from "../../components/UI/icons/serviceIcons/FixedDollarSign";
import FixedHouse from "../../components/UI/icons/serviceIcons/FixedHouse";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Services() {
  const t = useTranslations("HomePage.Services")
  return (
    <div className="container relative justify-between bg-gradient-to-b  from-main-100 to-white py-20 md:bg-none lg:flex lg:space-x-16">
      <div className="md:relative lg:w-5/12">
        <Image
          src={service}
          loading="lazy"
          className="absolute inset-0 z-1 hidden h-full lg:block"
          alt=""
        />
        <div className="relative z-2 flex flex-col space-y-4 md:p-10">
          <Typography
            variant="h3"
            as="h3"
            className={`mb-2 whitespace-pre-wrap text-start font-bold text-black`}
          >
            {t("main")}
          </Typography>
          <Typography
            variant="body-md-medium"
            as="p"
            className={`!mb-12 whitespace-pre-wrap text-start leading-6 text-gray-600 lg:!mb-0 lg:w-4/5`}
          >
            {t("sub")}
          </Typography>
          <Button
            variant="primary"
            to="/property-search"
            className="hidden w-fit px-4 !py-2 lg:block"
          >
            {t("browse")}
          </Button>
        </div>
      </div>
      <div className="w-full lg:w-7/12">
        <div className="rid-cols-1 grid gap-y-10 gap-x-5 sm:grid-cols-2">
          <div className="flex flex-row items-center gap-x-6 text-center sm:items-start sm:text-start md:flex-col">
            <CircleIcon
              icon={<PropertyInsuranceSolid className="h-8 w-8 fill-white" />}
              serviceIcon={<FixedLock className="h-3.5 w-3.5" />}
            />
            <div className="flex flex-col gap-y-3 md:mt-6">
              <Typography
                variant="h4"
                as="h4"
                className="!text-xl tracking-tight text-black"
              >
                {t("Insurance.title")}
              </Typography>
              <Typography
                variant="body-sm"
                as="p"
                className="hidden leading-6 text-gray-600 md:block "
              >
                {t("Insurance.description")}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-6 text-center sm:items-start  sm:text-start md:flex-col">
            <CircleIcon
              icon={<BestPriceSolid className="h-8 w-8 fill-white" />}
              serviceIcon={<FixedPercentage className="h-3.5 w-3.5" />}
            />
            <div className="flex flex-col gap-y-3 md:mt-6">
              <Typography
                variant="h4"
                as="h4"
                className="!text-xl tracking-tight text-black"
              >
                {t("Price.title")}
              </Typography>
              <Typography
                variant="body-sm"
                as="p"
                className="hidden leading-6 text-gray-600 md:block "
              >
                {t("Price.description")}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-6 text-center sm:items-start  sm:text-start md:flex-col">
            <CircleIcon
              icon={
                <PropertyCommisionSolid className="h-8 w-8 fill-white stroke-white" />
              }
              serviceIcon={<FixedDollarSign className="h-3.5 w-3.5" />}
            />
            <div className="flex flex-col gap-y-3 md:mt-6">
              <Typography
                variant="h4"
                as="h4"
                className="!text-xl tracking-tight text-black"
              >
                {t("Commission.title")}
              </Typography>
              <Typography
                variant="body-sm"
                as="p"
                className="hidden leading-6 text-gray-600 md:block "
              >
                {t("Commission.description")}
              </Typography>
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-6 text-center sm:items-start  sm:text-start md:flex-col">
            <CircleIcon
              icon={
                <LocationControlSolid className="h-8 w-8 fill-white stroke-white" />
              }
              serviceIcon={<FixedHouse className="h-3.5 w-3.5" />}
            />
            <div className="flex flex-col gap-y-3 md:mt-6">
              <Typography
                variant="h4"
                as="h4"
                className="!text-xl tracking-tight text-black"
              >
                {t("Control.title")}
              </Typography>
              <Typography
                variant="body-sm"
                as="p"
                className="hidden leading-6 text-gray-600 md:block "
              >
                {t("Control.description")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
