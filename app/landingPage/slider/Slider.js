'use client'
import React from "react";
import ApartmentSolid from "../../components/UI/icons/ApartmentOutline"
import KeySolid from "../../components/UI/icons/KeySolid"
import PeopleSolid from "../../components/UI/icons/PeopleSolid"
import SearchOutline from "../../components/UI/icons/SearchOutline"
import CircleIcon from "../../components/UI/icons/CircleIcon"
import Typography from "../../components/Shared/Typography";
import Tabs from "./Tabs";
import CountUp from "react-countup";


function Slider() {
  return (
    <div className="flex bg-cover bg-slider-bg bg-center bg-no-repeat ">
      <div className="container pt-20 md:w-52 md:pl-20 md:pr-10 lg:pl-40">
        <Typography
          variant="h1"
          as="h1"
          className="mb-8 text-center text-4xl text-black sm:text-5xl md:text-start"
        >
          Buy, rent, or sell your property easily
        </Typography>
        <Typography
          variant="body-xl"
          as="p"
          className="body-lg-medium text-center text-xl text-black md:text-start"
        >
          A great platform to buy, sell, or even rent your properties without
          any commisions.
        </Typography>
        <div className="mt-10 mb-60 md:mb-36 w-full lg:w-full xl:w-4/6 ">
          <Tabs
            content={true}
            color="text-black"
            boxStyle="border-b border-main-200"
            activeStyle="text-main-600 border-main-600 font-bold"
          />
        </div>
        <div className="mb-12 flex md:translate-y-[10rem] translate-y-[6rem] lg:translate-y-0">
          <div className="flex-1">
            <CircleIcon
              className="mx-auto hidden sm:mx-0 sm:block"
              icon={<PeopleSolid className="h-8 w-8 fill-white" />}
              subIcon={<KeySolid className="h-3.5 w-3.5 fill-white" />}
            />
            <div className="mt-4">
              <Typography
                variant="h4"
                as="h3"
                className={`mb-2 break-words text-center text-2xl font-bold text-main-400 sm:break-normal sm:text-start`}
              >
                <CountUp
                  end={50}
                  enableScrollSpy={true}
                  scrollSpyDelay={1000}
                />
                k+ renters
              </Typography>
              <Typography
                variant="body-md-medium"
                as="p"
                className={`hidden text-black sm:block`}
              >
                believe in our service
              </Typography>
            </div>
          </div>

          <div className="flex-1">
            <CircleIcon
              className="mx-auto hidden sm:mx-0 sm:block"
              icon={<ApartmentSolid className="h-8 w-8 fill-white" />}
              subIcon={<SearchOutline className="h-3.5 w-3.5 stroke-white" />}
            />
            <div className="mt-4">
              <Typography
                variant="h4"
                as="h3"
                className={`mb-2 break-words text-center text-2xl font-bold text-main-400 sm:break-normal sm:text-start`}
              >
                <CountUp
                  end={10}
                  enableScrollSpy={true}
                  scrollSpyDelay={1000}
                />
                k+ properties
              </Typography>
              <Typography
                variant="body-md-medium"
                as="p"
                className={`hidden text-black sm:block mb-1 lg:mb-0`}
              >
                and houses ready for occupancy
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="grow bg-cover bg-sliderLeft-bg bg-left-bottom bg-no-repeat md:block"></div>
    </div>
  );
}

export default Slider;