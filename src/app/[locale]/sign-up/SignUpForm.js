import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Form from "@/src/app/[locale]/components/Shared/Form/Form";
import InputGroup from "../components/Shared/Form/InputGroup";
import PasswordInput from "@/src/app/[locale]/components/Shared/Form/PasswordInput";
import Button from "../components/Shared/Button";
import Typography from "../components/Shared/Typography";
import Link from "next/link";
import HouseColoredIcon from "../components/UI/icons/HouseColoredIcon";
import { useLocale, useTranslations } from "next-intl";
import { Checkbox } from "@mui/material";
import Modal from '@/src/app/[locale]/components/Shared/Modal';
import { useGetTermsAndConditions } from "./hooks/useGetTermsAndConditions";
import { useGetPrivacyPolicy } from "./hooks/useGetPrivacyPolicy";
import { useGetRefundPolicy } from "./hooks/useGetRefundPolicy";
import TermsModal from "./modals/TermsModal"
import RefundModal from "./modals/RefundModal"
import PrivacyModal from "./modals/PrivacyModal"

const OWNER_DASHBOARD_URL = process.env.NEXT_PUBLIC_NEXT_APP_OWNER_DASHBOARD_URL;

const SignUpForm = (props) => {
  const t = useTranslations("SignUp");
  const [termsOpen, setTermsOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const locale = useLocale()
  const userTypes = [
    {
      value: "consumer",
      label: "Buy or Rent",
      icon: <HouseColoredIcon />,
    }
  ];
  const { terms, isSuccess } = useGetTermsAndConditions();
  const { policies, isSuccess: isPrivacySuccess } = useGetPrivacyPolicy();
  const { policies: refundPolicies, isSuccess: isRefundSuccess } = useGetRefundPolicy();
  console.log(terms, policies, refundPolicies)
  const hasTerms = isSuccess && terms.length > 0;
  const hasPolicies = isPrivacySuccess && policies.length > 0;
  const hasRefund = isRefundSuccess && refundPolicies.length > 0;
  const hasAny = hasTerms || hasRefund || hasPolicies;

  const {
    register,
    handleSubmit,
    reset,
    control,
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

  const submitHandler = (data) => props.handler({...data, type: userTypes[0].value, role: "user"}, reset);

  return (
    <>
    <Form formHandleSubmit={handleSubmit} submitHandler={submitHandler}>
      <InputGroup {...signUpSchema.name} />
      <InputGroup {...signUpSchema.email} />
      <InputGroup {...signUpSchema.civilianId} />
      <InputGroup {...signUpSchema.phoneNumber} register={signUpSchema.phoneNumber.register} error={errors.phoneNumber} />
      <PasswordInput {...signUpSchema.password} />
      
      {hasTerms && <>
        <div className={`flex items-center ${locale === "ar" ? "flex-row-reverse ml-auto" : "flex-row"}`}>
          <Controller
            name="termsAgree"
            control={control}
            rules={{ required: t("agree") }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
          <button type="button" className="shadow-md hover:shadow-lg rounded-lg py-1 px-2" onClick={() => setTermsOpen(true)}>
            {t("agree-terms")}
          </button>
        </div>
        <div className={`flex ${locale === "ar" && "justify-end"}`}>
          {errors.termsAgree && (
            <Typography className={`my-2 text-error`} variant="body-md-medium" as="span">
              {errors.termsAgree.message}
            </Typography>
          )}
        </div>
      </>}

      {hasRefund && <>
        <div className={`flex items-center ${locale === "ar" ? "flex-row-reverse ml-auto" : "flex-row"}`}>
          <Controller
            name="refundAgree"
            control={control}
            rules={{ required: t("agree") }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
          <button type="button" className="shadow-md hover:shadow-lg rounded-lg py-1 px-2" onClick={() => setRefundOpen(true)}>
            {t("agree-refund")}
          </button>
        </div>
        <div className={`flex ${locale === "ar" && "justify-end"}`}>
          {errors.refundAgree && (
            <Typography className={`my-2 text-error ${locale === "ar" && "ml-auto"}`} variant="body-md-medium" as="span">
              {errors.refundAgree.message}
            </Typography>
          )}
        </div>
      </>}

      {hasPolicies && <>
        <div className={`flex items-center ${locale === "ar" ? "flex-row-reverse ml-auto" : "flex-row"}`}>
          <Controller
            name="privacyAgree"
            control={control}
            rules={{ required: t("agree") }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} />
            )}
          />
          <button type="button" className="shadow-md hover:shadow-lg rounded-lg py-1 px-2" onClick={() => setPrivacyOpen(true)}>
            {t("agree-privacy")}
          </button>
        </div>
        <div className={`flex ${locale === "ar" && "justify-end"}`}>
          {errors.privacyAgree && (
            <Typography className={`my-2 text-error ${locale === "ar" && "ml-auto"}`} variant="body-md-medium" as="span">
              {errors.privacyAgree.message}
            </Typography>
          )}
        </div>
      </>}

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

    {isSuccess && <TermsModal isOpen={termsOpen} onClose={setTermsOpen} terms={terms} />}
    {isRefundSuccess && <RefundModal isOpen={refundOpen} onClose={setRefundOpen} policies={refundPolicies} />}
    {isPrivacySuccess && <PrivacyModal isOpen={privacyOpen} onClose={setPrivacyOpen} policies={policies} /> }
    </>
  );
};

export default SignUpForm;
