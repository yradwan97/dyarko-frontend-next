'use client'
import React, { useState } from 'react'
import TabContent from './TabContent'
import PropTypes from "prop-types";

function Tabs(props) {
  // const [activeTab, setActiveTab] = useState("1")
  const tabstyle= "flex-1 py-3 px-5 cursor-pointer text-md border-b-3"
  return (
      <div className="relative">
      <ul className={`flex flex-row border-b bg-white border-main-200 ${props.boxStyle}`}>
        <li className={`${props.activeTab === "1"? props.activeStyle:`${props.color} border-white font-regular`} ${tabstyle}`} onClick={()=>props.setActiveTab("1")}>For tenants</li>
        <li className={`${props.activeTab === "2"? props.activeStyle:`${props.color} border-white font-regular`} ${tabstyle}`} onClick={()=>props.setActiveTab("2")}>For landlords</li>
      </ul>
      {props.content &&
          <div className="hidden md:block shadow-xl p-6 absolute rounded-lg top-full left-0 bg-white w-695 ">
            {props.activeTab === '1'?
             <TabContent/> :
            props.activeTab === "2" ?
            <TabContent/>
            :
            <TabContent/>
            }
          </div>
      }
    </div>
  )
}
Tabs.propTypes = {
  color: PropTypes.string.isRequired,
  boxStyle: PropTypes.string.isRequired,
  activeStyle: PropTypes.string.isRequired,
};
export default Tabs