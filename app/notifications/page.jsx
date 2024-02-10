'use client'
import React, { useState } from 'react'
import Header from '../components/Shared/Header/Header'
import Footer from '../components/Shared/Footer/Footer'
import NotificationsContent from "./components/NotificationsContent"
const Notifications = () => {

    return (
        <>
            <Header />
            <NotificationsContent />
            <Footer />
        </>
    )
}

export default Notifications