import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";

function BackButton(props) {
  return (
    <div className={`mb-7 flex items-center ${props.className}`}>
      <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
      <Link href="/property-listing/rent" className="text-md font-bold text-main-600">
        Back to Home{" "}
      </Link>
    </div>
  );
}

export default BackButton;
