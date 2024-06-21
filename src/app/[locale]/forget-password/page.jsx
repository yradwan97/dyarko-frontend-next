'use client'
import React from "react";
import Header from "../components/Shared/Header/Header"
import Footer from "../components/Shared/Footer/Footer"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import Input from "../components/Shared/Form/Input"
import Label from "../components/Shared/Form/Label"
import { useForm } from "react-hook-form";
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient"
import { toast } from "react-toastify"
import { useLocale, useTranslations } from "next-intl";

const ForgetPassword = () => {
  const t = useTranslations("ForgetPassword")
  const locale = useLocale()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const handleResetPassword = async (data) => {
    try {
      let res = await axios.post("/forget_password", { "email": data.email })

      if (res.status === 200) {
        toast.success(res.data.message)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const forgetPasswordSchema = {
    email: {
      id: "email",
      label: t("Email.label"),
      placeholder: t("Email.placeholder"),
      register: {
        ...register("email", {
          required: t("Email.required"),
          pattern: {
            value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
            message: t("Email.valid"),
          },
        }),
      },
      error: errors.email,
    }
  }
  return (
    <>
      <Header />
      <div className="container py-20">
        <form onSubmit={handleSubmit(handleResetPassword)} className="mx-auto md:w-1/2">
          <Typography
            variant="body-xl-bold"
            as="h2"
            className="mb-6 capitalize text-black text-center"
          >
            {t("title")}
          </Typography>
          <div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="forgetPass" className={locale === "ar" ? "text-end" : "text-start"}>
                {t("header")}
              </Label>
              <Input {...forgetPasswordSchema.email} error={errors.email} />
            </div>
            <div className={`mt-6 flex items-center ${locale === "ar" ? "justify-start gap-x-4 flex-row-reverse" : "justify-start"} space-x-4`}>
              <Button type="submit" variant="primary" className="mr-4">
                {t("request-button")}
              </Button>
              <Button
                type="button"
                variant="primary-outline"
                className="text-main"
                to="/login"
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ForgetPassword;
