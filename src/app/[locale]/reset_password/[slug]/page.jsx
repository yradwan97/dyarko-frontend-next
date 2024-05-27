'use client'
import Footer from '@/src/app/[locale]/components/Shared/Footer/Footer'
import Header from '@/src/app/[locale]/components/Shared/Header/Header'
import ResetPasswordForm from "./ResetPasswordForm"

import React from 'react'

const ResetPassword = () => {

    return (
        <>
            <Header />
            <ResetPasswordForm />
            <Footer />
        </>
    )
}

export default ResetPassword