import React from 'react'
import Typography from "../../components/Shared/Typography";
import { useLocale, useTranslations } from 'next-intl';
import Modal from "../../components/Shared/Modal"
import Link from 'next/link';

const PrivacyModal = ({ isOpen, onClose, policies }) => {
    const locale = useLocale()
    const t = useTranslations("SignUp.Modals")
    console.log(policies)

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Typography variant='h4' as='h4' className='text-center'>
                {t("privacy.title")}
            </Typography>
            <div className='border-1 border-solid border-main-400 rounded-lg p-1 mt-4'>
                <div className={`flex justify-between ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <span className='capitalize'>{t("content")}</span>
                    <span>{locale === "ar" ? policies[0]?.content_ar : policies[0]?.content_en}</span>
                </div>
                <div className={`flex w-full mt-2 items-center ${locale === "ar" ? "justify-end" : "justify-start"}`}>
                    {policies[0]?.file !== null && (
                        <button type="button" className="shadow-md hover:shadow-lg bg-main-400 text-white rounded-lg py-1 px-2">
                            <Link href={policies[0]?.file || "hi"} legacyBehavior passHref>
                                <a target='_blank' rel='noopener noreferer'>
                                    {t("view-file")}
                                </a>
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default PrivacyModal