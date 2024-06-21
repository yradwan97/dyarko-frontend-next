import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useMutation } from "react-query"
import Button from "../../components/Shared/Button"
import Typography from "../../components/Shared/Typography"
import { useForm } from "react-hook-form";
import PasswordInput from "@/src/app/[locale]/components/Shared/Form/PasswordInput";
import { axiosClient as axios } from "../../services/axiosClient"
import PasswordChangedSuccessfully from '@/src/app/[locale]/user/components/change-password/PasswordChangedSuccessfully'
import { toast } from "react-toastify"
import { useLocale, useTranslations } from 'next-intl'


const ResetPasswordForm = () => {
    const { slug: tempToken } = useParams()
    const t = useTranslations("ResetPassword")
    const locale = useLocale()
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
                message: t("dont-match"),
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
        <div className="rounded-xl flex width-3/4 border border-main-100 p-6 items-center justify-center mt-6">
            <PasswordChangedSuccessfully visible={visible} setVisible={setVisible} />
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Typography
                    variant="body-xl-bold"
                    as="h2"
                    className="mb-6 capitalize text-black text-center"
                >
                    {t("title")}
                </Typography>

                <PasswordInput {...resetPasswordSchema.newPassword} register={resetPasswordSchema.newPassword.register} error={errors.newPassword} />
                <PasswordInput {...resetPasswordSchema.confirmPassword} register={resetPasswordSchema.confirmPassword.register} error={errors.confirmPassword} />
                <div className={`mt-6 flex items-center ${locale === "ar" ? "justify-end" : "justify-start"} gap-x-4`}>
                    <Button type="submit" disabled={!isValid} variant={isValid ? "primary" : "primary-outline"} className="mr-4">
                        {t("save")}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm