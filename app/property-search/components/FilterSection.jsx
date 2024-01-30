'use client'
import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import SearchOutline from "../../components/UI/icons/SearchOutline"
import SortOutline from "../../components/UI/icons/SortOutline"
import PlusOutline from "../../components/UI/icons/PlusOutline"
import FilterSide from "./FilterSide";
import Select from "../../components/Shared/Form/Select";



function FilterSection({ selectedGov, setSelectedGov, governerates }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative mr-4 flex-grow">
        <Select
          containerClass="py-2 px-6 w-full rounded-lg !justify-between"
          values={governerates}
          selected={selectedGov}
          setSelected={(e) => setSelectedGov(e)}
        />

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
