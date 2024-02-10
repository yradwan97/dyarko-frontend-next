'use client'
import React from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Typography from "../components/Shared/Typography";
import Button from "../components/Shared/Button";
import InputGroup from "../components/Shared/Form/InputGroup";
import { useForm } from "react-hook-form";


const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const contactFormSchema = {
    firstName: {
      id: "firstName",
      label: "First Name",
      placeholder: "Alaa",
      register: {
        ...register("firstName", {
          required: "First name is required",
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Please enter a valid name",
          },
        }),
      },
      error: errors.firstName,
    },
    lastName: {
      id: "lastName",
      label: "Last Name",
      placeholder: "Mohammed",
      register: {
        ...register("lastName", {
          required: "Last Name is required",
          pattern: {
            value: /^[a-zA-Z]+$/,
            message: "Please enter a valid name",
          },
        }),
      },
      error: errors.lastName,
    },
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
    phoneNumber: {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "+966124551456",
      register: {
        ...register("phoneNumber", {
          required: "Phone Number is required",
          minLength: {
            value: 8,
            message: "Minimum character length is 8",
          },
        }),
      },
      error: errors.phoneNumber,
    },
    message: {
      id: "message",
      label: "Message",
      placeholder: "12 Nour Stt. Jeddah",
      register: {
        ...register("message", {
          required: "Message is required",
        }),
      },
      error: errors.message,
    },
  };

  const signUpSubmitHandler = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Header />
      <main className="py-14">
        <div className="container">
          <Typography variant="h2" as="h2" className="mb-8">
            Contact Us
          </Typography>
          <form
            onSubmit={handleSubmit(signUpSubmitHandler)}
            className="mx-auto max-w-xl"
          >
            <Typography variant="body-xl-md" as="p" className="mb-5">
              Our friendly team would love to hear from you!
            </Typography>
            <div className="flex space-x-3">
              <InputGroup
                containerClass="flex-1"
                {...contactFormSchema.firstName}
              />
              <InputGroup
                containerClass="flex-1"
                {...contactFormSchema.lastName}
              />
            </div>
            <InputGroup {...contactFormSchema.email} />
            <InputGroup {...contactFormSchema.phoneNumber} />
            <InputGroup {...contactFormSchema.message} as="textarea" />
            <Button type="submit" variant="primary">
              Send Email
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
