'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../../../public/assets/logo.png";
import menuBar from "../../../../public/assets/menu.png";
import Image from "next/image";
import Button from "../Button"
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "../../../landingPage/aboutUs/Sidebar"
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import NotificationOutline from "@/app/components/UI/icons/NotificationOutline"
import NotificationDropdown from "./NotificationDropdown"
import Typography from "../Typography"
import Avatar from "../Avatar"
import { ToastContainer } from "react-toastify"
import { axiosClient as axios } from "@/app/services/axiosClient"


const Header = ({ refetch = false }) => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const { data: session } = useSession()
  const [user, setUser] = useState({})
  const [notificationCount, setNotificationCount] = useState(0)

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
          let unreadNotifications = response.data.data.filter(n => !n.is_read)
          setNotifications(unreadNotifications);
          setNotificationCount(unreadNotifications?.length || 0)
        }
      }
    } catch (error) {
      // Handle errors if necessary
      console.error("Error fetching notifications:", error);
    }
  };

  const getLoggedInUser = async () => {
    try {
      let res = await axios.get("/users", {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      })
      if (res.data.message === "success") {
        setUser(res.data.data)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getNotifications();

    if (session && session?.user) {
      getLoggedInUser()
    } else {
      setUser({})
    }

  }, [session])

  useEffect(() => {
    if (refetch) {
      getNotifications()
    }
  }, [refetch])

  return (
    <>
      <header className="sticky top-0 z-20 border-b-2 border-main-100 bg-white">
        <div className="mx-auto flex items-center px-2 py-4 lg:px-10">
          <div>
            <Link href={'/'}>
              <Image src={logo} alt="menu image" priority />
            </Link>
          </div>
          <nav className=" mx-16 border-separate space-x-11 items-center lg:flex lg:space-x-8 hidden">
            <Navbar pathname={pathname} />
          </nav>
          {(session && user) ? <div className="relative ml-auto flex items-center space-x-4">
            {/* show notification dropdown at large screens */}
            <Menu as="div" className="hidden lg:block relative">
              <Menu.Button className="flex relative h-9 w-9 items-center justify-center rounded-lg bg-main-200">
                <NotificationOutline className="h-7 w-7 relative z-10" />
                {notificationCount > 0 && (
                  <span className="absolute -bottom-[0.65px] -right-[0.65px] bg-red text-white text-sm rounded-full px-1 py-1 z-20" />
                )}
              </Menu.Button>

              <NotificationDropdown notifications={notifications} />
            </Menu>
            <Link className="flex items-center space-x-2" href="/user">
              <Typography
                variant="body-md-bold"
                as="span"
                className="capitalize"
              >
                {user.name}
              </Typography>
              <Avatar
                className="ml-auto hidden items-center space-x-4 md:flex"
                userName={user.name}
                userImg={user.image}
                isVerified={user.is_confirmed || false}
              />
            </Link>
          </div>
            :
            <>
              <div
                className="hidden items-center space-x-2 lg:flex"
                style={{ marginInlineStart: "auto" }}
              >
                <Button variant="primary-outline" to="/login">
                  Login
                </Button>
                <Button variant="primary" to="/sign-up">
                  Sign Up
                </Button>
              </div>
              <button
                className="ml-auto inline-block lg:hidden"
                onClick={() => setVisible(true)}
              >
                <Image src={menuBar} alt="menu bar" />
              </button>
            </>
          }
        </div>
        <Sidebar visible={visible} setVisible={setVisible} />

      </header>

      <ToastContainer />
    </>
  );
}

export default Header;
