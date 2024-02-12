import React, { Suspense } from 'react'
import AccountSettings from "./components/account-settings/AccountSettings"

const page = () => {
    return (
        <Suspense>
            <AccountSettings />
        </Suspense>
    )
}

export default page