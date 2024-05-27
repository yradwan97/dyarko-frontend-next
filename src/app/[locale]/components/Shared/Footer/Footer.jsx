'use client'
import React, { useEffect, useState } from "react";
import logo from "../../../../../../public/assets/DYARKO LOGO PNG-01.png";
import logoAr from "../../../../../../public/assets/DYARKO LOGO PNG-02.png";
import FacebookSolid from "../../UI/icons/FacebookSolid";
import InstagramOutline from "../../UI/icons/InstagramOutline";
import LinkedInSolid from "../../UI/icons/LinkedInSolid";
import TwitterSolid from "../../UI/icons/TwitterSolid";
import TiktokSolid from "../../UI/icons/TiktokSolid"
import Typography from "../Typography";
import Link from "next/link";
import Image from "next/image";
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import echosoftLogo from "../../../../../../public/assets/echo soft.png"
import { useLocale, useTranslations } from "next-intl";

function Footer() {
  const t = useTranslations("HomePage.Footer")
  const locale = useLocale()
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
        <div className={`grid gap-4 sm:grid-cols-1 md:grid-cols-4`}>
          <div className={`${locale === "ar" ? "order-4 ml-auto" : "order-1"}`}>
            <Image src={locale === "ar" ? logoAr : logo} height={160} width={160} loading="lazy" alt="" />
          </div>
          <div className={`flex flex-col ${locale === "ar" ? "text-end" : "text-start"}`}>
            <Typography variant="h5" as="h5" className="mb-3">
              {t("Services.title")}
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/property-listing/rent">{t("Services.rent")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/installments">{t("Services.installment")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/companies">{t("Services.companies")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/videos">{t("Services.videos")}</Link>
            </Typography>
          </div>
          <div className={`flex flex-col ${locale === "ar" ? "text-end" : "text-start"}`}>
            <Typography variant="h5" as="h5" className="mb-3">
              {t("About.title")}
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/terms-conditions">{t("About.terms")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/privacy-policy">{t("About.privacy")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href="/contact-us">{t("About.contact")}</Link>
            </Typography>
          </div>
          <div className={`flex flex-col ${locale === "ar" ? "text-end" : "text-start"}`}>
            <Typography variant="h5" as="h5" className="mb-3">
              {t("Social.title")}
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.instagram ? links?.instagram : "/"}>{t("Social.instagram")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.facebook ? links?.facebook : "/"}>{t("Social.facebook")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.linkedin ? links?.linkedin : "/"}>{t("Social.linkedin")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.twitter ? links?.twitter : "/"}>{t("Social.twitter")}</Link>
            </Typography>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-3 text-gray-600"
            >
              <Link href={links?.tiktok ? links?.tiktok : "/"}>{t("Social.tiktok")}</Link>
            </Typography>
          </div>
        </div>
      </div>
      <div className="border-t border-main-100">
        <div className="container mx-auto py-5">
          <div className={`flex flex-col ${locale === "ar" ? "md:flex-row-reverse" : "md:flex-row"} md:justify-between items-center`}>
            <Typography
              variant="body-sm-medium"
              as="p"
              className="mb-6 text-center text-gray-400 md:mb-0 md:text-left"
            >
              {t("Copyright.1")}
            </Typography>
            <div className={`flex ${locale === "ar" ? "flex-row-reverse" : "flex-row"} items-center`}>
              <Typography
                variant="body-sm-medium"
                as="p"
                className="mb-6 text-left text-gray-400 md:mb-0 md:text-left"
              >
                {t("Copyright.2")}
              </Typography>
              <Image src={echosoftLogo.src} height={40} width={40} alt="echosoft logo" />
              <Typography
                variant="body-sm-medium"
                as="p"
                className="mb-6 text-left text-gray-400 md:mb-0 md:text-left"
              >
                {t("Copyright.3")}
              </Typography>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href={links?.instagram ? links?.instagram : "/"}>
                <InstagramOutline className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.facebook ? links?.facebook : "/"}>
                <FacebookSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.linkedin ? links?.linkedin : "/"}>
                <LinkedInSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.twitter ? links?.twitter : "/"}>
                <TwitterSolid className="mr-12 fill-gray-400" />
              </Link>
              <Link href={links?.tiktok ? links?.tiktok : "/"}>
                <TiktokSolid className="fill-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
