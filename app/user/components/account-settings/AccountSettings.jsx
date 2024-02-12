'use client'
import React, { Suspense, useEffect, useState, Fragment } from "react";
import Header from "../../../components/Shared/Header/Header"
import Profile from "../profile/Profile"
import Wallet from "../wallet/Wallet"
import SavedProperties from "../saved/SavedProperties"
import MyRequests from '../my-requests/MyRequests'
import MyRealEstates from "../my-real-estate/MyRealEstates"
import Transactions from "../Transactions/Transactions"
import ChangePassword from "../change-password/ChangePassword"
import { useSearchParams } from "next/navigation";
import UserMenu from './UserMenu'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Fab from '@mui/material/Fab';
import { Dialog, Transition } from "@headlessui/react";
import logo2 from "../../../../public/assets/DYARKO LOGO PNG-01.png";
import Image from "next/image"

const AccountSettings = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)

  const childrenMap = [
    { endpoint: "/user/profile", child: <Profile /> },
    { endpoint: "/user/wallet", child: <Wallet /> },
    { endpoint: "/user/saved", child: <SavedProperties /> },
    { endpoint: "/user/your-requests", child: <MyRequests request={searchParams.get("request")} /> },
    { endpoint: "/user/my-real-estates", child: <MyRealEstates /> },
    { endpoint: "/user/transactions", child: <Transactions /> },
    { endpoint: "/user/change-password", child: <ChangePassword /> }
  ]

  const [selectedEndpoint, setSelectedEndpoint] = useState("/user/profile");
  useEffect(() => {
    if (searchParams.get("request")) {
      setSelectedEndpoint("/user/your-requests")
    }
    if (searchParams.get("my-real-estates")) {
      setSelectedEndpoint("/user/my-real-estates")
    }
  }, [searchParams])

  useEffect(() => {
    if (visible) {
      setVisible(false)
    }
  }, [selectedEndpoint])

  return (
    <Suspense>
      <div className="flex flex-col">
        <Header />
        <div onClick={() => setVisible(true)} className="absolute top-36 md:hidden left-3 text-center text-black">
          <Fab color="warning" variant="extended" size="medium">
            Menu
            <DoubleArrowIcon />
          </Fab>
        </div>
        <div className="lg:px-15 relative flex bg-gradient-to-b from-main-100 to-white ml-2 mt-10 sm:mt-0 sm:mx-0 px-2 py-6 md:from-white md:px-10">
          <UserMenu selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} />
          <div className={`container`}>
            <div className="rounded-xl border border-main-100 p-6">
              {childrenMap.find(c => c.endpoint === selectedEndpoint)?.child}
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-[9999]" onClose={() => setVisible(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed top-0 left-0 bottom-0 z-[99991] overflow-y-auto">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-100 -translate-x-full"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-100 -translate-x-full"
            >
              <Dialog.Panel
                className={`
                    relative h-full w-[285px] animate-swapOpen
                    bg-white bg-gradient-to-b from-main-100 to-white p-5 text-start`}
              >
                <Image className="mx-auto" width={150} height={150} src={logo2} alt="logo" />
                <UserMenu visible={visible} selectedEndpoint={selectedEndpoint} setSelectedEndpoint={setSelectedEndpoint} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Suspense>
  );
}

export default AccountSettings