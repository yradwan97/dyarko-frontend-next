import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";

const PersonalInfoForm = ({ defaultValues, onFormSubmit }) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch
    } = useForm();

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

    const watchedFields = watch();

    useEffect(() => {
        setTimeout(() => {
            reset({
                ...defaultValues
            }, 500)
        })
    }, [reset, defaultValues])

    return (
        <form onSubmit={handleSubmit(async (data) => onFormSubmit(data))}>
            <Typography variant="h4" className="pb-5 font-extrabold capitalize text-black">
                Update Profile
            </Typography>

            <InputGroup
                label="Name"
                type="text"
                id="name"
                className="!text-black capitalize placeholder:text-gray-400"
                placeholder="John Doe"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
            />

            <InputGroup
                label="Phone Number"
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="phoneNumber"
                placeholder="5XXXXXXX"
                register={register("phone", { required: "Phone Number is required" })}
                error={errors.phoneNumber}
            />

            <InputGroup
                label="Email"
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="email"
                placeholder="hi@example.com"
                register={register("email", { required: "Email is required" })}
                error={errors.email}
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

export default PersonalInfoForm;
