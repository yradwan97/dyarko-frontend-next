import React from "react";
import Header from "../components/Shared/Header/Header"
import Footer from "../components/Shared/Footer/Footer"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import Input from "../components/Shared/Form/Input"
import Label from "../components/Shared/Form/Label"
import Link from "next/link"

const ForgetPassword = () => {
    
  return (
    <>
      <Header />
      <div className="container py-20">
        <form className="mx-auto md:w-1/2">
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
              <Input
                id="forgetPass"
                className=""
                placeholder="Type your mail address"
                register="forgetPass"
              />
            </div>
            <div className="mt-6 flex items-center justify-start space-x-4">
              <Button type="submit" variant="primary" className="mr-4">
                Request for new password
              </Button>
              <Button
                type="button"
                variant="primary-outline"
                className="text-main"
              >
                <Link href="/login">
                  Cancel
                </Link>
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
