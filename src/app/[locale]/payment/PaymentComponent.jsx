import React, { useEffect, useState } from 'react'
import PaymentButton from '@/src/app/[locale]/application/[slug]/components/PaymentButton'
import Typography from '@/src/app/[locale]/components/Shared/Typography'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import PaymentDetails from '../application/[slug]/components/PaymentDetails'
import { payInvoice, useGetInvoice } from './invoicesApi'
import { useSession } from 'next-auth/react'
import PaymentSuccessfuly from '@/src/app/[locale]/application/[slug]/components/PaymentSuccessfuly'
import Loader from '../components/Shared/Loader'
import Button from '../components/Shared/Button'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'


const PaymentComponent = ({ invoiceId }) => {
    const router = useRouter()
    const { invoice, refetch, isFetching } = useGetInvoice(invoiceId, "rent")
    const { data: session } = useSession()
    const [successVisible, setSuccessVisible] = useState(false)
    const [showPaymentButton, setShowPaymentButton] = useState(false)
    const [paymentsDetails, setPaymentDetails] = useState({})
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const t = useTranslations("Payment")
    console.log(invoice, paymentsDetails)

    const getPaymentDetails = async () => {
        try {
            let res = await payInvoice(invoiceId, "rent", paymentMethod.key, session?.user?.accessToken)

            if (res.success) {
                setPaymentDetails(res.data)
                setShowPaymentButton(true)
            }
        } catch (e) {
            console.error(e)
            if (e?.response?.data?.errors[0].msg === "invoice.already_paid") {
                toast.warn(t("invoice-paid"))
                setTimeout(() => {
                    router.push("/user")
                }, 1500)
                return
            } else {
                toast.warn(t("error"))
            }
        }
    }
    useEffect(() => {
        if (paymentStatus === "success") {
            setSuccessVisible(true)
            setTimeout(() => {
                router.push("/user")
            }, 5000)
        }
    }, [paymentStatus, router])

    if (isFetching) return <Loader />

    return paymentStatus === "success" ?
        (
            <PaymentSuccessfuly points={invoice?.amount} visible={successVisible} setVisible={() => setSuccessVisible(false)} />
        ) : (
            <>
                <Typography as='h4' variant='h4' className='text-center mt-4'>
                    {invoice && `${t("title")} #${invoice?.invoice_no ? invoice?.invoice_no : invoice?.ID}`}
                </Typography>
                <div className='flex border border-gray-400 h-full mt-4 p-3 w-5/6 rounded-lg justify-center container'>
                    {!showPaymentButton && <div className='flex w-1/2 flex-col justify-center items-center h-full'>
                        <div className='w-1/2'>
                            <PaymentDetails onChange={(e) => setPaymentMethod(e)} titleClass='mt-3' />
                            <Button disabled={!paymentMethod} variant='primary' className='mt-4 w-full' onClick={getPaymentDetails}>{t("confirm")}</Button>
                        </div>
                    </div>}
                    <div className='flex flex-col justify-center items-center'>
                        <Typography as='h4' className='text-center' variant='body-lg-bold'>Invoice Details</Typography>
                        <div className='mt-5 w-[350px] flex flex-col justify-between space-y-1 p-2 border border-main-300 rounded-lg'>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("type")}: </p>
                                <p className='text-main-yellow-600 ml-3 capitalize'> {invoice?.rent_type}</p>
                            </div>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("date")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {format(new Date(invoice?.date), "dd/MM/yyyy")}</p>
                            </div>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("owner-id")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.owner?.civilian_id}</p>
                            </div>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("owner")}: </p>
                                <p className='text-main-yellow-600 ml-3 capitalize'> {invoice?.owner?.name}</p>
                            </div>
                            <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("code")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.property?.code}</p>
                            </div>
                            {invoice?.rent_type === "daily" && <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("daily")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.property?.daily_price}</p>
                            </div>}
                            {invoice?.rent_type === "weekly" && <div className='space-x-1 justify-between flex flex-row'>
                                <p>{t("weekly")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.property?.weekly_price}</p>
                            </div>}
                            {invoice?.rent_type === "monthly" && <div className='space-x-1 mb-2 justify-between flex flex-row'>
                                <p>{t("monthly")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.property?.monthly_price} {t("kwd")}</p>
                            </div>}
                            <hr />
                            <Typography as='h4' className='text-center' variant='body-md-medium'>
                                {t("detaoo;s")}
                            </Typography>
                            {invoice?.details && invoice?.details.length > 0 &&
                                <>
                                    {invoice?.details.map((d, i) => (
                                        <div key={i} className='space-x-1 mb-2 justify-between flex flex-row'>
                                            <p className='capitalize'>{d.description}</p>
                                            <p className='text-main-yellow-600 ml-3'> {d.amount} {t("kwd")}</p>
                                        </div>
                                    ))}
                                </>
                            }
                            <hr />
                            <div className='space-x-1 mt-2 justify-between flex flex-row'>
                                <p>{t("total")}: </p>
                                <p className='text-main-yellow-600 ml-3'> {invoice?.amount} {t("kwd")}</p>
                            </div>
                        </div>
                        {showPaymentButton && <PaymentButton
                            className="mt-4 mb-3 w-[20%]"
                            to={paymentsDetails.PayUrl}
                            disabled={paymentStatus === 'success'}
                            paymentStatus={paymentStatus}
                            setPaymentStatus={setPaymentStatus}
                        >
                            {t("pay")}
                        </PaymentButton>}
                    </div>
                </div>
            </>
        )
}

export default PaymentComponent

