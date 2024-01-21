import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from "@/app/components/Shared/Typography";
import Line from "@/app/property-search/components/Line";
import PaymentButton from "./PaymentButton";
import PaymentSuccessfuly from './PaymentSuccessfuly';
import diarkoLogo from "@/public/assets/DYARKO LOGO PNG-01.png"

const Invoice = ({ paymentDetails, onEnd }) => {
    let { PayUrl, invoiceDetails } = paymentDetails
    // let PayUrl = "https://kpaytest.com.kw/kpg/PaymentHTTP.htm?param=paymentInit&trandata=50D853E7E4B7F74894DE64D0F912935A468A1236131B0E1E7CFE2CE5E97AD1E16042396E9ADB9C75BEA9901E5CBCD2157F664947C11114928C05BE2053ABB26EA8634D1B6EEB38BDE5461014683C7B3A0F8AF5306CAE9A517604FB50508008AE17C4BE148E8642F5AD825727C21452967AB287B498E4C97645A43DC8056BB6C95406F372B04FF31C6068E92A414D4E02C43453506DFBB4240B14EB9D09843F790C47F567284ECBB82FBB95FF068D50B4D0720923F022AF4D46C78FA4AAF35806F8754E970A36DF7D016C0AB6A578FCB1EA65C381232B97D9D17BBD58519F1C35F6D40D621C0D618445C6D27C186AD4278284B1ACD935BF71E902A71803B6164BFDDC55294BD050493304F43872E8192E6BE050CCBE21A692D80A1236BCB4D86FE4240CFD499B9501A0420C42A67DE07A&errorURL=https://demo.bookeey.com/pgapi/api/payinvoice/KfastFail/21000000001556&responseURL=https://demo.bookeey.com/pgapi/api/payinvoice/KfastSuccess/21000000001556&tranportalId=108401"
    // let invoiceDetails = [
    //     {
    //         "description": "rent",
    //         "amount": -40
    //     },
    //     {
    //         "description": "service expenses",
    //         "amount": -2.5
    //     },
    //     {
    //         "description": "cleaner",
    //         "amount": -10
    //     },
    //     {
    //         "description": "insurance",
    //         "amount": 0
    //     },
    //     {
    //         "description": "commission",
    //         "amount": 0
    //     }
    // ]
    let filteredInvoiceItems = []
    for (const [key, { amount, description }] of Object.entries(invoiceDetails)) {
        if (description !== "service expenses") {
            filteredInvoiceItems.push({ description, amount })
        }
    }

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false)

    useEffect(() => {
        if (paymentStatus === "success") {
            setSuccessVisible(true)
            setTimeout(() => {
                onEnd()
            }, 5000)
        }
    }, paymentStatus)

    return (
        <div className="flex w-full h-3/4 flex-col justify-center items-center mt-8 p-6 border border-gray-200 rounded-lg">
            {paymentStatus === 'success' ? (
                <div>
                    <PaymentSuccessfuly visible={successVisible} setVisible={() => setSuccessVisible(false)} />
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center'>
                    <Typography as='h1' className='text-center' variant='body-lg-bold'>Review Invoice and Pay</Typography>
                    <div className='mt-5 w-[250px] flex flex-col justify-between space-y-1 p-2 border border-main-300 rounded-lg'>
                        <Typography as='h2' className='text-center mb-3' variant='body-md-medium'>Invoice Items</Typography>
                        <Line className="mb-4" />
                        {filteredInvoiceItems.map((item, index) => (
                            <div className='space-x-1 justify-between  flex flex-row' key={index}>
                                <p className='capitalize'>{item.description}: </p>
                                <p className='text-main-yellow-600 ml-3'> KWD {Math.abs(item.amount)}</p>
                            </div>
                        ))}
                        <Line className='mt-2' />
                        <div className='space-x-1 justify-between flex flex-row'>
                            <p>Total: </p>
                            <p className='text-main-yellow-600 ml-3'> KWD {filteredInvoiceItems.reduce((a, b) => a + Math.abs(b.amount), 0)}</p>
                        </div>
                    </div>
                    <PaymentButton
                        className="mt-4 w-[50%]"
                        to={PayUrl}
                        disabled={paymentStatus === 'success'}
                        paymentStatus={paymentStatus}
                        setPaymentStatus={setPaymentStatus}
                    >
                        Pay
                    </PaymentButton>
                </div>
            )}
        </div>
    );
};

Invoice.propTypes = {
    paymentDetails: PropTypes.object.isRequired
};

export default Invoice;
