import React, { Suspense } from 'react'
import AccountSettings from "./components/AccountSettings"

const page = () => {
    return (
        <Suspense>
            <AccountSettings />
        </Suspense>
    )
}

export default page