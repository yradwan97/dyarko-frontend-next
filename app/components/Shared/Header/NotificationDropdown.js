import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Typography from "@/app/components/Shared/Typography"
import { useQuery } from "react-query"
import HomeSolid from "../../UI/icons/HomeSolid";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { useSession } from "next-auth/react";


const links = [
  // {
  //   title: "A tour request",
  //   desc: "Lots of great deals around new york that you should check out",
  //   bgColor: "bg-red",
  // },
  // {
  //   title: "You have new points",
  //   desc: "Lots of great deals around new york that you should check out",
  //   bgColor: "bg-main-600",
  // },
  // {
  //   title: "The house with the best rating",
  //   desc: "Lots of great deals around new york that you should check out",
  //   bgColor: "bg-main-yellow-600",
  // },
  
];

function NotificationDropdown() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        if (session) {
          const response = await axios.get("/notifications", {
            headers: {
              "auth-token": `Bearer ${session?.user.accessToken}`,
              "Accept": "*/*",
              "Content-Type": "application/json",
            },
          });

          if (response?.data.message === "success") {
            setNotifications(response?.data.data);
          }
        }
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching notifications:", error);
      }
    };

    getNotifications();
  }, [session]);

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
            {notifications.length > 0 && <Typography
              variant="body-sm"
              as="span"
              className="px-5 text-gray-500"
            >
              Today
            </Typography>}
            <div>
              {notifications.length > 0 ? notifications.map((n, i) => (
                /* Use the `active` state to conditionally style the active item. */
                <Menu.Item key={i} as={Fragment}>
                  {({ active }) => (
                    <div className={`flex space-x-4 ${!n.is_read ? `bg-main-200 hover:bg-main-100` : "" } border-b rounded-md mx-1 border-gray-300 px-5 py-3 last:border-b-0`}>
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
          
          
          {notifications.length > 0 && <Link
            href="/notifications"
            className="block text-center text-sm font-bold text-main-600"
          >
            See All
          </Link>}
        </div>
      </Menu.Items>
    </Transition>
  );
}

export default NotificationDropdown;
