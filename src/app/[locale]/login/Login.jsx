'use client'
import React, { useEffect } from 'react'
import SimpleNavbar from "./components/SimpleNavbar"
import Typography from '../components/Shared/Typography'
import Link from 'next/link'
import PoweredBy from './components/PoweredBy'
import LoginForm from './components/LoginForm'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'

const OWNER_DASHBOARD_URL = process.env.NEXT_PUBLIC_NEXT_APP_OWNER_DASHBOARD_URL;

const LoginPage = () => {
    const router = useRouter()
    const locale = useLocale()
    const { data: session } = useSession()
    const t = useTranslations("Login.Page")
    useEffect(() => {
        if (session) {
            router.back()
        }
    }, [session]);

    return (
        <>
            <div className="mx-auto">
                <div className={`flex ${locale === "ar" && "flex-row-reverse"}`}>
                    <div className="flex-1">
                        <SimpleNavbar />
                        <div className="mx-auto w-5/6 py-16 md:w-4/6 md:py-24 lg:w-4/6">
                            <Typography variant="h3" as="h3" className="mb-3 capitalize text-center">
                                {t("main")}
                            </Typography>
                            <Typography variant="body-md-medium" as="p" className="opacity-50 mb-2 text-center">
                                {t("sub")}
                            </Typography>
                            <LoginForm />
                            <Typography
                                variant="body-sm-medium"
                                as="p"
                                className="pt-6 text-center text-gray-500"
                            >
                                {t("is-owner")}{" "}
                                <Link
                                    href={OWNER_DASHBOARD_URL}
                                    className="font-bold text-black underline decoration-1"
                                >
                                    {t("owner-link")}
                                </Link>
                            </Typography>
                            <Typography
                                variant="body-sm-medium"
                                as="p"
                                className="pt-6 text-center text-gray-500"
                            >
                                {t("no-account")}{" "}
                                <Link
                                    href="/sign-up"
                                    className="font-bold text-black underline decoration-1"
                                >
                                    {t("sign-up")}
                                </Link>
                            </Typography>
                        </div>
                    </div>
                    <PoweredBy />
                </div>
            </div>
        </>
    )
}

export default LoginPage