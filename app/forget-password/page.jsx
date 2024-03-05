'use client'
import React from "react";
import Header from "../components/Shared/Header/Header"
import Footer from "../components/Shared/Footer/Footer"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import Input from "../components/Shared/Form/Input"
import Label from "../components/Shared/Form/Label"
import { useForm } from "react-hook-form";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { toast } from "react-toastify"

const ForgetPassword = () => {
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
            className="mb-6 capitalize text-black"
          >
            Forgot Password
          </Typography>
          <div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="forgetPass" className="">
                Enter mail address
              </Label>
              <Input {...forgetPasswordSchema.email} error={errors.email} />
            </div>
            <div className="mt-6 flex items-center justify-start space-x-4">
              <Button type="submit" variant="primary" className="mr-4">
                Request for new password
              </Button>
              <Button
                type="button"
                variant="primary-outline"
                className="text-main"
                to="/login"
              >
                Cancel
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
