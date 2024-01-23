import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Link from "next/link";
import Typography from "@/app/components/Shared/Typography"
import HomeSolid from "../../UI/icons/HomeSolid";
import { useRouter } from "next/navigation";
import Loader from "../Loader";
import Button from "../Button";

function NotificationDropdown({notifications}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
      <Menu.Items className="absolute top-full right-0 flex w-[400px] flex-col rounded-lg bg-white py-5 drop-shadow-basic-sm ">
        <div className="max-h-[450px] space-y-6 overflow-y-auto">
          <Typography
            variant="body-md-bold"
            as="h4"
            className="px-5 capitalize text-gray-900"
          >
            Notifications
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
                          {n.title_en}
                        </Typography>
                        <Typography
                          variant="body-xs-medium"
                          as="p"
                          className="text-gray-600"
                        >
                          {n.body_en}
                        </Typography>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))
            : 
            <div className="text-center">
            <Typography as="h3" variant="body-md-medium">
              No New Notifications.  
            </Typography>
            </div>
            }
            </div>
          </div>
          
          
          {notifications.length > 0 && <Button
            to="/notifications"
            className="block text-center text-sm font-bold text-main-600"
            onClick={goToNotifications}
          >
            See All
          </Button>}
        </div>
      </Menu.Items>
    </Transition>
  );
}

export default NotificationDropdown;
