// Profile.js
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import profile from "../../../../public/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import UpdateProfileForm from "./UpdateProfileForm";
import { axiosClient as axios } from "@/app/services/axiosClient"
import { toast } from "react-toastify"

const Profile = () => {
  const { data: session } = useSession();
  const [profileImg, setProfileImg] = useState(profile.src);
  const [file, setFile] = useState(null)
  const [formDefaultValues, setFormDefaultValues] = useState({})
  const [userProfile, setUserProfile] = useState()


  useEffect(() => {
    const getUser = async () => {
      try {
        let res = await axios.get("/users", {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`
          }
        })
        if (res.status === 200) {
          setUserProfile(res.data.data)
        }
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
  }, [session])

  useEffect(() => {
    if (userProfile) {
      const defaultValues = {
        name: userProfile.name,
        phone: userProfile.phone,
        email: userProfile.email
      }
      setFormDefaultValues(defaultValues)
      if (userProfile?.image) {
        setProfileImg(userProfile?.image)
      }
    }
  }, [userProfile])

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

  const onSubmit = async (data) => {
    console.log(data)
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
      try {
        const res = await axios.put("/users/image", formData, {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    }
    console.log([...formData.entries()])
    const updateProfileBody = { ...data }
    try {
      const response = await axios.put('/users', updateProfileBody, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Typography
        variant="h4"
        as="h4"
        className="pb-5 font-extrabold capitalize text-black"
      >
        Profile
      </Typography>
      <div className="flex items-center">
        <div className="mr-4 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-main-200">
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
              id="profilePicture"
              type="file"
              className="absolute inset-0 opacity-0"
              onChange={handleFileChange}
            />
          </Button>

          <Button type="button" onClick={handleRemovePicture} variant="primary-outline" className="w-full capitalize">
            Remove
          </Button>
        </div>
      </div>

      <UpdateProfileForm defaultValues={formDefaultValues} onFormSubmit={onSubmit} />
    </div>
  );
};

export default Profile;
