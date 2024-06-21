'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../../../../../public/assets/DYARKO LOGO PNG-01.png";
import logoAr from "../../../../../../public/assets/DYARKO LOGO PNG-02.png";
import menuBar from "../../../../../../public/assets/menu.png";
import Image from "next/image";
import Button from "../Button"
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "../../../landingPage/aboutUs/Sidebar"
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import NotificationOutline from "@/src/app/[locale]/components/UI/icons/NotificationOutline"
import NotificationDropdown from "./NotificationDropdown"
import Typography from "../Typography"
import Avatar from "../Avatar"
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import { useGetNotifications } from "@/src/app/[locale]/user/userApi";
import { useRouter } from "next/navigation";
import LocalizationDropdown from "./LocalizationDropdown"
import { useLocale, useTranslations } from "next-intl";

const Header = () => {
  const router = useRouter()
  const t = useTranslations("General")
  const locale = useLocale()
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [notifications, setNotifications] = useState([]);
  const { data: session } = useSession()
  const [user, setUser] = useState({})
  const [notificationCount, setNotificationCount] = useState(0)
  const { data, isSuccess, refetch } = useGetNotifications()

  useEffect(() => {
    refetch()
  }, [session])

  useEffect(() => {
    if (isSuccess) {
      let unreadNotifications = data?.data.filter(n => !n.is_read)
      setNotifications(unreadNotifications);
      setNotificationCount(unreadNotifications?.length || 0)
    }
  }, [data, isSuccess])

  const handleReadAllNotifications = async () => {
    let readAllBody = {
      "is_read": true
    }
    try {
      let res = await axios.put("/notifications/update_all", readAllBody)
      if (res.data.success) {
        refetch()
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
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

    if (session && session?.user) {
      getLoggedInUser()
    } else {
      setUser(false)
    }

  }, [session])

  return (
    <>
      <header className="sm:sticky top-0 z-20 shadow-md rounded-lg bg-white">
        <div className={`mx-auto flex ${locale === "en" ? "flex-row" : "flex-row-reverse"} items-center px-2 py-[6px] lg:px-10`}>
          <div>
            <Link href={'/'}>
              <Image src={locale === "ar" ? logoAr : logo} height={80} width={80} alt="menu image" priority />
            </Link>
          </div>
          <nav className={`mx-16 border-separate space-x-11 items-center lg:flex ${locale === "ar" && "lg:flex-row-reverse"} lg:space-x-8 hidden`}>
            <Navbar pathname={pathname} />
          </nav>

          {/* {session && } */}
          {(session && user) ? <div className={`relative ${locale === "ar" ? "mr-auto" : "ml-auto"} flex items-center space-x-4`}>
            {/* show notification dropdown at large screens */}
            <LocalizationDropdown />
            <Menu as="div" className="lg:block relative">
              <Menu.Button className="flex relative h-9 w-9 items-center justify-center rounded-lg bg-main-200">
                <NotificationOutline className="h-7 w-7 relative z-10" />
                {notificationCount > 0 && (
                  <span className="absolute -bottom-[8.65px] -right-[6.65px] bg-red text-white text-[10px] rounded-full px-1.5 py-0.5 z-20">{notificationCount < 9 ? notificationCount : "9+"}</span>
                )}
              </Menu.Button>

              <NotificationDropdown onReadAll={handleReadAllNotifications} notifications={notifications} />
            </Menu>
            <Link className="flex items-center space-x-2" href="/user">
              <Typography
                variant="body-md-bold"
                as="span"
                className="hidden md:flex capitalize"
              >
                {user.name}
              </Typography>
              <Avatar
                className="ml-auto items-center space-x-4 flex"
                userName={user.name}
                userImg={user.image}
                isVerified={user.is_confirmed || false}
              />
            </Link>
            <button
              className="ml-auto inline-block lg:hidden"
              onClick={() => setVisible(true)}
            >
              <Image src={menuBar} alt="menu bar" />
            </button>
          </div>
            :
            <>
              <div
                className={`hidden items-center gap-x-3 xl:flex ${locale === "ar" ? "mr-auto xl:flex-row-reverse" : "ml-auto "}`}
              >
                <LocalizationDropdown />

                <Button variant="primary-outline" to="/login">
                  {t("login")}
                </Button>
                <Button variant="primary" to="/sign-up">
                  {t("sign-up")}
                </Button>
              </div>
              <button
                className={`${locale === "en" ? "ml-auto" : "mr-auto"} inline-block lg:hidden`}
                onClick={() => setVisible(true)}
              >
                <Image src={menuBar} alt="menu bar" />
              </button>
            </>
          }
        </div>
        <Sidebar visible={visible} setVisible={setVisible} />

      </header>
    </>
  );
}

export default Header;
