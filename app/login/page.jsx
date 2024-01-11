'use client'

import React from "react"
import LoginPage from "./Login"
import {QueryProvider} from "../providers/providers"
export default function Page() {
    return (
        <QueryProvider>
            <LoginPage/>
        </QueryProvider>
    )
}