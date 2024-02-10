'use client'

import React, { Suspense } from "react"
import LoginPage from "./Login"
import { QueryProvider } from "../providers/providers"
export default function Page() {
    return (
        <QueryProvider>
            <Suspense>
                <LoginPage />
            </Suspense>
        </QueryProvider>
    )
}