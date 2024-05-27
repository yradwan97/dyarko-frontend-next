import React, { Fragment } from "react";
import logo from "../../../../../public/assets/DYARKO LOGO PNG-01.png";
import logoAr from "../../../../../public/assets/DYARKO LOGO PNG-02.png";
import Button from "../../components/Shared/Button";
import Link from "next/link"
import { Dialog, Transition } from "@headlessui/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

const navLinks = [
  { to: '/property-listing/rent', text: 'rent' },
  { to: '/property-listing/installment', text: 'installment' },
  { to: '/property-listing/cash', text: 'cash' },
  { to: '/property-listing/shared', text: 'shared' },
  { to: '/property-listing/replacement', text: 'replacement' },
  { to: '/categories', text: 'categories' },
  { to: '/companies', text: 'companies' },
  { to: '/videos', text: 'videos' },
];

function SideBar({ visible, setVisible }) {
  const t = useTranslations("Navbar")
  const tGeneral = useTranslations("General")
  const locale = useLocale()
  const { data: session } = useSession()
  const pathname = usePathname()

  const determinePathName = (path) => {
    return path.split('/')[2] ? path.split('/')[2] : path.split('/')[1];
  };

  let linkStyle = "capitalize text-base font-medium text-black px-1 py-2 rounded-lg";
  let activeClass = `${linkStyle} !text-main-600 !font-bold bg-main-100`;



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
                    relative h-full w-[285px] animate-swapOpen overflow-y-scroll
                    bg-white bg-gradient-to-b from-main-100 to-white p-5 text-start`}
            >
              <Image className="mx-auto" width={150} height={150} src={locale === "en" ? logo : logoAr} alt="logo" />

              <div className={`mt-4 flex flex-col ${locale === "ar" && "text-end"} space-y-1`}>
                {navLinks.map((navLink, index) => (
                  <Link
                    id={navLink.text}
                    href={navLink.to}
                    key={index}
                    className={
                      determinePathName(pathname) === determinePathName(navLink.to)
                        ? activeClass
                        : linkStyle
                    }
                    replace
                  >
                    {t(navLink.text)}
                  </Link>
                ))}
              </div>

              {!session && <div className="mt-4 flex flex-col space-y-2">
                <Button
                  variant="primary-outline"
                  to="/login"
                  className="text-center"
                >
                  {tGeneral("login")}
                </Button>
                <Button
                  variant="primary"
                  to="/sign-up"
                  className="text-center"
                >
                  {tGeneral("sign-up")}
                </Button>
              </div>}

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default SideBar;
