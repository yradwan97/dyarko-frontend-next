'use client'
import React, { Suspense } from "react"
import LoginConfirmModal from "./LoginConfirmModal"
const page = () => {

    return (
        <Suspense>
            <LoginConfirmModal />
        </Suspense>
    )
}

export default page