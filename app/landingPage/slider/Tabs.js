'use client'
import React, { useState } from "react";
import TabContent from "./TabContent";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";

function Tabs(props) {
  const {data: session} = useSession()
  const [activeTab, setActiveTab] = useState("rent");
  const tabstyle = "flex-1 py-2 px-4 sm:px-7 cursor-pointer text-lg border-b-3";
  return (
    <div className="relative rounded-t-lg bg-white">
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
          Rent
        </li>
        <li
          className={`${
            activeTab === "buy"
              ? props.activeStyle
              : `${props.color} border-white font-regular`
          } ${tabstyle}`}
          onClick={() => setActiveTab("buy")}
        >
          Buy
        </li>
        <li
          className={`${
            activeTab === "installment"
              ? props.activeStyle
              : `${props.color} border-white font-regular`
          } ${tabstyle}`}
          onClick={() => setActiveTab("installment")}
        >
          Installment
        </li>
      </ul>
      {props.content && (
        <div className={`absolute top-full left-0 rounded-lg bg-white py-6 shadow-xl ${session ? "w-[1000px]": "w-[840px]"}`}>
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
