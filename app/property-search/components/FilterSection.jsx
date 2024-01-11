'use client'
import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import SearchOutline from "../../components/UI/icons/SearchOutline"
import SortOutline from "../../components/UI/icons/SortOutline"
import PlusOutline from "../../components/UI/icons/PlusOutline"
import FilterSide from "./FilterSide";

function FilterSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative mr-4 flex-grow">
        <input
          type="text"
          className="text-md w-full focus:outline-none rounded-lg border-2  border-main-100 py-3 !pl-12 pr-2 font-medium placeholder-main-secondary"
          placeholder="Search"
        />
        <SearchOutline className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 stroke-main-400" />
      </div>
      <Button
        variant="primary"
        className="group hidden items-center sm:flex"
        onClick={() => setOpen(true)}
      >
        <PlusOutline className="mr-2 h-5 w-5 stroke-white group-hover:stroke-main-600" />
        <Typography
          variant="body-md-bold"
          as="span"
          className="text-inherite group-hover:text-main-600"
        >
          More filters
        </Typography>
      </Button>
      <SortOutline
        className="block h-6 w-6 cursor-pointer stroke-main-600 sm:hidden"
        onClick={() => setOpen(true)}
      />
      {open && <FilterSide setOpen={setOpen} />}
    </>
  );
}

export default FilterSection;
