import React from "react";
import logo from "../../../public/assets/DYARKO LOGO PNG-01.png";
import Image from "next/image";
import Link from "next/link";

const SimpleNavbar = () => {
  return (
    <div className="container w-full hidden py-2 lg:block">
      <Link href={"/"}>
        <Image src={logo} width={100} height={100} alt="logo" />
      </Link>
    </div>
  );
};

export default SimpleNavbar;
