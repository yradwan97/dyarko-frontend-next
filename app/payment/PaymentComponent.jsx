import React, { useEffect } from 'react'
import PaymentButton from '@/app/application/[slug]/components/PaymentButton'
import Typography from '@/app/components/Shared/Typography'
import { useRouter } from 'next/navigation'


const PaymentComponent = ({ invoice, paymentsDetails, showPaymentButton, paymentStatus, setPaymentStatus }) => {
    const router = useRouter()

    useEffect(() => {
        if (paymentStatus === "success") {
            setSuccessVisible(true)
            setTimeout(() => {
                router.push("/user")
            }, 5000)
        }
    }, [paymentStatus, router])

    return (
        <div className='border border-gray-400 h-full mt-4 p-2 rounded-lg container'>
            <Typography as='h4' variant='h4' className='mb-4'>
                {invoice && `Pay Invoice #${invoice?.invoice_no ? invoice?.invoice_no : invoice?.ID}`}
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
    )
}

export default PaymentComponent