import React from "react";
import logo2 from "../../../../public/assets/logo2.png";
import FacebookSolid from "../../../components/UI/icons/FacebookSolid";
import InstagramOutline from "../../../components/UI/icons/InstagramOutline";
import LinkedInSolid from "../../../components/UI/icons/LinkedInSolid";
import TwitterSolid from "../../../components/UI/icons/TwitterSolid";
import Typography from "../../../components/Shared/Typography";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <div>
      <div className="container mx-auto py-20">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Image src={logo2} loading="lazy" alt=""/>
          </div>
          <div>
            <Typography variant="h5" as="h5" className="mb-3">
              Services
            </Typography>
            <Typography 
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/property-listing/rent">Rent</Link>
            </Typography>
            {/* <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/property-listing/buy">Buy</Link>
            </Typography> */}
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/installments">Installments</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/companies">Companies</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/videos">Videos</Link>
            </Typography>
          </div>
          <div>
            <Typography variant="h5" as="h5" className="mb-3">
              About Dyarko
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/terms-conditions">Terms & Conditions </Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              {/* TODO: Add Privacy Policy Link */}
              <Link href="/">Privacy Policy </Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/contact-us">Contact Us </Link>
            </Typography>
          </div>
          <div>
            <Typography variant="h5" as="h5" className="mb-3">
              Social Media
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/">Instagram</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/">Facebook</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/">LinkedIn</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/">Twitter</Link>
            </Typography>
          </div>
        </div>
      </div>
      <div className="border-t border-main-100">
        <div className="container mx-auto py-5">
          <div className="flex flex-col md:flex-row md:justify-between">
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-6 text-center text-gray-400 md:mb-0 md:text-left"
            >
              ©2023 Dyarko. All rights reserved
            </Typography>
            <div className="flex justify-center md:justify-end">
              <Link href="/">
                <FacebookSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href="/">
                <InstagramOutline className="mr-12 fill-gray-400" />
              </Link>
              <Link href="/">
                <TwitterSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href="/">
                <LinkedInSolid className="fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
