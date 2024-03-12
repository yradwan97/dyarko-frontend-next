import React from 'react'
import logo from "../../public/assets/DYARKO LOGO PNG-01.png";
import Image from "next/image"
import ConfirmPageContents from "./ConfirmPageContents"

const ConfirmEmail = () => {
    return (
        <>
            <div className="py-1 ml-8">
                <Image src={logo} width={100} height={100} alt="logo" />
            </div>
            <ConfirmPageContents />
        </>
    )
}

export default ConfirmEmail