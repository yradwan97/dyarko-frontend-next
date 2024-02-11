'use client'
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/DYARKO LOGO PNG-01.png";
import FacebookSolid from "../../../components/UI/icons/FacebookSolid";
import InstagramOutline from "../../../components/UI/icons/InstagramOutline";
import LinkedInSolid from "../../../components/UI/icons/LinkedInSolid";
import TwitterSolid from "../../../components/UI/icons/TwitterSolid";
import Typography from "../../../components/Shared/Typography";
import Link from "next/link";
import Image from "next/image";
import { axiosClient as axios } from "@/app/services/axiosClient"

function Footer() {
  const [links, setLinks] = useState()
  const getLinks = async () => {
    try {
      let res = await axios.get("/settings/info")
      setLinks(res.data.data)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    getLinks()
  }, [])

  return (
    <div>
      <div className="container mx-auto py-20">
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-4">
          <div>
            <Image src={logo} height={160} width={160} loading="lazy" alt="" />
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
              <Link href={links?.instagram ? links?.instagram : "/"}>Instagram</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.facebook ? links?.facebook : "/"}>Facebook</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.linkedin ? links?.linkedin : "/"}>LinkedIn</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.twitter ? links?.twitter : "/"}>Twitter</Link>
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
              ©2024 Dyarko. All rights reserved
            </Typography>
            <div className="flex justify-center md:justify-end">
              <Link href={links?.facebook ? links?.facebook : "/"}>
                <FacebookSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.instagram ? links?.instagram : "/"}>
                <InstagramOutline className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.twitter ? links?.twitter : "/"}>
                <TwitterSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.linkedin ? links?.linkedin : "/"}>
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
