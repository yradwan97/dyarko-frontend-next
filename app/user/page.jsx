'use client'
import React, { useState } from "react";
import Link from "next/link"
import Typography from "../components/Shared/Typography"
import Header from "../components/Shared/Header/Header"
import LogoutSolid from "../components/UI/icons/LogoutSolid"
import { useSession } from "next-auth/react";
import { logout } from "../services/api/auth";
import Button from "../components/Shared/Button"
import Profile from "./components/Profile"
import Wallet from "./components/wallet/Wallet"
import SavedProperties from "./components/saved/SavedProperties"
import MyRequests from './components/my-requests/MyRequests'
import MyRealEstates from "./components/my-real-estate/MyRealEstates"
import Transactions from "./components/Transactions/Transactions"
import ChangePassword from "./components/change-password/ChangePassword"
import { useRouter } from "next/navigation";


const navLinks = [
  { to: "/user/profile", text: "profile" },
  { to: "/user/wallet", text: "wallet" },
  { to: "/user/saved", text: "saved properties" },
  { to: "/user/your-requests", text: "my requests" },
  { to: "/user/my-real-states", text: "my real estate" },
  { to: "/user/transactions", text: "transactions" },
  { to: "/user/change-password", text: "change password" },
];

const childrenMap = [
  { endpoint: "/user/profile", child: <Profile /> },
  { endpoint: "/user/wallet", child: <Wallet /> },
  { endpoint: "/user/saved", child: <SavedProperties /> },
  { endpoint: "/user/your-requests", child: <MyRequests /> },
  { endpoint: "/user/my-real-states", child: <MyRealEstates /> },
  { endpoint: "/user/transactions", child: <Transactions /> },
  { endpoint: "/user/change-password", child: <ChangePassword /> }
]

const AccountSettings = () => {
  const { data: session } = useSession()

  const [selectedEndpoint, setSelectedEndpoint] = useState("/user/profile");

  const defaultLinkClass =
    `block border-0 md:border-l-3 border-l-white 
      border-b border-b-main-100 p-3 px-4 
      text-main-secondary md:text-black 
      hover:text-main-600 md:hover:text-black 
      capitalize transition-colors ease-in-out 
      duration-500 md:hover:border-l-main-600`;
  const activeClass =
    `${defaultLinkClass}  bg-main-300 
            md:bg-white !text-main-600 md:!text-black 
            md:!border-l-main-600 rounded-lg md:rounded-none`;

  const logOutHandler = async () => {
    const refreshToken = session?.user?.refreshToken
    let response;
    if (refreshToken) {
      response = await logout(refreshToken)
      return response
    }
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="lg:px-15 relative flex bg-gradient-to-b from-main-100 to-white px-2 py-6 md:from-white md:px-10">
        <div className="w-full md:w-5/12 lg:w-3/12 ">
          <ul className="">
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link
                  id={link.to}
                  href={link.to}
                  className={
                    link.to === selectedEndpoint ? activeClass : defaultLinkClass
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedEndpoint(link.to)
                  }}
                >
                  <Typography variant="body-md-medium" as="span" className="">
                    {link.text}
                  </Typography>
                </Link>
              </li>
            ))}
            <li>
              <Button
                className={`${defaultLinkClass} flex w-full items-center justify-between`}
                onClick={logOutHandler}
              >
                <Typography
                  variant="body-md-medium"
                  as="span"
                  className="text-black"
                >
                  Logout
                </Typography>
                <LogoutSolid className="h-5 w-5 fill-black" />
              </Button>
            </li>
          </ul>
        </div>
        <div className={`container hidden md:block`}>
          <div className="rounded-xl border border-main-100 p-6">
            {childrenMap.find(c => c.endpoint === selectedEndpoint)?.child}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings