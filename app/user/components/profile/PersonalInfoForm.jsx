import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import profile from "../../../../public/assets/profile.png";
import { useSession } from "next-auth/react";
// import LocalizationDropdown from "@/app/components/Shared/Header/LocalizationDropdown";
import Image from "next/image";

const PersonalInfoForm = ({ defaultValues, onFormSubmit, profileImg, setFile, setProfileImg }) => {

    const { data: session } = useSession()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
        watch
    } = useForm({
        defaultValues
    });

    const watchedFields = watch();

    useEffect(() => {
        reset(defaultValues);
    }, [reset, defaultValues]);

    const isFormDirty = () => {
        for (const key in watchedFields) {
            if (watchedFields[key] !== defaultValues[key]) {
                return true;
            }
        }
        return false;
    };

    const handleCancel = () => {
        reset(defaultValues);
    };

    const handleRemovePicture = () => {
        setFile(null)
        setProfileImg(session?.user?.image ? session?.user?.image : profile.src)
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImg(event.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onSubmit = async (formData) => {
        // Filter out the data that has changed
        const changedData = {};
        for (const key in formData) {
            if (formData[key] !== defaultValues[key]) {
                changedData[key] = formData[key];
            }
        }

        // Call the onFormSubmit function with the changed data
        await onFormSubmit(changedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex items-center">
                <div className={`mr-4 w-[100px] min-w-[69px] min-h-[69px] items-center ${(profileImg.src !== profile.src) ? "bg-white" : "bg-main-200"} justify-center rounded-full border-r-[50%] flex`}>
                    <Image src={profileImg} className="rounded-full" alt="avatar" width={250} height={200} />
                </div>
                <div className="flex flex-row gap-4">
                    <Button
                        type="button"
                        variant="primary"
                        className="relative w-full text-black sm:w-auto"
                    >
                        Upload
                        <input
                            {...register("profileImage")}
                            id="profilePicture"
                            type="file"
                            className="absolute inset-0 opacity-0"
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Button
                        type="button"
                        variant="primary-outline"
                        onClick={handleRemovePicture}
                        className="w-full capitalize"
                    >
                        Remove
                    </Button>
                </div>
            </div>

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
