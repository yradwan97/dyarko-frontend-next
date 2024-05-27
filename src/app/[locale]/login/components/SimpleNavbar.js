import React from "react";
import logo from "../../../../../public/assets/DYARKO LOGO PNG-01.png";
import logoAr from "../../../../../public/assets/DYARKO LOGO PNG-02.png";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import LocalizationDropdown from "../../components/Shared/Header/LocalizationDropdown";

const SimpleNavbar = () => {
  const locale = useLocale()
  return (
    <div className="container w-full hidden py-2 lg:block">
      <div className={`flex ${locale === "ar" && "flex-row-reverse"} justify-between items-center`}>
        <Link href={"/"}>
          <Image src={locale === "ar" ? logoAr : logo} width={100} height={100} alt="logo" />
        </Link>
        <LocalizationDropdown />
      </div>
    </div>
  );
};

export default SimpleNavbar;
