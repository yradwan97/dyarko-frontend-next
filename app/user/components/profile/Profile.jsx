
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import profile from "../../../../public/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PersonalInfoForm from "./PersonalInfoForm";
import BankingInfoForm from "./BankingInfoForm"
import { axiosClient as axios } from "@/app/services/axiosClient"
import { toast } from "react-toastify"
import "../tabs.css"
import { useGetUser } from "../../userApi";

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(1);
  const [profileImg, setProfileImg] = useState(profile.src);
  const [file, setFile] = useState(null)
  const [formDefaultValuesPersonal, setFormDefaultValuesPersonal] = useState({})
  const [formDefaultValuesBanking, setFormDefaultValuesBanking] = useState({})
  const [userProfile, setUserProfile] = useState()

  const { data, isFetching, refetch } = useGetUser(session?.user?.accessToken)


  useEffect(() => {
    refetch()
  }, [session, refetch])

  useEffect(() => {
    if (data) {
      setUserProfile(data)
    }
  }, [data])

  useEffect(() => {
    if (userProfile) {
      const defaultValuesPersonal = {
        name: userProfile.name,
        phone: userProfile.phone,
        email: userProfile.email
      }
      const defaultValuesBanking = {
        bankAccount: userProfile?.bankAccount,
        IBAN: userProfile.IBAN,
        swiftCode: userProfile.swiftCode
      }
      setFormDefaultValuesPersonal(defaultValuesPersonal)
      setFormDefaultValuesBanking(defaultValuesBanking)
      if (userProfile?.image) {
        setProfileImg(userProfile?.image)
      }
    }
  }, [userProfile])

  const handleRemovePicture = () => {
    setFile(null)
    setProfileImg(session?.user?.image ? session?.user?.image : profile.src)
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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

  const onSubmitBanking = async (data) => {
    console.log(data)
    const updateBankingBody = { ...data }
    try {
      const response = await axios.put('/users', updateBankingBody, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      });
      if (response.status === 200) {
        toast.success("Banking information updated successfully.")
        refetch()
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  const onSubmitProfile = async (data) => {
    console.log(data)
    const formData = new FormData();
    if (file) {
      formData.append('image', file);
      console.log([...formData.entries()])
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
    const updateProfileBody = { ...data }
    try {
      const response = await axios.put('/users', updateProfileBody, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`
        }
      });
      if (response.status === 200) {
        toast.success("Profile updated successfully")
        refetch()
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="tabs-container mb-5">
        <div
          className={`tab ${activeTab === 1 && 'active'}`}
          onClick={() => handleTabClick(1)}
        >
          Personal Info
        </div>
        <div
          className={`tab ${activeTab === 2 && 'active'}`}
          onClick={() => handleTabClick(2)}
        >
          Banking Info
        </div>
      </div>
      {activeTab === 1 ?
        <>
          <Typography
            variant="h4"
            as="h4"
            className="pb-5 font-bold capitalize text-black"
          >
            Personal Information
          </Typography>

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

          <PersonalInfoForm defaultValues={formDefaultValuesPersonal} onFormSubmit={onSubmitProfile} />
        </>
        :
        <>
          <Typography
            variant="h4"
            as="h4"
            className="pb-5 font-bold capitalize text-black"
          >
            Bank Information
          </Typography>
          <BankingInfoForm defaultValues={formDefaultValuesBanking} onFormSubmit={onSubmitBanking} />
        </>}
    </div >
  );
};

export default Profile;
