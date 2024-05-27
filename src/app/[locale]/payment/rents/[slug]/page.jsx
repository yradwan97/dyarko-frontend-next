'use client'
import { useParams } from 'next/navigation'
import React from 'react'
import Header from '@/src/app/[locale]/components/Shared/Header/Header'
import Footer from '@/src/app/[locale]/components/Shared/Footer/Footer'
import PaymentComponent from "../../PaymentComponent"

const RentPayment = () => {
    const { slug } = useParams()
    return (
        <>
            <Header />
            <PaymentComponent
                invoiceId={slug}
            />
            <Footer />
        </>
    )
}

export default RentPayment