"use client";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Button from "../components/Shared/Button";
import Typography from "../components/Shared/Typography";
import MessageSolid from "../components/UI/icons/MessageSolid";
import { axiosClient as axios } from "../services/axiosClient";
import { useLocale, useTranslations } from "next-intl";

interface FAQ {
  _id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

const Faqs = () => {
  const t = useTranslations("HomePage.Footer.About");
  const locale = useLocale();
  const isLocaleAR = locale === "ar";
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    const getFAQS = () =>
      axios.get("/faq").then((res) => {
        const { data } = res?.data;
        if (data) {
          setFaqs(data);
        }
      });

    getFAQS();
  }, []);
  return (
    <>
      <Header />
      <div className="container py-20">
        <Typography
          variant="h2"
          as="h2"
          className="text-black mb-12 text-center"
        >
          {t("faqs")}
        </Typography>
        {faqs.length > 0 &&
          faqs.map((faq: FAQ, index: number) => (
            <div
              key={index}
              className="bg-main-100 p-8 rounded-lg md:w-7/12 mx-auto mb-6"
            >
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`flex ${
                        isLocaleAR ? "flex-row-reverse" : "flex-row"
                      } justify-between items-center w-full`}
                    >
                      <Typography
                        variant="h4"
                        as="h4"
                        className="text-black capitalize"
                      >
                        {isLocaleAR ? faq.title_ar : faq.title_en}
                      </Typography>
                      <ChevronUpIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-6 w-6 text-black`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-gray-500 mt-6">
                      {isLocaleAR ? faq.description_ar : faq.description_en}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          ))}
        <Button
          variant="primary"
          className="group w-full md:w-7/12 mx-auto flex items-center space-x-4 !py-5"
        >
          <MessageSolid className="w-5 h-5 fill-white group-hover:fill-main-600" />
          <Typography
            variant="body-sm-medium"
            as="span"
            className="text-white group-hover:text-main-600"
          >
            Chat with customer support
          </Typography>
        </Button>
      </div>
      <Footer />
    </>
  );
};

export default Faqs;
