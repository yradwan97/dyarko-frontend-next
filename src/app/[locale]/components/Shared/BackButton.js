import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

function BackButton(props) {
  const t = useTranslations("General")
  return (
    <div className={`mb-7 flex items-center ${props.className}`}>
      <Link href={props.to} className="flex-row flex text-md font-bold text-main-600">
        <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
        {t("back")} {" "}
      </Link>
    </div>
  );
}

export default BackButton;