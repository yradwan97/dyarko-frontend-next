'use client'
import React, { Fragment, Suspense, useEffect, useState } from "react";
import Header from "../../../components/Shared/Header/Header"
import Profile from "../profile/Profile"
import Wallet from "../wallet/Wallet"
import SavedProperties from "../saved/SavedProperties"
import MyRequests from '../my-requests/MyRequests'
import MyRealEstates from "../my-real-estate/MyRealEstates"
import Transactions from "../Transactions/Transactions"
import ChangePassword from "../change-password/ChangePassword"
import UserMenu from './UserMenu'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import Fab from '@mui/material/Fab';
import { Dialog, Transition } from "@headlessui/react";
import logo2 from "../../../../../../public/assets/DYARKO LOGO PNG-01.png";
import Image from "next/image"
import Footer from "@/src/app/[locale]/components/Shared/Footer/Footer";
import { useTranslations } from "next-intl";

const AccountSettings = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [visible, setVisible] = useState(false)
  const t = useTranslations("Account")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setSelectedTab(tab);
    }
  }, []);

  const renderTab = () => {
    switch (selectedTab) {
      case "profile":
        return <Profile />;
      case "wallet":
        return <Wallet />;
      case "saved":
        return <SavedProperties />;
      case "my-requests":
        return <MyRequests />;
      case "my-real-estates":
        return <MyRealEstates />;
      case "transactions":
        return <Transactions />;
      case "change-password":
        return <ChangePassword />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (visible) {
      setVisible(false)
    }
    window.history.replaceState({}, '', window.location.pathname);
  }, [selectedTab])

  return (
    <Suspense>
      <div className="flex flex-col">
        <Header />
        <div onClick={() => setVisible(!visible)} className="absolute z-10 top-36 lg:hidden left-3 text-center text-black">
          <Fab color="warning" variant="extended" size="medium">
            {t("menu")}
            <DoubleArrowIcon />
          </Fab>
        </div>
        <div className="lg:px-15 relative flex bg-gradient-to-b from-main-100 to-white ml-2 mt-10 sm:mt-0 sm:mx-0 px-2 py-6 md:from-white md:px-10">
          <UserMenu visible={false} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <div className={`container`}>
            <div className="rounded-xl border border-main-100 p-6">
              {renderTab()}
            </div>
          </div>
        </div>
        <Footer />
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
                <UserMenu visible={visible} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </Suspense>
  );
}

export default AccountSettings
