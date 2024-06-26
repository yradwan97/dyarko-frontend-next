"use client";
import React, { useState } from "react";
import Typography from "../components/Shared/Typography";
import SimpleNavbar from "../login/components/SimpleNavbar";
import SignUpForm from "./SignUpForm";
import PoweredBy from "../login/components/PoweredBy";
import { signup } from "../services/api/auth";
import SignUpSuccessful from "./SignUpSuccessful";
import { prettifyError } from "../utils/utils";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

const SignUp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const locale = useLocale();
  const t = useTranslations("SignUp");

  const signUpSubmitHandler = async (data: any) => {
    try {
      const response = await signup(data);
      if (response.success) {
        setIsSuccess(true);
      }
    } catch (e: any) {
      console.error(e);
      toast.error(prettifyError(e.response.data.errors[0].msg));
    }
  };

  if (isSuccess) {
    return <SignUpSuccessful visible={isSuccess} setVisible={setIsSuccess} />;
  }
  return (
    <>
      <section
        className={`flex flex-col ${
          locale === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <section className={`flex-1 `}>
          <SimpleNavbar />
          <div className="container flex max-w-xl flex-col space-y-10 py-10 px-14">
            <section className="text-center">
              <Typography variant="h3" as="h3" className="mb-3 text-black">
                {t("title")}
              </Typography>
              <Typography
                variant="body-md-medium"
                as="p"
                className="text-gray-400"
              >
                {t("subtitle")}
              </Typography>
            </section>

            <SignUpForm handler={signUpSubmitHandler} />
          </div>
        </section>
        <PoweredBy />
      </section>
    </>
  );
};

export default SignUp;
