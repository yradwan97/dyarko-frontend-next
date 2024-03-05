'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useGetInvoice, payInvoice } from "@/app/payment/invoicesApi"
import Header from '@/app/components/Shared/Header/Header'
import Footer from '@/app/components/Shared/Footer/Footer'
import Loader from '@/app/components/Shared/Loader'
import { useSession } from 'next-auth/react'
import { toast } from "react-toastify"
import PaymentSuccessfuly from '@/app/application/[slug]/components/PaymentSuccessfuly'
import PaymentComponent from "../../PaymentComponent"

const InstallmentPayment = () => {
    const { slug } = useParams()
    const router = useRouter()
    const { invoice, refetch, isFetching } = useGetInvoice(slug, "installment")

    const { data: session } = useSession()
    const [paymentsDetails, setPaymentDetails] = useState({})
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false)
    const [showPaymentButton, setShowPaymentButton] = useState(false)

    useEffect(() => {

        const getPaymentDetails = async () => {
            try {
                let res = await payInvoice(slug, "installment", session?.user?.accessToken)

                if (res.success) {
                    setPaymentDetails(res.data)
                    setShowPaymentButton(true)
                }
            } catch (e) {
                console.error(e)
                if (e?.response?.data?.errors[0].msg === "invoice.already_paid") {
                    toast.warn("This invoice is already paid.")
                    setTimeout(() => {
                        router.push("/user")
                    }, 1500)
                    return
                } else {
                    toast.warn("something went wrong")
                }
            }
        }
        if (session) {
            getPaymentDetails()
        }
    }, [slug, session, router])

    useEffect(() => {
        refetch()
    }, [slug, refetch])

    if (isFetching) return <Loader />

    return (
        <>
            <Header />
            {paymentStatus === 'success' ? (
                <div>
                    <PaymentSuccessfuly points={invoice?.amount} visible={successVisible} setVisible={() => setSuccessVisible(false)} />
                </div>
            ) : (
                <PaymentComponent
                    invoice={invoice}
                    showPaymentButton={showPaymentButton}
                    paymentsDetails={paymentsDetails}
                    setPaymentStatus={setPaymentStatus}
                    paymentStatus={paymentStatus}
                />
            )}
            <Footer />
        </>
    )
}

export default InstallmentPayment