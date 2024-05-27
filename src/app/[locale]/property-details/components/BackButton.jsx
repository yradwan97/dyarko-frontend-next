import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

function BackButton(props) {
  const t = useTranslations("General")
  return (
    <div className={`mb-7 flex mt-3 items-center ${props.className || ""}`}>
      <ChevronLeftIcon className="mr-0.5 h-6 w-5 text-main-600" />
      <Link href="/property-listing/rent" className="text-md font-bold text-main-600">
        {t("back")}{" "}
      </Link>
    </div>
  );
}

export default BackButton;
