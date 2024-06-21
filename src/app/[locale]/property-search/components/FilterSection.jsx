'use client'
import React, { useState } from "react";
import Button from "../../components/Shared/Button";
import Typography from "../../components/Shared/Typography";
import SortOutline from "../../components/UI/icons/SortOutline"
import PlusOutline from "../../components/UI/icons/PlusOutline"
import FilterSide from "./FilterSide";
import Select from "../../components/Shared/Form/Select";

function FilterSection({ selectedGov, setSelectedGov, governerates, onApplyFilters }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative w-full lg:w-3/5 mr-4 flex space-x-3 flex-row">
        <Select
          isGov
          containerClass="py-2 px-4 w-full rounded-md !justify-between"
          values={governerates}
          selected={selectedGov}
          setSelected={(e) => setSelectedGov(e)}
        />
        <div onClick={() => setOpen(true)}>
          <SortOutline
            className="block mt-3 h-8 w-8 cursor-pointer stroke-main-600 lg:hidden"
          />
        </div>
      </div>
      <div>
        <Button
          variant="primary"
          className="group hidden items-center lg:flex"
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
      </div>

      {open && <FilterSide setOpen={setOpen} onApplyFilters={onApplyFilters} />}
    </>
  );
}

export default FilterSection;
