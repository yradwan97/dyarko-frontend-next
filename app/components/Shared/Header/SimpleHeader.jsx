'use client'
import React from "react";
import Link from "next/link";
import logo from "../../../../public/assets/logo.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Typography from "../Typography"
import Avatar from "../Avatar"

const SimpleHeader = () => {
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
                    {/* implement alternate div when user is logged in */}
                    {session && <div className="relative ml-auto flex items-center space-x-4">
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
                    }
                </div>

            </header>
        </>
    );
}

export default SimpleHeader;
