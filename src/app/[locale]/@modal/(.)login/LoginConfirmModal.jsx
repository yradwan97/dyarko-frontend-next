'use client'
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import Modal from "../../components/Shared/Modal"
import Typography from "../../components/Shared/Typography"
import Button from "../../components/Shared/Button"
import { useLocale, useTranslations } from "next-intl"
import { useSession } from "next-auth/react"

const LoginConfirmModal = () => {
    const router = useRouter()
    const handleClose = () => {
        router.back()
    }
    const { data: session } = useSession()

    const locale = useLocale()

    const t = useTranslations("Login.Modal")
    return (
        <Modal isOpen={true} onClose={handleClose}>
            <div className="flex flex-col">
                <div className="flex flex-col px-1 pb-6 mb-2">
                    <Typography as="h4" variant="body-md-medium" className="text-center">
                        {t("main")}
                    </Typography>
                    <Typography as="h5" variant="body-sm-medium" className="text-center">
                        {t("sub")}
                    </Typography>
                </div>
                <div className={`flex justify-between ${locale === "ar" ? "flex-row-reverse" : "flex-row"}`}>
                    <Button variant="primary" onClick={() => history.go(0)}>{t("confirm")}</Button>
                    <Button variant="primary" onClick={() => router.back()}>{t("cancel")}</Button>
                </div>
            </div>
        </Modal>
    )
}

export default LoginConfirmModal