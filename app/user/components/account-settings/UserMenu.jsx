import React from 'react'
import Link from "next/link"
import Typography from "../../../components/Shared/Typography"
import LogoutSolid from "../../../components/UI/icons/LogoutSolid"
import Button from "../../../components/Shared/Button"
import { signOut, useSession } from "next-auth/react";
import { logout } from "../../../services/api/auth";
import localforage from "localforage";

const navLinks = [
    { to: "profile", text: "profile" },
    { to: "change-password", text: "change password" },
    { to: "wallet", text: "wallet" },
    { to: "saved", text: "saved properties" },
    { to: "my-requests", text: "my requests" },
    { to: "my-real-estates", text: "my real estate" },
    { to: "transactions", text: "transactions" }
];

const UserMenu = ({ visible, selectedTab, setSelectedTab }) => {

    const { data: session } = useSession()
    const defaultLinkClass =
        `block border-0 md:border-l-3 border-l-white 
      border-b border-b-main-100 p-3 px-4 
      text-black 
      hover:text-main-600 md:hover:text-black 
      capitalize transition-colors ease-in-out 
      duration-500 md:hover:border-l-main-600`;
    const activeClass =
        `${defaultLinkClass}  bg-main-300 
            md:bg-white !text-white md:!text-black 
            md:!border-l-main-600 rounded-lg md:rounded-none`;

    const logOutHandler = async () => {
        const refreshToken = session?.user?.refreshToken
        let response;
        if (refreshToken) {
            response = await logout(refreshToken)
            if (response.msg === "messages.user_logout") {
                await localforage.removeItem("fcm_token")
                await signOut({ callbackUrl: "/" })
            }
            return response
        }
    };
    return (
        <div className={`${visible ? "flex space-y-2" : "hidden lg:flex"} lg:w-3/12`}>
            <ul>
                {navLinks.map((link, i) => (
                    <li key={i}>
                        <Link
                            id={link.to}
                            href={link.to}
                            className={
                                link.to === selectedTab ? activeClass : defaultLinkClass
                            }
                            onClick={(e) => {
                                e.preventDefault()
                                setSelectedTab(link.to)
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
    )
}

export default UserMenu