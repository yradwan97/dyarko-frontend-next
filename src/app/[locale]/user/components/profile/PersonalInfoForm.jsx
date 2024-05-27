import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/src/app/[locale]/components/Shared/Form/InputGroup";
import Button from "@/src/app/[locale]/components/Shared/Button";
import profile from "../../../../../../public/assets/profile.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PersonalInfoForm = ({ defaultValues, onFormSubmit, profileImg, setFile, setProfileImg }) => {

    const { data: session } = useSession()
    const t = useTranslations("Account.Profile.Personal")
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
                        {t("upload")}
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
                        {t("remove")}
                    </Button>
                </div>
            </div>

            <InputGroup
                label={t("name")}
                type="text"
                id="name"
                className="!text-black capitalize placeholder:text-gray-400"
                placeholder={t("name-placeholder")}
                register={register("name", { required: t("name-required") })}
                error={errors.name}
            />

            <InputGroup
                label={t("phone")}
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="phoneNumber"
                placeholder={t("phone-placeholder")}
                register={register("phone", { required: t("phone-required") })}
                error={errors.phoneNumber}
            />

            <InputGroup
                label={t("email")}
                type="text"
                className="!text-black placeholder:text-gray-400"
                id="email"
                placeholder={t("email-placeholder")}
                register={register("email", { required: t("email-placeholder") })}
                error={errors.email}
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

export default PersonalInfoForm;
