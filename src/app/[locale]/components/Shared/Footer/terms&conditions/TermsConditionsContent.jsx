'use client'
import React, { useEffect, useState } from 'react'
import Typography from '../../Typography'
import { axiosClient as axios } from '@/src/app/[locale]/services/axiosClient'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

const TermsConditionsContent = () => {
  const t = useTranslations("HomePage.Footer.Terms")
  const isArabic = useLocale() === "ar"
  const [userTerms, setUserTerms] = useState(null)

  useEffect(() => {
    const getTermsAndConditions = async () => {
      const res = await axios.get("/settings/terms_conditions")
      let userTerms = res.data.data.find(d => d.type === "user")
      if (userTerms) {
        setUserTerms(userTerms)
      }
    }
    getTermsAndConditions()
  }, [])


  return (
    <div className='container py-20'>
      <Typography variant='h2' as='h2' className="text-black text-center mb-12">{t("title")}</Typography>
      <div className='md:px-14'>
        {userTerms && <div className={`flex flex-col ${isArabic ? "md:flex-row-reverse" : "md:flex-row"} md:justify-between gap-6`}>
          <Typography variant='h4' as='h4' className="text-black">{t("content")}</Typography>
          <div className='w-full md:w-6/12 lg:w-5/12 space-y-8'>
            {isArabic ?
              <Typography variant='body-md-medium' as='p' className="text-gray-500">
                {userTerms.content_ar}
              </Typography>
              :
              <Typography variant='body-md-medium' as='p' className="text-gray-500">
                {userTerms.content_en}
              </Typography>
            }
          </div>
          {userTerms?.file && <div>
            <Typography variant='h3' as='h3' className="text-black">{t("file")}</Typography>
            <Link href={userTerms.file}>
              {t("open-file")}
            </Link>
          </div>}
        </div>}
      </div>
    </div>
  )
}

export default TermsConditionsContent