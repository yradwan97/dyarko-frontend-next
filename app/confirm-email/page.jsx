import React from 'react'
import logo from "../../public/assets/logo2.png";
import Image from "next/image"
import ConfirmPageContents from "./ConfirmPageContents"

const ConfirmEmail = () => {
    return (
        <>
            <div className="container hidden py-4 lg:block">
                <Image src={logo} alt="logo" />
            </div>
            <ConfirmPageContents />
            {/* <Footer /> */}
        </>
    )
}

export default ConfirmEmail