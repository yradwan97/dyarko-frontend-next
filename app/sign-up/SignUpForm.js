import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "@/app/components/Shared/Form/Form";
import InputGroup from "../components/Shared/Form/InputGroup";
import PhoneInput from "@/app/components/Shared/Form/PhoneInput"
import PasswordInput from "@/app/components/Shared/Form/PasswordInput"
import CustomRadioGroup from "@/app/components/Shared/Form/CustomRadioGroup"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import Link from "next/link";
import SaleColoredIcon from "../components/UI/icons/SaleColoredIcon"
import HouseColoredIcon from "../components/UI/icons/HouseColoredIcon"

const OWNER_DASHBOARD_URL = process.env.NEXT_PUBLIC_NEXT_APP_OWNER_DASHBOARD_URL;



const SignUpForm = (props) => {
  const userTypes = [
    {
      value: "consumer",
      label: "Buy or Rent",
      icon: <HouseColoredIcon />,
    }
  ];
  const [userType, setUserType] = useState(userTypes[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  const userGroups = [
    {
      value: "owner",
      label: "owner",
    },
    {
      value: "agent",
      label: "real estate agent",
    },
    {
      value: "broker",
      label: "real estate broker",
    },
    {
      value: "developer",
      label: "real estate developer",
    },
  ];

  const signUpSchema = {
    name: {
      id: "name",
      label: "Name",
      placeholder: "Full Name",
      register: {
        ...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Please enter a valid name",
          },
        }),
      },
      error: errors.name,
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
    civilianId: {
      id: "civilianId",
      label: "Civilian ID",
      placeholder: "Ex. 813843478293",
      register: {
        ...register("civilianId", {
          required: "Civilian ID is required",
          pattern: {
            value: /^\d{11}$/,
            message: "Please enter a valid Civilian ID (11 numbers)",
          },
        }),
      },
      error: errors.civilianId,
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
    phoneNumber: {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "Enter phone Number",
      register: {
        ...register("phoneNumber", {
          required: "Phone Number is required",
        }),
      },
      error: errors.phoneNumber,
    },
  };

  if (userType === "owner")
    signUpSchema.group = {
      register: {
        ...register("group", {
          required: "Select account group",
        }),
      },
      error: errors.group,
    };

  const submitHandler = (data) => props.handler({...data, type: userType.value, role: "user"}, reset);

  return (
    <Form formHandleSubmit={handleSubmit} submitHandler={submitHandler}>
      <CustomRadioGroup
        value={userType}
        setValue={setUserType}
        list={userTypes}
        variant="yellow"
        radioClassName="w-36 h-36"
        {...signUpSchema.type}
      />
      {/* {userType === "owner" ? (
        <CustomRadioGroup
          value={userGroup}
          setValue={setUserGroup}
          list={userGroups}
          className="flex-col"
          hasIndicator={true}
          {...signUpSchema.group}
        />
      ) : null} */}
      <InputGroup {...signUpSchema.name} />
      <InputGroup {...signUpSchema.email} />
      <InputGroup {...signUpSchema.civilianId} />
      <InputGroup {...signUpSchema.phoneNumber} register={signUpSchema.phoneNumber.register} error={errors.phoneNumber} />
      {/* <PhoneInput {...signUpSchema.phoneNumber} /> */}
      <PasswordInput {...signUpSchema.password} />
      <Button
        type="submit"
        variant="primary"
        className="text-md mt-8 mb-4 block w-full rounded-lg bg-main-600 py-3.5 px-5 font-bold tracking-normal text-white"
      >
        Signup
      </Button>
      <Typography
        className="text-center text-gray-500 my-2"
        variant="body-sm-bold"
        as="p"
      >
        Already have a user account?{" "}
        <Link href="/login" className="text-black">
          Login Here
        </Link>
      </Typography>
      <Typography
          className="text-center text-gray-500"
          variant="body-sm-bold"
          as="p"
      >
        Already have an owner account?{" "}
        <Link href={OWNER_DASHBOARD_URL} className="text-black">
          Login Here
        </Link>
      </Typography>
    </Form>
  );
};

export default SignUpForm;
