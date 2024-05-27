import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import Select from "../../components/Shared/Form/Select";
import Typography from "../../components/Shared/Typography"
import { useSession } from "next-auth/react";
import Button from "@/src/app/[locale]/components/Shared/Button"

const SearchSection = ({
  priceTo,
  setPriceTo,
  bedrooms,
  setBedrooms,
  selectedSort,
  setSelectedSort,
  finalTypes,
  selectedPropertyType,
  setSelectedPropertyType,
  sortingValues
}) => {
  const { data: session } = useSession()

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:space-x-2 lg:grid-cols-4">
        <div className="relative h-[75%] pb-2">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-blue/70 pb-1"
          >
            Price:
          </Typography>
          <input
            type="text"
            className="w-full h-[90%] outline-main-600 outline rounded-md !px-4 text-sm font-medium placeholder-main-secondary"
            placeholder="Any Price"
            value={priceTo}
            onChange={e => setPriceTo(e.target.value)}
          />
          <span className="pointer-events-none absolute top-1/2 right-2 flex h-5 w-5 translate-y-2/3 items-center justify-center rounded-full bg-main-100">
            <ChevronUpDownIcon className="h-5 w-4 text-main-600" />
          </span>
        </div>
        <div className="relative h-[75%] pb-2">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-blue/70 pb-1"
          >
            No. of Beds:
          </Typography>
          <input
            type="text"
            className="w-full h-[90%] outline-main-600 outline rounded-md !px-4 text-sm font-medium placeholder-main-secondary"
            placeholder="2-4 Beds"
            value={bedrooms}
            onChange={e => setBedrooms(e.target.value)}
          />
          <span className="pointer-events-none absolute top-1/2 right-2 flex h-5 w-5 translate-y-2/3 items-center justify-center rounded-full bg-main-100">
            <ChevronUpDownIcon className="h-5 w-4 text-main-600" />
          </span>
        </div>
        {session && <div className="relative h-[75%] pb-2">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-blue/70 pb-1"
          >
            Type:
          </Typography>
          <Select
            iconStyle="!right-4"
            containerClass="py-3 px-4 w-full outline-main-600 outline rounded-md !justify-between"
            values={finalTypes || []}
            selected={selectedPropertyType}
            setSelected={e => setSelectedPropertyType(e)}
          />
        </div>}
        <div className="relative  ">
          <Typography
            variant="body-md-medium"
            as="p"
            className="text-main-blue/70 pb-1"
          >
            Sort by:
          </Typography>
          <Select
            iconStyle="!right-4"
            containerClass="py-3 px-4 w-full outline-main-600 outline rounded-md !justify-between"
            values={sortingValues}
            selected={selectedSort}
            setSelected={setSelectedSort}
          />
        </div>

      </div>
    </>
  );
}

export default SearchSection;
