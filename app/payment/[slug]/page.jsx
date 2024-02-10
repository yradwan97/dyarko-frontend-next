'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useGetInvoice, payInvoice } from "@/app/payment/invoicesApi"
import Header from '@/app/components/Shared/Header/Header'
import Footer from '@/app/components/Shared/Footer/Footer'
import Typography from '@/app/components/Shared/Typography'
import Loader from '@/app/components/Shared/Loader'
import { useSession } from 'next-auth/react'
import { toast } from "react-toastify"
import PaymentButton from '@/app/application/components/PaymentButton'
import PaymentSuccessfuly from '@/app/application/components/PaymentSuccessfuly'

const Payment = () => {
    const { slug } = useParams()
    const router = useRouter()
    const { invoice, refetch, isFetching } = useGetInvoice(slug)
    const { data: session } = useSession()
    const [paymentsDetails, setPaymentDetails] = useState({})
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false)
    const [showPaymentButton, setShowPaymentButton] = useState(false)

    useEffect(() => {

        const getPaymentDetails = async () => {
            try {
                let res = await payInvoice(slug, session?.user?.accessToken)
                console.log(res)
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

    useEffect(() => {
        if (paymentStatus === "success") {
            setSuccessVisible(true)
            setTimeout(() => {
                router.push("/user")
            }, 5000)
        }
    }, [paymentStatus, router])

    if (isFetching) return <Loader />

    return (
        <>
            <Header />
            {paymentStatus === 'success' ? (
                <div>
                    <PaymentSuccessfuly points={invoice?.amount} visible={successVisible} setVisible={() => setSuccessVisible(false)} />
                </div>
            ) : (
                <div className='border border-gray-400 h-full mt-4 p-2 rounded-lg container'>
                    <Typography as='h4' variant='h4' className='mb-4'>
                        {invoice && `Pay Invoice #${invoice?.invoice_no}`}
                    </Typography>
                    <div className='flex flex-col justify-center items-center'>
                        <Typography as='h4' className='text-center' variant='body-lg-bold'>Invoice Details</Typography>
                        <div className='mt-5 w-[250px] flex flex-col justify-between space-y-1 p-2 border border-main-300 rounded-lg'>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>Property code: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.property?.code}</p>
                            </div>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>Total: </p>
                                <p className='text-main-yellow-600 ml-3'> KWD {invoice?.amount}</p>
                            </div>
                        </div>
                        {showPaymentButton && <PaymentButton
                            className="mt-4 w-[20%]"
                            to={paymentsDetails.PayUrl}
                            disabled={paymentStatus === 'success'}
                            paymentStatus={paymentStatus}
                            setPaymentStatus={setPaymentStatus}
                        >
                            Pay
                        </PaymentButton>}
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default Payment