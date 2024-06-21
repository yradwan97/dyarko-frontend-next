'use client'
import Title from "../components/Title";
import Button from "../../components/Shared/Button";
import KeyOutline from "../../components/UI/icons/KeyOutline";
import PropertiesOutline from "../../components/UI/icons/PropertiesOutline"
import PropertiesSection from "./PropertiesSection";
import { useState } from "react";
import Select from "@/src/app/[locale]/components/Shared/Form/Select";
import { useTranslations } from "next-intl";
import { governerates } from "../../utils/utils";

function Properties() {
  const [activeTab, setActiveTab] = useState("rent");
  const t = useTranslations("General")
  const tProperties = useTranslations("HomePage.Properties")
  const [selectedGov, setSelectedGov] = useState(governerates[0])
  const tabstyle =
    "flex items-center py-2.5 px-3 sm:px-5 cursor-pointer text-sm md:text-lg";

  return (
    <div className="bg-gradient-to-t from-main-100 to-white">
      <div className="container mx-auto py-20">
        <div className="mb-20 flex flex-col space-y-4 text-center">
          <Title
            head={`${tProperties("title-head")}`}
            desc={`${tProperties("title-desc")}`}
            type="main"
          />
        </div>
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-between lg:gap-0">
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
              {t("PaymentMethods.rent")}
            </li>
            <li
              className={`${activeTab === "installment"
                ? "stroke-main-600 font-bold text-main-600 shadow-[0_3px_40px_rgba(14,8,84,0.05)]"
                : `stroke-main-secondary font-medium text-main-secondary `
                } ${tabstyle}`}
              onClick={() => setActiveTab("installment")}
            >
              <PropertiesOutline className="stroke-inherite mr-2 h-5 w-5" />
              {t("PaymentMethods.installment")}
            </li>
          </ul>
          <div className="relative mx-auto w-3/4 sm:w-3/4 md:w-5/12 lg:w-4/12">
            <Select
              isGov
              containerClass="py-3 px-5 w-full rounded-lg !justify-between"
              values={governerates}
              selected={selectedGov}
              setSelected={(e) => setSelectedGov(e)}
            />

          </div>
          <Button
            variant="primary"
            to={`/property-listing/${activeTab}?city=${selectedGov.id}`}
            className=" block w-fit"
          >
            {t("browse")}
          </Button>
        </div>
        {/* <PropertiesSection /> */}
      </div>
    </div>
  );
}

export default Properties;
