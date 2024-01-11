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
import { ToastContainer, toast } from "react-toastify"



const Header = () => {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const { data: session } = useSession()


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
          {/* implement alternate div when user is logged in */}
          {session ? <div className="relative ml-auto flex items-center space-x-4">
            {/* show notification dropdown at large screens */}
            <Menu as="div" className="hidden lg:block">
              <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-lg bg-main-200">
                <NotificationOutline className="h-5 w-5" />
              </Menu.Button>

              <NotificationDropdown />
            </Menu>
            <Link className="flex items-center space-x-2" href="/user">
              <Typography
                variant="body-md-bold"
                as="span"
                className="capitalize"
              >
                {session.user.name}
              </Typography>
              <Avatar
                className="ml-auto hidden items-center space-x-4 md:flex"
                userName={session.user.name}
                userImg={session.user.image}
                isVerified={session.user.isVerified || false}
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
