'use client'
import React from 'react'
import SimpleNavbar from "../components/Login/SimpleNavbar"
import Typography from '../components/Shared/Typography'
import Link from 'next/link'
import FacebookSolid from "../components/UI/icons/FacebookSolid"
import google from "../../public/assets/login/google.png"
import loginPic from "../../public/assets/login/login-pic.png"
import Image from "next/image"
import PoweredBy from '../components/Login/PoweredBy'

import LoginForm from '../components/Login/LoginForm'
import Loader from "../components/Shared/Loader"

const OWNER_DASHBOARD_URL = process.env.NEXT_PUBLIC_NEXT_APP_OWNER_DASHBOARD_URL;

const LoginPage = () => {

    const buttonStyle =
        `flex justify-center py-3.5 px-5 mb-4 w-full 
    rounded-lg text-md font-bold border border-gray-200 
    hover:bg-main-600 hover:text-white transition-colors 
    ease-in-out duration-500`;


    return (
        <>
            <div className="mx-auto">
                <div className="flex">
                    <div className="flex-1">
                        <SimpleNavbar />
                        <div className="mx-auto w-5/6 py-16 md:w-4/6 md:py-24 lg:w-4/6">
                            <Typography variant="h3" as="h3" className="mb-3 capitalize">
                                Welcome back!
                            </Typography>
                            <Typography variant="body-md-medium" as="p" className="opacity-50">
                                Welcome back! Please enter your details.
                            </Typography>
                            <LoginForm />
                            <Typography
                                variant="body-sm-medium"
                                as="p"
                                className="pt-6 text-center text-gray-500"
                            >
                                Are you a property owner ?{" "}
                                <Link
                                    href={OWNER_DASHBOARD_URL}
                                    className="font-bold text-black underline decoration-1"
                                >
                                    Go to owner portal
                                </Link>
                            </Typography>
                            <Typography
                                variant="body-sm-medium"
                                as="p"
                                className="pt-6 text-center text-gray-500"
                            >
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/sign-up"
                                    className="font-bold text-black underline decoration-1"
                                >
                                    Sign up for free
                                </Link>
                            </Typography>
                        </div>
                    </div>
                    <PoweredBy img={loginPic.src} />
                </div>
            </div>
        </>
    )
}

export default LoginPage