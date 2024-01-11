'use client'
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputGroup from "@/app/components/Shared/Form/InputGroup";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import profile from "../../../public/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = (props) => {
  const { data: session } = useSession()
  let userData;
  if (session) {
    //@ts-ignore
    userData = session?.user
  }

  let defaultValues
  if (userData) {
    defaultValues = {
      name: userData.name,
      phoneNumber: userData.phone,
      email: userData.email,
      address: userData.address || ""
    }
  }

  const [profileImg, setProfileImg] = useState(profile.src);
  const [identity, setIdentity] = useState(false);

  const {
    register,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        reset({
          ...defaultValues
        })
      }, 500)
    }
  }, [userData])

  const profileSchema = {
    name: {
      id: "name",
      label: "Name",
      placeholder: "John Doe",
      register: {
        ...register("name", {
          required: "Name is required",
          pattern: {
            value: /^[a-zA-Z ]+$/,
            message: "Please enter a valid name",
          },
        }),
      },
      error: errors.name,
    },
    address: {
      id: "address",
      label: "Address",
      placeholder: "123 Kuwait City, Kuwait",
      register: {
        ...register("address", {
          required: "Address is required"
        })
      }
    },
    phoneNumber: {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "5XXXXXXX",
      register: {
        ...register("phoneNumber", {
          required: "Phone Number is required",
          minLength: {
            value: 8,
            message: "Minimum character length is 8",
          },
        }),
      },
      error: errors.phoneNumber,
    },
    email: {
      id: "email",
      label: "Email",
      placeholder: "hi@example.com",
      register: {
        ...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9_\-.]+@[a-zA-Z-.]+.[a-zA-Z-.]+$/,
            message: "Please enter a valid email",
          },
        }),
      },
      error: errors.email,
    },
  };
  return (
    <form>
      <Typography
        variant="h4"
        as="h4"
        className="pb-5 font-extrabold capitalize text-black"
      >
        Profile
      </Typography>

      <Typography
        variant="body-sm-medium"
        as="h5"
        className="pb-3 font-bold capitalize"
      >
        Profile Picture
      </Typography>

      <div className="my-5 flex items-center">
        <div className="mr-4 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-main-200">
          <Image src={userData?.image || profileImg} className="h-12 w-12" alt="avatar" width={250} height={200} />
        </div>
        <div className="flex grow flex-col gap-4 sm:flex-row">
          <Button
            type="button"
            variant="primary"
            className="relative w-full text-black sm:w-auto"
          >
            Upload
            <input
              type="file"
              className="absolute inset-0 opacity-0 "
              onChange={(e) => setProfileImg(e.target.value)}
            />
          </Button>

          <Button
            type="button"
            variant="primary-outline"
            className="w-full capitalize sm:w-auto"
          >
            remove
          </Button>
        </div>
      </div>
      <InputGroup {...profileSchema.name} register={profileSchema.name.register} className="capitalize" />
      <InputGroup {...profileSchema.phoneNumber} register={profileSchema.phoneNumber.register} />
      <InputGroup {...profileSchema.email} register={profileSchema.email.register} />
      <InputGroup {...profileSchema.address} register={profileSchema.address.register} />
      <div className="flex items-end space-x-4">
        <InputGroup
          label="Identity Card"
          type="file"
          id="identityCard"
          containerClass="grow"
          setIdentity={setIdentity}
        />
        {!identity ? (
          <Button variant="primary" className="mb-4">
            Upload
          </Button>
        ) : (
          <Button
            variant="primary"
            className="mb-4 !border-main-orange-500 !bg-main-orange-500 hover:!border-main-orange-600 hover:!bg-main-orange-600 hover:!text-white"
          >
            Remove
          </Button>
        )}
      </div>
      <div className="mt-6 flex">
        <Button type="submit" variant="primary" className="mr-4 h-auto">
          Save Changes
        </Button>

        <Button variant="primary-outline" className="!px-6">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Profile;
