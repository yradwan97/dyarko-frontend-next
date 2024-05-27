'use client'
import React, { useState } from 'react'
import TabContent from './TabContent'
import PropTypes from "prop-types";
import { useTranslations } from 'next-intl';

function Tabs(props) {
  const t = useTranslations("HomePage.AboutUs.Tabs")
  const tabstyle = "flex-1 py-3 px-5 cursor-pointer text-md border-b-3"
  return (
    <div className="relative">
      <ul className={`flex flex-row border-b bg-white border-main-200 ${props.boxStyle}`}>
        <li className={`${props.activeTab === "1" ? props.activeStyle : `${props.color} border-white font-regular`} ${tabstyle}`} onClick={() => props.setActiveTab("1")}>{t("tenants")}</li>
        <li className={`${props.activeTab === "2" ? props.activeStyle : `${props.color} border-white font-regular`} ${tabstyle}`} onClick={() => props.setActiveTab("2")}>{t("owners")}</li>
      </ul>
    </div>
  )
}
Tabs.propTypes = {
  color: PropTypes.string.isRequired,
  boxStyle: PropTypes.string.isRequired,
  activeStyle: PropTypes.string.isRequired,
};
export default Tabs