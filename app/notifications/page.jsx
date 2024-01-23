'use client'
import React, { useState } from 'react'
import Header from '../components/Shared/Header/Header'
import Footer from '../components/Shared/Footer/Footer'
import NotificationsContent from "./components/NotificationsContent"
const Notifications = () => {
    const [refetch, setRefetch] = useState(false)

    return (
        <>
            <Header refetch={refetch} />
            <NotificationsContent onTriggerChange={() => setRefetch(true)} />
            <Footer />
        </>
    )
}

export default Notifications