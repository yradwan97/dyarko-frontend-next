'use client'
import React from 'react'
import ImageUploadForm from "./ImageUploadForm"
import Header from "../../components/Shared/Header/Header"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Footer from '@/app/components/Shared/Footer/Footer'

const ConfirmAccount = () => {
    const router = useRouter()
    const { data: session } = useSession()
    if (session?.user?.is_confirmed) {
        router.push("/login")
    }
    return (
        <>
            <Header />
            <ImageUploadForm />
            <Footer />
        </>
    )
}

export default ConfirmAccount