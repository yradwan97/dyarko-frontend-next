
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";

const UpdateBankingForm = ({ defaultValues, onFormSubmit }) => {
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
                Update Banking
            </Typography>

            <InputGroup
                label="Bank Account"
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="bankAccount"
                placeholder="123456789"
                register={register("bankAccount", { required: "Account Number is required" })}
                error={errors.bankAccount}
            />

            <InputGroup
                label="IBAN"
                type="text"
                id="IBAN"
                className="!text-black placeholder:text-gray-400"
                placeholder="XXXXXXXXXXXXXXXXXXXXXX"
                register={register("IBAN", { required: "IBAN is required" })}
                error={errors.IBAN}
            />

            <InputGroup
                label="Swift Code"
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="swiftCode"
                placeholder="XXXXXXXXXXX"
                register={register("swiftCode", { required: "Swift Code is required" })}
                error={errors.swiftCode}
            />

            <Button type="submit" variant={!isFormDirty() ? "primary-outline" : "primary"} disabled={!isFormDirty()} className="mr-4 h-auto">
                Save Changes
            </Button>

            <Button type="button" variant="primary-outline" onClick={handleCancel}>
                Cancel
            </Button>
        </form>
    );
};

export default UpdateBankingForm;
