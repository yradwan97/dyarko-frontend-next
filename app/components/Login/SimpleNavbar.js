import React from "react";
import logo from "../../../public/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const SimpleNavbar = () => {
  return (
    <div className="container hidden border-b border-main-100 py-6 lg:block">
      <Link href={"/"}>
        <Image src={logo} alt="logo" />
      </Link>
    </div>
  );
};

export default SimpleNavbar;
