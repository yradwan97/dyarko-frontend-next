import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";

const UpdateProfileForm = ({ defaultValues, onFormSubmit }) => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();

    useEffect(() => {
        setTimeout(() => {
            reset({
                ...defaultValues
            }, 500)
        })
    }, [defaultValues])

    return (
        <form onSubmit={handleSubmit(async (data) => onFormSubmit(data))}>
            <Typography variant="h4" className="pb-5 font-extrabold capitalize text-black">
                Update Profile
            </Typography>

            <InputGroup
                label="Name"
                type="text"
                id="name"
                placeholder="John Doe"
                register={register("name", { required: "Name is required" })}
                error={errors.name}
            />

            <InputGroup
                label="Phone Number"
                type="text"
                id="phoneNumber"
                placeholder="5XXXXXXX"
                register={register("phone", { required: "Phone Number is required" })}
                error={errors.phoneNumber}
            />

            <InputGroup
                label="Email"
                type="text"
                id="email"
                placeholder="hi@example.com"
                register={register("email", { required: "Email is required" })}
                error={errors.email}
            />

            {/* <InputGroup
                label="Address"
                type="text"
                id="address"
                placeholder="123 Kuwait City, Kuwait"
                register={register("address", { required: "Address is required" })}
                error={errors.address}
            /> */}

            <Button type="submit" variant="primary" className="mr-4 h-auto">
                Save Changes
            </Button>

            <Button type="button" variant="primary-outline">
                Cancel
            </Button>
        </form>
    );
};

export default UpdateProfileForm;
