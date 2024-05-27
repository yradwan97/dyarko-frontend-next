import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "@/src/app/[locale]/components/Shared/Form/Form";
import InputGroup from "../components/Shared/Form/InputGroup";
import PhoneInput from "@/src/app/[locale]/components/Shared/Form/PhoneInput"
import PasswordInput from "@/src/app/[locale]/components/Shared/Form/PasswordInput"
import CustomRadioGroup from "@/src/app/[locale]/components/Shared/Form/CustomRadioGroup"
import Button from "../components/Shared/Button"
import Typography from "../components/Shared/Typography"
import Link from "next/link";
import SaleColoredIcon from "../components/UI/icons/SaleColoredIcon"
import HouseColoredIcon from "../components/UI/icons/HouseColoredIcon"
import { useTranslations } from "next-intl";

const OWNER_DASHBOARD_URL = process.env.NEXT_PUBLIC_NEXT_APP_OWNER_DASHBOARD_URL;



const SignUpForm = (props) => {
  const t = useTranslations("SignUp")
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

  const signUpSchema = {
    name: {
      id: "name",
      label: t("Name.label"),
      placeholder: t("Name.placeholder"),
      register: {
        ...register("name", {
          required: t("Name.required"),
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: t("Name.valid"),
          },
        }),
      },
      error: errors.name,
    },
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
    },
    civilianId: {
      id: "civilianId",
      label: t("CivilianId.label"),
      placeholder: t("CivilianId.placeholder"),
      register: {
        ...register("civilianId", {
          required: t("CivilianId.required"),
          pattern: {
            value: /^\d{12}$/,
            message: t("CivilianId.valid"),
          },
        }),
      },
      error: errors.civilianId,
    },
    password: {
      id: "password",
      label: t("Password.label"),
      placeholder: t("Password.placeholder"),
      register: {
        ...register("password", {
          required: t("Password.required"),
          minLength: {
            value: 6,
            message: t("Password.valid"),
          },
        }),
      },
      error: errors.password,
    },
    phoneNumber: {
      id: "phoneNumber",
      label: t("Phone.label"),
      placeholder: t("Phone.placeholder"),
      register: {
        ...register("phoneNumber", {
          required: t("Phone.required"),
        }),
      },
      error: errors.phoneNumber,
    },
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
        {t("sign-up")}
      </Button>
      <Typography
        className="text-center text-gray-500 my-2"
        variant="body-sm-bold"
        as="p"
      >
        {t("got-account")}{" "}
        <Link href="/login" className="text-black">
          {t("login")}
        </Link>
      </Typography>
      <Typography
          className="text-center text-gray-500"
          variant="body-sm-bold"
          as="p"
      >
        {t("is-owner")}{" "}
        <Link href={OWNER_DASHBOARD_URL} className="text-black">
          {t("login")}
        </Link>
      </Typography>
    </Form>
  );
};

export default SignUpForm;
