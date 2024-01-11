'use client'
import Title from "../components/Title";
import Button from "../../components/Shared/Button";
import KeyOutline from "../../components/UI/icons/KeyOutline";
import PropertiesOutline from "../../components/UI/icons/PropertiesOutline"
import PropertiesSection from "./PropertiesSection";
import { useState } from "react";
import Select from "@/app/components/Shared/Form/Select";

const governerates = [
  { id: "al ahmadi", icon: "Al Ahmadi" },
  { id: "al asimah", icon: "Al-Asimah" },
  { id: "al farwaniyah", icon: "Farwaniya" },
  { id: "hawalli", icon: "Hawalli" },
  { id: "al jahra", icon: "Jahra" },
  // TODO: ask about the spelling and count of all govs.
  { id: "mubarak al-kabeer", icon: "Mubarak Al-Kabeer" }
]

function Properties() {
  const [activeTab, setActiveTab] = useState("rent");
  const [selectedGov, setSelectedGov] = useState(governerates[0].id)
  const tabstyle =
    "flex items-center py-2.5 px-3 sm:px-5 cursor-pointer text-sm md:text-lg";

  return (
    <div className="bg-gradient-to-t from-main-100 to-white">
      <div className="container mx-auto py-20">
        <div className="mb-20 flex flex-col space-y-4 text-center">
          <Title
            head="Based on your location"
            desc="Some of our picked properties near you location."
            type="main"
          />
        </div>
        <div className="flex flex-col-reverse items-center gap-5 lg:flex-row lg:justify-between lg:gap-0">
          <ul
            className={`flex flex-row rounded-lg border-[1.5px] border-main-100 p-2`}
          >
            <li
              className={`${activeTab === "rent"
                ? "stroke-main-600 font-bold text-main-600 shadow-[0_3px_40px_rgba(14,8,84,0.05)]"
                : `stroke-main-secondary font-medium text-main-secondary `
                } ${tabstyle}`}
              onClick={() => setActiveTab("rent")}
            >
              <KeyOutline className="stroke-inherite mr-2 h-4 w-4" />
              Rent
            </li>
            <li
              className={`${activeTab === "installment"
                ? "stroke-main-600 font-bold text-main-600 shadow-[0_3px_40px_rgba(14,8,84,0.05)]"
                : `stroke-main-secondary font-medium text-main-secondary `
                } ${tabstyle}`}
              onClick={() => setActiveTab("installment")}
            >
              <PropertiesOutline className="stroke-inherite mr-2 h-5 w-5" />
              Installment
            </li>
          </ul>
          <div className="relative mx-auto sm:w-6/12 md:mx-0 lg:w-4/12 ">
            <Select
              containerClass="py-3 px-5 w-full rounded-lg !justify-between"
              values={governerates}
              selected={selectedGov}
              setSelected={(e) => setSelectedGov(e.id)}
            />

          </div>
        </div>
        <PropertiesSection />
        <Button
          variant="primary"
          to={`/property-listing/${activeTab}?city=${selectedGov}`}
          className="mx-auto mt-10 block w-fit"
        >
          Browse more properties
        </Button>
      </div>
    </div>
  );
}

export default Properties;
