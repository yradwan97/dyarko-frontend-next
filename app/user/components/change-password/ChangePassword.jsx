import React, { useEffect, useState } from "react";
import Button from "../../../components/Shared/Button"
import Typography from "../../../components/Shared/Typography"
import { useForm } from "react-hook-form";
import PasswordInput from "@/app/components/Shared/Form/PasswordInput";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query"
import { axiosClient as axios } from "../../../services/axiosClient"
import PasswordChangedSuccessfully from "./PasswordChangedSuccessfully"

const ChangePassword = () => {

  const { data: session } = useSession()
  const [visible, setVisible] = useState(false)

  const mutation = useMutation({
    mutationFn: async (params) => {
      const { current_password, new_password, accessToken } = params;
      const body = {
        current_password,
        new_password
      }

      let response = await axios.put("/users/change_password", body)

      return response
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
        message: 'Passwords do not match',
      });
    } else {
      clearErrors('confirmPassword')
    }
    let { oldPassword, newPassword } = data
    mutation.mutate({ "current_password": oldPassword, "new_password": newPassword, "accessToken": session?.user?.accessToken })

  }

  const changePasswordSchema = {
    oldPassword: {
      id: "oldPassword",
      label: "Old Password",
      placeholder: "Enter Old password",
      register: {
        ...register("oldPassword", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum character length is 6",
          },
        }),
      },
      error: errors.oldPassword,
    },
    newPassword: {
      id: "newPassword",
      label: "New Password",
      placeholder: "Enter New password",
      register: {
        ...register("newPassword", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum character length is 6",
          },
        }),
      },
      error: errors.newPassword,
    },
    confirmPassword: {
      id: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Enter New password",
      register: {
        ...register("confirmPassword", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum character length is ",
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
          className="mb-6 capitalize text-black"
        >
          Change Password
        </Typography>

        <PasswordInput {...changePasswordSchema.oldPassword} label={changePasswordSchema.oldPassword.label} register={changePasswordSchema.oldPassword.register} error={errors.oldPassword} />
        <PasswordInput {...changePasswordSchema.newPassword} register={changePasswordSchema.newPassword.register} error={errors.newPassword} />
        <PasswordInput {...changePasswordSchema.confirmPassword} register={changePasswordSchema.confirmPassword.register} error={errors.confirmPassword} />
        <div className="mt-6 flex items-center justify-start space-x-4">
          <Button type="submit" disabled={!isValid} variant="primary" className="mr-4">
            Save new password
          </Button>
          <Button type="button" to="/forget-password" variant="primary-outline" className="text-main">
            Forgot password
          </Button>
        </div>
      </form>
    </>
  );
};

export default ChangePassword;
