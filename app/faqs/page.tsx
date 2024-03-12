"use client";
import { Disclosure } from "@headlessui/react";
import React from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Button from "../components/Shared/Button";
import Typography from "../components/Shared/Typography";
import MessageSolid from "../components/UI/icons/MessageSolid";

const Faqs = () => {
  return (
    <>
      <Header />
      <div className="container py-20">
        <Typography variant="h2" as="h2" className="text-black mb-8">
          FAQ’s
        </Typography>
        <div className="bg-main-100 p-8 rounded-lg md:w-7/12 mx-auto mb-6">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-start w-full text-left">
                  <Typography variant="h4" as="h4" className="text-black">
                    What methods of payment does homeline accept?
                  </Typography>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-6 w-6 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-md text-gray-500 mt-6">
                  A terms and conditions agreement outlines the website
                  administrator’s rules regarding user behavior, and provides.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="bg-main-100 p-8 rounded-lg md:w-7/12 mx-auto mb-6">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-start w-full text-left">
                  <Typography variant="h4" as="h4" className="text-black">
                    How do i place a cancellation request?
                  </Typography>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-6 w-6 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-md text-gray-500 mt-6">
                  A terms and conditions agreement outlines the website
                  administrator’s rules regarding user behavior, and provides.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="bg-main-100 p-8 rounded-lg md:w-7/12 mx-auto mb-6">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between items-start w-full text-left">
                  <Typography variant="h4" as="h4" className="text-black">
                    How do i edit or remove a payment method?
                  </Typography>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-6 w-6 text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="text-md text-gray-500 mt-6">
                  A terms and conditions agreement outlines the website
                  administrator’s rules regarding user behavior, and provides.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
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
