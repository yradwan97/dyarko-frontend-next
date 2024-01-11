'use client'
import React, { useEffect, useState } from "react";
import Alert from "@/app/components/Shared/Alert"
import Typography from "../components/Shared/Typography";
import { useRouter } from "next/navigation";
import SimpleNavbar from "../components/Login/SimpleNavbar";
import signupArt from "@/public/assets/signup-art.jpg";
import SignUpForm from "./SignUpForm";
import PoweredBy from "../components/Login/PoweredBy";
import scrollToTop from "../utils/scrollToTop";
import AlertModal from "../components/Shared/AlertModal";
import { signup } from "../services/api/auth";


const SignUp = () => {
    const [userType, setUserType] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
  
    const signUpSubmitHandler = async (data: any) => {
      console.log(data)
      const response = await signup(data)
    };

    const onClose = () => setIsOpen(false);
  
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