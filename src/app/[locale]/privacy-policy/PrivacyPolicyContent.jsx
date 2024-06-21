'use client'
import { useLocale, useTranslations } from "next-intl"
import Typography from "../components/Shared/Typography"
import { axiosClient as axios } from "../services/axiosClient"
import React, { useEffect, useState } from 'react'

const PrivacyPolicyContent = () => {
    const [userPrivacy, setUserPrivacy] = useState(null)
    const t = useTranslations("HomePage.Footer.Privacy")
    const isArabic = useLocale() === "ar"

    useEffect(() => {
        const getPrivacyPolicy = async () => {
            const res = await axios.get("/settings/privacy_policy")
            const userPriv = res.data.data.find(d => d.type === "user")

            if (userPriv) {
                setUserPrivacy(userPriv)
            }
        }
        getPrivacyPolicy()
    }, [])

    return (
        <div className='container py-20'>
            <Typography variant='h2' as='h2' className="text-black text-center mb-12">{t("header")}</Typography>

            <div className='md:px-14'>
                {userPrivacy && <div className={`flex flex-col ${isArabic ? "md:flex-row-reverse" : "md:flex-row"} md:justify-between gap-6`}>
                    <Typography variant='h4' as='h4' className="text-black">{t("content")}</Typography>
                    <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>

                        {isArabic ? <Typography variant='body-md-medium' as='p' className="text-gray-500">
                            {userPrivacy?.content_ar}
                        </Typography> : <Typography variant='body-md-medium' as='p' className="text-gray-500">
                            {userPrivacy?.content_en}
                        </Typography>}
                    </div>
                    {userPrivacy?.file && <div>
                        <Typography variant='h3' as='h3' className="text-black">{t("file")}</Typography>
                        <Link href={userPrivacy.file}>
                            {t("open-file")}
                        </Link>
                    </div>}
                </div>}
            </div>
        </div>
    )
}

export default PrivacyPolicyContent