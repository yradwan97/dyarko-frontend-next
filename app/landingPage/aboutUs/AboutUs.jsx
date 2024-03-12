'use client'
import React, { useState } from "react";
import Title from "../../landingPage/components/Title";
import Button from "../../components/Shared/Button";
import ArrowRightOutline from "../../components/UI/icons/ArrowRightOutline";
import HomeOutline from "../../components/UI/icons/HomeOutline"
import PropertyInsuranceOutline from "../../components/UI/icons/PropertyInsuranceOutline"
import InfoBox from "./InfoBox";
import Tabs from "./Tabs/Tabs";

function Aboutus() {
  const [activeTab, setActiveTab] = useState("1")
  return (
    <div className="bg-main-100">
      <div className="container mx-auto flex flex-col py-20 lg:flex-row lg:space-x-28 ">
        <div className="relative h-96 rounded-lg bg-white bg-sliderLeft-bg bg-cover bg-center bg-no-repeat lg:h-auto lg:flex-1">
          <InfoBox
            head="Schedule a home tour"
            desc="We provide you with tour"
            icon={<HomeOutline className="stroke-main-yellow-600" />}
            boxStyle="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 lg:transform-none lg:-left-16 top-0 lg:top-8"
            light={true}
          />
          <InfoBox
            head="Find the best deal"
            desc="Browse thousands of properties"
            icon={<PropertyInsuranceOutline className="stroke-white" />}
            boxStyle="absolute left-2/4 top-full !space-x-0 -translate-y-2/4 -translate-x-2/4"
          />
        </div>
        <div className="mt-20 py-0 md:flex-1 lg:mt-0 lg:py-24">
          <div className="w-full md:w-8/12">
            <Tabs
              color="text-gray-500"
              boxStyle="p-2 !border-0 !rounded-md"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              activeStyle="text-black !text-md !border !border-main-200 shadow-basic rounded-md font-bold"
            />
          </div>
          <div className="mt-8 flex flex-col space-y-6 md:space-y-8">
            <Title
              head="We make it easy for tenants and landlords."
              desc="Whether it’s selling your current home, getting financing, or buying a new home, we make it easy  and efficient. The best part? you’ll save a bunch of money and time with our services."
              type="main"
            />
          </div>
          <Button
            variant="primary"
            to={activeTab === "1" ? "/property-listing/rent" : "/companies"}
            className="mt-8 flex items-center !py-2 !px-6 w-2/5 sm:w-1/3 lg:w-2/3 xl:w-1/3"
          >
            See more <ArrowRightOutline className="ml-auto stroke-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
