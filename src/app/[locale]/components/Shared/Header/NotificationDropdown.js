import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Typography from "@/src/app/[locale]/components/Shared/Typography"
import HomeSolid from "../../UI/icons/HomeSolid";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import Button from "../Button";
import { useLocale, useTranslations } from "next-intl";

function NotificationDropdown({notifications, onReadAll}) {
  const router = useRouter()
  const locale = useLocale()
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations("Notifications.Dropdown")

  const goToNotifications = () => {
    setIsLoading(true)
    router.push("/notifications")
  }
  if (isLoading) return <Loader/>

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className={`absolute top-10 z-999 ${locale === "ar" ? "right-14 sm:right-5 md:left-0" : "-right-14 sm:-right-5 md:right-0"}  flex w-60 sm:w-[320px] md:w-[400px] flex-col rounded-lg bg-white py-5 drop-shadow-basic-sm `}>
        <div className="max-h-[350px] md:max-h-[450px] space-y-6 overflow-y-auto">
          <Typography
            variant="body-md-bold"
            as="h4"
            className="px-5 capitalize text-gray-900"
          >
            {t("title")}
          </Typography>
          <div>
            {/* {notifications.length > 0 && <Typography
              variant="body-sm"
              as="span"
              className="px-5 text-gray-500"
            >
              Today
            </Typography>} */}
            <div>
              {notifications.length > 0 ? notifications.map((n, i) => (
                /* Use the `active` state to conditionally style the active item. */
                <Menu.Item key={i} as={Fragment}>
                  {({ active }) => (
                    <div onClick={goToNotifications} className={`flex space-x-4 bg-main-200 hover:bg-main-100 cursor-pointer border-b rounded-md mx-1 border-gray-300 px-5 my-1 py-3 last:border-b-0`}>
                      <div>
                        <span
                          className={`h-6 w-6 rounded-full ${"bg-red"} flex items-center justify-center`}
                        >
                          <HomeSolid className="h-3 w-3 fill-white" />
                        </span>
                      </div>
                      <div className="space-y-1">
                        <Typography
                          variant="body-sm-bold"
                          as="h6"
                          className="text-black capitalize"
                        >
                          {locale === "en" ? n.title_en : n.title_ar}
                        </Typography>
                        <Typography
                          variant="body-xs-medium"
                          as="p"
                          className="text-gray-600"
                        >
                          {locale === "en" ? n.body_en : n.body_ar}
                        </Typography>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))
            : 
            <div className="text-center">
            <Typography as="h3" variant="body-md-medium">
              {t("no-new")}  
            </Typography>
            </div>
            }
            </div>
          </div>
          
          <div className="flex flex-row justify-evenly">
          <Button
            to="/notifications"
            className="block text-center text-sm font-bold text-main-600"
            onClick={goToNotifications}
          >
            See All
          </Button>
          {notifications.length > 0 && <Button
            className="block text-center text-sm font-bold text-main-600"
            onClick={onReadAll}
          >
            Read All
          </Button>}
          </div>
        </div>
      </Menu.Items>
    </Transition>
  );
}

export default NotificationDropdown;
