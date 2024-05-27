'use client'
import React, { useState } from "react";
import TabContent from "./TabContent";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function Tabs(props) {
  const {data: session} = useSession()
  const t = useTranslations("General.PaymentMethods")
  const [activeTab, setActiveTab] = useState("rent");
  const tabstyle = "flex-1 py-2 px-4  cursor-pointer text-lg border-b-3";
  return (
    <div className="relative w-full rounded-t-lg bg-white">
      <ul
        className={`flex flex-row border-b border-main-200 ${props.boxStyle}`}
      >
        <li
          className={`${
            activeTab === "rent"
              ? props.activeStyle
              : `${props.color} border-white font-regular`
          } ${tabstyle}`}
          onClick={() => setActiveTab("rent")}
        >
          {t("rent")}
        </li>
        <li
          className={`${
            activeTab === "buy"
              ? props.activeStyle
              : `${props.color} border-white font-regular`
          } ${tabstyle}`}
          onClick={() => setActiveTab("buy")}
        >
          {t("cash")}
        </li>
        <li
          className={`${
            activeTab === "installment"
              ? props.activeStyle
              : `${props.color} border-white font-regular`
          } ${tabstyle}`}
          onClick={() => setActiveTab("installment")}
        >
          {t("installment")}
        </li>
      </ul>
      {props.content && (
        <div className={`absolute top-full left-0 w-full md:w-[500px] rounded-lg bg-white py-6 shadow-xl ${session ? "lg:w-[1000px]": "lg:w-[840px]"}`}>
            <TabContent tab={activeTab} session={session} />
        </div>
      )}
    </div>
  );
}

Tabs.propTypes = {
  color: PropTypes.string.isRequired,
  boxStyle: PropTypes.string.isRequired,
  activeStyle: PropTypes.string.isRequired,
};
export default Tabs;
