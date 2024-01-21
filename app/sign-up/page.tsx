'use client'
import React, { useState } from "react";

import Typography from "../components/Shared/Typography";

import SimpleNavbar from "../components/Login/SimpleNavbar";
import signupArt from "@/public/assets/signup-art.jpg";
import SignUpForm from "./SignUpForm";
import PoweredBy from "../components/Login/PoweredBy";
import { signup } from "../services/api/auth";
import SignUpSuccessful from "./SignUpSuccessful";


const SignUp = () => {
    const [isSuccess, setIsSuccess] = useState(false)
  
    const signUpSubmitHandler = async (data: any) => {
      console.log(data)
      const response = await signup(data)
      if (response.status === 200) {
        setIsSuccess(true)
      }
    };
  
    if (isSuccess) {
      return <SignUpSuccessful visible={isSuccess} setVisible={setIsSuccess} />
    }
    return (
      <>
        
        <section className="flex flex-col lg:flex-row">
          <section className="flex-1">
            <SimpleNavbar />
            <div className="container flex max-w-xl flex-col space-y-10 py-10 px-14">
              <section className="text-center lg:text-start">
                <Typography variant="h3" as="h3" className="mb-3 text-black">
                  Sign Up
                </Typography>
                <Typography
                  variant="body-md-medium"
                  as="p"
                  className="text-gray-400"
                >
                  Create an account to get start.
                </Typography>
              </section>
              
              <SignUpForm handler={signUpSubmitHandler} />
            </div>
          </section>
          <PoweredBy img={signupArt.src} />
        </section>
      </>
    );
}

export default SignUp