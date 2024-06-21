
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/src/app/[locale]/components/Shared/Form/InputGroup";
import Button from "@/src/app/[locale]/components/Shared/Button";
import Typography from "@/src/app/[locale]/components/Shared/Typography";
import { useTranslations } from "next-intl";

const UpdateBankingForm = ({ defaultValues, onFormSubmit }) => {
    const t = useTranslations("Account.Profile.Banking")

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch
    } = useForm();

    useEffect(() => {
        setTimeout(() => {
            reset({
                ...defaultValues
            }, 500)
        })
    }, [reset, defaultValues])

    const watchedFields = watch()

    const isFormDirty = () => {
        for (const key in watchedFields) {
            if (watchedFields[key] !== defaultValues[key]) {
                return true
            }
        }
        return false
    }

    const handleCancel = () => {
        reset(defaultValues)
    };

    const onSubmit = async (data) => {
        onFormSubmit(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
                variant="h4"
                className="pb-5 font-extrabold capitalize text-black"
            >
                {t("title")}
            </Typography>

            <InputGroup
                label={t("account")}
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="bankAccount"
                placeholder={t("account-placeholder")}
                register={register("bankAccount", {
                    required: t("account-required"), pattern: {
                        value: /^\d{22}$/,
                        message: t("account-valid"),
                    },
                })}
                error={errors.bankAccount}
            />

            <InputGroup
                label={t("iban")}
                type="text"
                id="IBAN"
                className="!text-black placeholder:text-gray-400"
                placeholder={t("iban-placeholder")}
                register={register("IBAN", {
                    required: t("iban-required"), pattern: {
                        value: /^[a-zA-Z0-9]{30}$/,
                        message: t("iban-valid"),
                    },
                })}
                error={errors.IBAN}
            />

            <InputGroup
                label={t("swift")}
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="swiftCode"
                placeholder={t("swift-placeholder")}
                register={register("swiftCode", {
                    required: t("swift-required"), pattern: {
                        value: /^[a-zA-Z0-9]{11}$/,
                        message: t("swift-valid"),
                    },
                })}
                error={errors.swiftCode}
            />

            <Button type="submit" variant={!isFormDirty() ? "primary-outline" : "primary"} disabled={!isFormDirty()} className="mr-4 h-auto">
                {t("save")}
            </Button>

            <Button type="button" variant="primary-outline" onClick={handleCancel}>
                {t("cancel")}
            </Button>
        </form>
    );
};

export default UpdateBankingForm;
