import React, { useEffect, useState } from "react";
import Typography from "@/src/app/[locale]/components/Shared/Typography";
import profile from "../../../../../../public/assets/profile.png";
import { useSession } from "next-auth/react";
import PersonalInfoForm from "./PersonalInfoForm";
import BankingInfoForm from "./BankingInfoForm";
import { axiosClient as axios } from "@/src/app/[locale]/services/axiosClient";
import { toast } from "react-toastify";
import "../tabs.css";
import { useGetUser } from "../../userApi";
import { prettifyError } from "@/src/app/[locale]/utils/utils";
import { useTranslations } from "next-intl";

const Profile = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(1);
  const [profileImg, setProfileImg] = useState(profile.src);
  const [file, setFile] = useState(null);
  const [formDefaultValuesPersonal, setFormDefaultValuesPersonal] = useState({});
  const [formDefaultValuesBanking, setFormDefaultValuesBanking] = useState({});
  const [userProfile, setUserProfile] = useState();
  const t = useTranslations("Account.Profile")
  const { data, refetch } = useGetUser(session?.user?.accessToken);

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

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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
        toast.success(t("Banking.banking-success"));
        refetch();
      }
    } catch (error) {
      toast.error(t("Banking.banking-fail"));
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
        toast.success(t("Personal.image-success"));
      } catch (e) {
        let message = e?.data?.response?.errors[0]?.msg;
        if (message) {
          toast.error(prettifyError(message));
        } else {
          toast.error(t("Personal.image-fail"));
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
          toast.success(t("Personal.profile-success"));
          refetch();
        }
      } catch (error) {
        let message = error?.data?.response?.errors[0]?.msg;
        if (message) {
          toast.error(prettifyError(message));
        } else {
          toast.error(t("Personal.profile-fail"));
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
            {t("Tabs.personal")}
          </div>
          <div
            className={`tab ${activeTab === 2 && "active"}`}
            onClick={() => handleTabClick(2)}
          >
            {t("Tabs.banking")}
          </div>
        </div>
      </div>
      {activeTab === 1 ? (
        <>
          <Typography
            variant="h4"
            as="h4"
            className="pb-5 font-bold capitalize text-black text-center"
          >
            {t("Sections.personal")}
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
            className="pb-5 font-bold capitalize text-black text-center"
          >
            {t("Sections.banking")}
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
