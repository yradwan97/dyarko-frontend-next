import React, { useEffect, useState } from "react";
import Button from "../../../components/Shared/Button"
import Typography from "../../../components/Shared/Typography"
import { useForm } from "react-hook-form";
import PasswordInput from "@/src/app/[locale]/components/Shared/Form/PasswordInput";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query"
import { axiosClient as axios } from "../../../services/axiosClient"
import PasswordChangedSuccessfully from "./PasswordChangedSuccessfully"
import { toast } from "react-toastify"
import { prettifyError } from "@/src/app/[locale]/utils/utils";
import { useTranslations } from "next-intl";

const ChangePassword = () => {
  const [visible, setVisible] = useState(false)
  const t = useTranslations("Account.ChangePassword")

  const mutation = useMutation({
    mutationFn: async (params) => {
      const { current_password, new_password } = params;
      const body = {
        current_password,
        new_password
      }
      try {
        let response = await axios.put("/users/change_password", body)
        if (response.status === 200) {
          return response
        }

      } catch (e) {
        console.error(e)
        toast.error(prettifyError(e.response.data.errors[0].msg))
      }

    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors
  } = useForm();

  useEffect(() => {
    if (mutation.data?.data?.success) {
      setVisible(true)
    }
  }, [mutation])

  const handleFormSubmit = async (data, e) => {


    if (data.newPassword !== data.confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: t("dont-match"),
      });
    } else {
      clearErrors('confirmPassword')
    }
    let { oldPassword, newPassword } = data
    mutation.mutate({ "current_password": oldPassword, "new_password": newPassword })

  }

  const changePasswordSchema = {
    oldPassword: {
      id: "oldPassword",
      label: t("OldPassword.label"),
      placeholder: t("OldPassword.placeholder"),
      register: {
        ...register("oldPassword", {
          required: t("required"),
          minLength: {
            value: 6,
            message: t("min"),
          },
        }),
      },
      error: errors.oldPassword,
    },
    newPassword: {
      id: "newPassword",
      label: t("NewPassword.label"),
      placeholder: t("NewPassword.placeholder"),
      register: {
        ...register("newPassword", {
          required: t("required"),
          minLength: {
            value: 6,
            message: t("min"),
          },
        }),
      },
      error: errors.newPassword,
    },
    confirmPassword: {
      id: "confirmPassword",
      label: t("ConfirmPassword.label"),
      placeholder: t("ConfirmPassword.placeholder"),
      register: {
        ...register("confirmPassword", {
          required: t("required"),
          minLength: {
            value: 6,
            message: t("min"),
          },
        }),
      },
      error: errors.confirmPassword,
    }
  }

  return (
    <>
      <PasswordChangedSuccessfully visible={visible} setVisible={setVisible} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          variant="body-xl-bold"
          as="h2"
          className="mb-6 capitalize text-black text-center"
        >
          {t("title")}
        </Typography>

        <PasswordInput {...changePasswordSchema.oldPassword} label={changePasswordSchema.oldPassword.label} register={changePasswordSchema.oldPassword.register} error={errors.oldPassword} />
        <PasswordInput {...changePasswordSchema.newPassword} register={changePasswordSchema.newPassword.register} error={errors.newPassword} />
        <PasswordInput {...changePasswordSchema.confirmPassword} register={changePasswordSchema.confirmPassword.register} error={errors.confirmPassword} />
        <div className="mt-6 flex items-center justify-start space-x-4">
          <Button type="submit" disabled={!isValid} variant={isValid ? "primary" : "primary-outline"} className="mr-4 text-center">
            {t("submit")}
          </Button>
          <Button type="button" to="/forget-password" variant="primary-outline" className="text-main text-center">
            {t("forgot")}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
