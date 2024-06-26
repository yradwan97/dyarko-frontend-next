'use client'
import React from "react";
import InputGroup from "../../components/Shared/Form/InputGroup";
import PasswordInput from "../../components/Shared/Form/PasswordInput"
import Link from "next/link";
import Button from "../../components/Shared/Button";
import { useForm } from "react-hook-form";
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const router = useRouter()  
  const {update} = useSession()
  const t = useTranslations("Login.Form")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpSchema = {
    email: {
      id: "email",
      label: t("email.label"),
      placeholder: t("email.placeholder"),
      register: {
        ...register("email", {
          required: t("email.required"),
          pattern: {
            value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
            message: t("email.valid"),
          },
        }),
      },
      error: errors.email,
    },
    password: {
      id: "password",
      label: t("password.label"),
      placeholder: t("password.placeholder"),
      register: {
        ...register("password", {
          required: t("password.required"),
          minLength: {
            value: 6,
            message: t("password.valid"),
          },
        }),
      },
      error: errors.password,
    },
  };

  const loginSubmitHandler = async (data, e) => {  
    e.preventDefault()
    try {
      const response = await signIn("credentials", {...data, role: "user", redirect: false})
      
      if (response.error) {
        toast.error(t("validation.error"))
        return
      } else if (response.ok) {
        await update()
        router.push("/")
        
      }
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(loginSubmitHandler)}>
      <InputGroup {...signUpSchema.email} register={signUpSchema.email.register} error={errors.email} />
      <PasswordInput {...signUpSchema.password} register={signUpSchema.password.register} error={errors.password} />
      <Link
        href="/forget-password"
        className="mx-auto flex w-fit text-sm font-medium text-main-600"
      >
        {t("buttons.forgot-password")}
      </Link>
      <Button
        variant="primary"
        type="submit"
        className="text-md mt-8 mb-4 block w-full rounded-lg border bg-main-600 py-3.5 px-5 font-bold tracking-normal text-white transition-colors duration-500 ease-in-out hover:border-main-600 hover:bg-white hover:text-main-600"
      >
        {t("buttons.login")}
      </Button>
    </form>
    </>
  );
};

export default LoginForm;
