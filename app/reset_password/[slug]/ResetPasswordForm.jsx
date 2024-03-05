import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from "react-query"
import Button from "../../components/Shared/Button"
import Typography from "../../components/Shared/Typography"
import { useForm } from "react-hook-form";
import PasswordInput from "@/app/components/Shared/Form/PasswordInput";
import { axiosClient as axios } from "../../services/axiosClient"
import PasswordChangedSuccessfully from '@/app/user/components/change-password/PasswordChangedSuccessfully'
import { toast } from "react-toastify"


const ResetPasswordForm = () => {
    const { slug: tempToken } = useParams()
    const [visible, setVisible] = useState(false)
    const mutation = useMutation({
        mutationFn: async (params) => {
            const { password } = params;
            const body = {
                password
            }
            try {
                let response = await axios.put(`/reset_password/${tempToken}`, body)
                if (response.status === 200) {
                    return response
                }

            } catch (e) {
                console.error(e)
                toast.error(prettifyError(e.response.data.errors[0].msg))
            }

        }
    })

    const handleFormSubmit = async (data, e) => {

        if (data.newPassword !== data.confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            });
        } else {
            clearErrors('confirmPassword')
        }
        let { newPassword } = data
        mutation.mutate({ "password": newPassword })

    }
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        clearErrors
    } = useForm();

    useEffect(() => {
        if (mutation.data?.status === 200) {
            setVisible(true)
        }
    }, [mutation])

    const resetPasswordSchema = {
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
        <div className="rounded-xl flex width-3/4 border border-main-100 p-6 items-center justify-center mt-6">
            <PasswordChangedSuccessfully visible={visible} setVisible={setVisible} />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Typography
                    variant="body-xl-bold"
                    as="h2"
                    className="mb-6 capitalize text-black"
                >
                    Reset Password
                </Typography>

                <PasswordInput {...resetPasswordSchema.newPassword} register={resetPasswordSchema.newPassword.register} error={errors.newPassword} />
                <PasswordInput {...resetPasswordSchema.confirmPassword} register={resetPasswordSchema.confirmPassword.register} error={errors.confirmPassword} />
                <div className="mt-6 flex items-center justify-start space-x-4">
                    <Button type="submit" disabled={!isValid} variant={isValid ? "primary" : "primary-outline"} className="mr-4">
                        Save new password
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm