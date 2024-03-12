import React, { useEffect } from 'react'
import PaymentButton from '@/app/application/[slug]/components/PaymentButton'
import Typography from '@/app/components/Shared/Typography'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

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
                <div className='mt-5 w-[350px] flex flex-col justify-between space-y-1 p-2 border border-main-300 rounded-lg'>
                    <div className='space-x-1 justify-between flex flex-row'>
                        <p>Rent type: </p>
                        <p className='text-main-yellow-600 ml-3 capitalize'> {invoice?.rent_type}</p>
                    </div>
                    <div className='space-x-1 justify-between flex flex-row'>
                        <p>Invoice date: </p>
                        <p className='text-main-yellow-600 ml-3'> {format(new Date(invoice?.date), "dd/MM/yyyy")}</p>
                    </div>
                    <div className='space-x-1 justify-between flex flex-row'>
                        <p>Owner Id: </p>
                        <p className='text-main-yellow-600 ml-3'> {invoice?.owner?.civilian_id}</p>
                    </div>
                    <div className='space-x-1 justify-between flex flex-row'>
                        <p>Owner: </p>
                        <p className='text-main-yellow-600 ml-3 capitalize'> {invoice?.owner?.name}</p>
                    </div>
                    <div className='space-x-1 justify-between flex flex-row'>
                        <p>Property code: </p>
                        <p className='text-main-yellow-600 ml-3'> {invoice?.property?.code}</p>
                    </div>
                    {invoice?.rent_type === "daily" && <div className='space-x-1 justify-between flex flex-row'>
                        <p>Daily price: </p>
                        <p className='text-main-yellow-600 ml-3'> {invoice?.property?.daily_price}</p>
                    </div>}
                    {invoice?.rent_type === "weekly" && <div className='space-x-1 justify-between flex flex-row'>
                        <p>Weekly price: </p>
                        <p className='text-main-yellow-600 ml-3'> {invoice?.property?.weekly_price}</p>
                    </div>}
                    {invoice?.rent_type === "monthly" && <div className='space-x-1 mb-2 justify-between flex flex-row'>
                        <p>Monthly price: </p>
                        <p className='text-main-yellow-600 ml-3'> KWD {invoice?.property?.monthly_price}</p>
                    </div>}
                    <hr />
                    <div className='space-x-1 mt-2 justify-between flex flex-row'>
                        <p>Total: </p>
                        <p className='text-main-yellow-600 ml-3'> KWD {invoice?.amount}</p>
                    </div>
                </div>
                {showPaymentButton && <PaymentButton
                    className="mt-4 mb-3 w-[20%]"
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