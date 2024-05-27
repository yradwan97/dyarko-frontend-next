'use client'
import React, { Suspense, useEffect, useState } from "react"
import LoginConfirmModal from "./LoginConfirmModal"
import { useLocale } from "next-intl"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
const page = () => {
    const locale = useLocale()
    const router = useRouter()
    const [hasSession, setHasSession] = useState(false)
    const { data: session } = useSession()

    return (
        <Suspense>
            <LoginConfirmModal />
        </Suspense>
    )
}

export default page