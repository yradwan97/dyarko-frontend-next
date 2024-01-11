import React, { Fragment } from "react";
import logo2 from "../../../public/assets/logo2.png";
import Button from "../../components/Shared/Button";

import { Dialog, Transition } from "@headlessui/react";
import Navbar from "../../components/Shared/Header/Navbar"
import { usePathname } from "next/navigation";
import Image from "next/image";

function SideBar({ visible, setVisible }) {

const pathname = usePathname()

  function closeModal() {
    setVisible(false);
  }

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={closeModal}>
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
              <Image className="mx-auto" src={logo2} alt="logo" />

              <div className="mt-4 flex flex-col space-y-4">
                <Navbar pathname={pathname} />
              </div>
              {/* {authStatus === authStatusEnum.IDLE ||
              authStatus === authStatusEnum.LOGGED_OUT ? ( */}
                <div className="mt-4 flex flex-col space-y-2">
                  <Button
                    variant="primary-outline"
                    to="/login"
                    className="text-center"
                  >
                    Login
                  </Button>
                  <Button
                    variant="primary"
                    to="/sign-up"
                    className="text-center"
                  >
                    Sign up
                  </Button>
                </div>
              {/* ) : null} */}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SideBar;
