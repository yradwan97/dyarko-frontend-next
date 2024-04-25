import React, { useEffect, useState } from "react";
import Button from "@/app/components/Shared/Button";
import Typography from "@/app/components/Shared/Typography";
import profile from "../../../../public/assets/profile.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import PersonalInfoForm from "./PersonalInfoForm";
import BankingInfoForm from "./BankingInfoForm";
import { axiosClient as axios } from "@/app/services/axiosClient";
import { toast } from "react-toastify";
import "../tabs.css";
import { useGetUser } from "../../userApi";
import { prettifyError } from "@/app/utils/utils";
import LocalizationDropdown from "@/app/components/Shared/Header/LocalizationDropdown";

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(1);
  const [profileImg, setProfileImg] = useState(profile.src);
  const [file, setFile] = useState(null);
  const [formDefaultValuesPersonal, setFormDefaultValuesPersonal] = useState({});
  const [formDefaultValuesBanking, setFormDefaultValuesBanking] = useState({});
  const [userProfile, setUserProfile] = useState();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const { data, isFetching, refetch } = useGetUser(session?.user?.accessToken);

  useEffect(() => {
    refetch();
  }, [session, refetch]);

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data]);

  useEffect(() => {
    if (userProfile) {
      const defaultValuesPersonal = {
        name: userProfile.name,
        phone: userProfile.phone,
        email: userProfile.email,
      };
      const defaultValuesBanking = {
        bankAccount: userProfile?.bankAccount,
        IBAN: userProfile.IBAN,
        swiftCode: userProfile.swiftCode,
      };
      setFormDefaultValuesPersonal(defaultValuesPersonal);
      setFormDefaultValuesBanking(defaultValuesBanking);
      if (userProfile?.image) {
        setProfileImg(userProfile?.image);
      }
    }
  }, [userProfile]);

  const handleRemovePicture = () => {
    setFile(null);
    setProfileImg(session?.user?.image ? session?.user?.image : profile.src);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

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
    const updateBankingBody = { ...data };
    try {
      const response = await axios.put("/users", updateBankingBody, {
        headers: {
          "auth-token": `Bearer ${session?.user?.accessToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Banking information updated successfully.");
        refetch();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const onSubmitProfile = async (data) => {
    const { profileImage, ...rest } = data;
    const formData = new FormData();
    if (file) {
      formData.append("image", file);
      try {
        const res = await axios.put("/users/image", formData, {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Image updated successfully");
      } catch (e) {
        let message = e?.data?.response?.errors[0]?.msg;
        if (message) {
          toast.error(prettifyError(message));
        } else {
          toast.error("Error while uploading image!");
        }
      }
    }
    if (Object.keys(rest).length > 0) {
      const updateProfileBody = { ...rest };
      try {
        const response = await axios.put("/users", updateProfileBody, {
          headers: {
            "auth-token": `Bearer ${session?.user?.accessToken}`,
          },
        });
        if (response.status === 200) {
          toast.success("Profile updated successfully");
          refetch();
        }
      } catch (error) {
        let message = error?.data?.response?.errors[0]?.msg;
        if (message) {
          toast.error(prettifyError(message));
        } else {
          toast.error("Error while updating profile!");
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className=" mb-5 flex justify-center items-center">
        <div className="tabs-container flex flex-col sm:flex-row ">
          <div
            className={`tab ${activeTab === 1 && "active"}`}
            onClick={() => handleTabClick(1)}
          >
            Personal Info
          </div>
          <div
            className={`tab ${activeTab === 2 && "active"}`}
            onClick={() => handleTabClick(2)}
          >
            Banking Info
          </div>
        </div>
        <div className="ml-auto">
          <LocalizationDropdown
            selectedLang={selectedLanguage}
            onSelect={(lang) => setSelectedLanguage(lang)}
          />
        </div>
      </div>
      {activeTab === 1 ? (
        <>
          <Typography
            variant="h4"
            as="h4"
            className="pb-5 font-bold capitalize text-black"
          >
            Personal Information
          </Typography>
          <PersonalInfoForm
            profileImg={profileImg}
            setProfileImg={setProfileImg}
            defaultValues={formDefaultValuesPersonal}
            onFormSubmit={onSubmitProfile}
            setFile={setFile}
          />
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            as="h4"
            className="pb-5 font-bold capitalize text-black"
          >
            Bank Information
          </Typography>
          <BankingInfoForm
            defaultValues={formDefaultValuesBanking}
            onFormSubmit={onSubmitBanking}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
