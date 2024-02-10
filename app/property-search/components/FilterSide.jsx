'use client'
import React, { useEffect, useState } from "react";
import Line from "./Line";
import CloseOutline from "../../components/UI/icons/CloseOutline";
import RangeInput from "../../components/UI/RangeInput";
import Typography from "../../components/Shared/Typography";
import Button from "../../components/Shared/Button";
import rangeImg from "../../../public/assets/Range.png";
import Feature from "./Feature";
import RentalPeriod from "./RentalPeriod";
import Image from "next/image";

const paymentTypeToPriceRangeMap = {
  "rent": [10, 5000],
  "installment": [200, 1000000]
}

function FilterSide({ setOpen, onApplyFilters }) {

  const [activeCategory, setActiveCategory] = useState("rent");
  const [bathrooms, setBathrooms] = useState(2)
  const [bedrooms, setBedrooms] = useState(4)
  const [value, setValue] = useState(paymentTypeToPriceRangeMap[activeCategory]);

  useEffect(() => {
    setValue(paymentTypeToPriceRangeMap[activeCategory])
  }, [activeCategory])

  return (
    <div className="fixed inset-0 z-999 flex h-screen justify-end bg-black/20">
      <button
        className="fixed top-2 right-4 z-2"
        onClick={() => setOpen(false)}
      >
        <CloseOutline className="h-9 w-9 stroke-black " />
      </button>
      <div
        className="relative -right-[423px] h-full w-[423px] animate-swapRight overflow-y-scroll bg-white px-12 py-8 text-start"
        style={{ animationFillMode: "both" }}
      >
        <Typography variant="h4" as="h4" className="mb-8 text-black">
          More Filters
        </Typography>
        <Typography variant="body-md-bold" className="mb-3 text-black" as="p">
          Category
        </Typography>
        <ul className="flex flex-row space-x-3">
          <li
            className={`cursor-pointer rounded-lg border px-5 py-2.5 text-sm ${activeCategory === "rent"
              ? "border-main-yellow-600 bg-main-yellow-600 font-bold text-white"
              : "border-gray-200 font-medium text-black"
              }`}
            onClick={() => setActiveCategory("rent")}
          >
            Rent
          </li>
          <li
            className={`cursor-pointer rounded-lg border px-5 py-2.5 text-sm ${activeCategory === "installment"
              ? "border-main-yellow-600 bg-main-yellow-600 font-bold text-white"
              : "border-gray-200 font-medium text-black"
              }`}
            onClick={() => setActiveCategory("installment")}
          >
            Installment
          </li>
        </ul>
        <Line className="my-6 !bg-gray-100" />
        <Typography variant="body-md-bold" className="mb-3 text-black" as="p">
          Price Range
        </Typography>
        <div className="relative">
          <Image src={rangeImg} className="mx-auto h-[60px] w-[90%]" alt="" />
          <div className="relative -bottom-2 px-8 left-0 right-0 z-2">
            <RangeInput activeCategory={activeCategory} value={value} setValue={setValue} />
          </div>

        </div>

        <Line className="mt-12 mb-6 !bg-gray-100" />
        <Feature bathrooms={bathrooms} bedrooms={bedrooms} setBathrooms={setBathrooms} setBedrooms={setBedrooms} />
        <Line className="my-6 !bg-gray-100" />
        {/* <RentalPeriod /> */}
        <div className="my-16 flex items-center space-x-6">
          <Button
            variant="primary-outline"
            className="!hover:border-0 !border-0 bg-gray-300 !py-4 !px-14"
            onClick={() => {
              setActiveCategory("rent")
              setBathrooms(2)
              setBedrooms(4)
              onApplyFilters({
                bedrooms: 2,
                bathrooms: 4,
                price_from: 10,
                price_to: 5000,
                payment_type: "rent"
              })
              setTimeout(() => {
                setOpen(false)
              }, 2000)
            }}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            className="!border-0 !py-4 !px-14 hover:border-0 hover:bg-gray-100"
            onClick={() => {
              onApplyFilters({
                bedrooms,
                bathrooms,
                price_from: value[0],
                price_to: value[1],
                payment_type: activeCategory
              })
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterSide;
