'use client'
import React, { Suspense } from "react";
import InputGroup from "../Shared/Form/InputGroup";
import PasswordInput from "../Shared/Form/PasswordInput"
import Link from "next/link";
import Button from "../../components/Shared/Button";
import { useForm } from "react-hook-form";
import {signIn, useSession} from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import {axiosClient as axios} from "../../services/axiosClient"
import useFcmToken from "@/app/utils/hooks/useFcmToken";

const LoginForm = () => {
  const router = useRouter()  
  const searchParams = useSearchParams().toString()
  // let callBack = decodeURIComponent(searchParams.substring(searchParams.indexOf("=") + 1))
  
  const {data:session, update} = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signUpSchema = {
    email: {
      id: "email",
      label: "Email",
      placeholder: "hi@example.com",
      register: {
        ...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
            message: "Please enter a valid email",
          },
        }),
      },
      error: errors.email,
    },
    password: {
      id: "password",
      label: "Password",
      placeholder: "Enter password",
      register: {
        ...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum character length is 6",
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
        toast.error("Invalid credentials. Try again!")
        return
      } else if (response.ok) {
        await update()
        let url = new URL(decodeURIComponent(response.url.substring(response.url.indexOf("=") + 1)))
        router.push(url.pathname ? url.pathname : "/")
        
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
        className="mx-auto inline-block w-fit text-sm font-medium text-main-600"
      >
        Forgot Password?
      </Link>
      <Button
        variant="primary"
        type="submit"
        className="text-md mt-8 mb-4 block w-full rounded-lg border bg-main-600 py-3.5 px-5 font-bold tracking-normal text-white transition-colors duration-500 ease-in-out hover:border-main-600 hover:bg-white hover:text-main-600"
      >
        Login
      </Button>
    </form>
    </>
  );
};

export default LoginForm;
