import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from "@/app/components/Shared/Typography";
import Line from "@/app/property-search/components/Line";
import PaymentButton from "./PaymentButton";
import PaymentSuccessfuly from './PaymentSuccessfuly';

const Invoice = ({ paymentDetails, onEnd }) => {
    let { PayUrl, invoiceDetails } = paymentDetails
    // let PayUrl = 'https://kpaytest.com.kw/kpg/PaymentHTTP.htm?param=paymentInit&trandata=FA4079632AED466AAECEA94545A36CB7C41E447FC4C6505604AA392759CE64945599BC7AB012277CDC801B3C06C9750FC58A8D4F59666A3E4789AE27A4F79E9D65B16F8FF562F700CCAD78773867FEA89CDD096466CEFE438B8BBF398C48BEC822E4D44B5EAFBB805BDAC2FEEE4A473356F3249D992ABE3433A37505907B685F1C68E6EA88FC017242C32DECFD478100122AE47E281F0F200F06A1C35E6D3393B444CB4593EC5BAC1DB96B48FDD57A6DF611BC23FB0E4A13CB73721A4F67A2277BC152BA80CB7C467AE4978DFF7834CFFD4D4A2A4621903BCA055F9EC4EA33DFC6CFBA2F7384133ADA2E9860A7C42DEFCA0B1543D4CCBB8E0D9BC24EB1958A7D29BFECA0043EFEEB63125050C460F8E939E6D4F002CE4B4F0DA9D088C9DB46A07E8EEB2004A978EA12B34A8462D0E364&errorURL=https://demo.bookeey.com/pgapi/api/payinvoice/KfastFail/21000000003237&responseURL=https://demo.bookeey.com/pgapi/api/payinvoice/KfastSuccess/21000000003237&tranportalId=108401'
    // let invoiceDetails = [
    //     {
    //         "description": "Rent",
    //         "amount": 40
    //     },
    //     {
    //         "description": "clean",
    //         "amount": 10
    //     },
    //     {
    //         "description": "Insurance(Credit at Diarco)",
    //         "amount": 50
    //     },
    //     {
    //         "description": "Commission",
    //         "amount": 4
    //     },
    //     {
    //         "description": "Tax",
    //         "amount": 2.5
    //     }
    // ]
    let filteredInvoiceItems = []
    for (const [key, { amount, description }] of Object.entries(invoiceDetails)) {
        if (description !== "service expenses" && description !== "Commission" && description !== "commission" && amount > 0) {
            filteredInvoiceItems.push({ description, amount })
        }
    }
    let finalAmount = filteredInvoiceItems.reduce((a, b) => a + Math.abs(b.amount), 0)

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [successVisible, setSuccessVisible] = useState(false)

    useEffect(() => {
        if (paymentStatus === "success") {
            setSuccessVisible(true)
            setTimeout(() => {
                onEnd()
            }, 5000)
        }
    }, [paymentStatus, onEnd])

    return (
        <div className="flex w-full h-3/4 flex-col justify-center items-center mt-8 p-6 border border-gray-200 rounded-lg">
            {paymentStatus === 'success' ? (
                <div>
                    <PaymentSuccessfuly points={finalAmount} visible={successVisible} setVisible={() => setSuccessVisible(false)} />
                </div>
            ) : (
                <div className='flex w-5/6 flex-col justify-center items-center'>
                    <Typography as='h1' className='text-center' variant='body-lg-bold'>Review Invoice and Pay</Typography>
                    <div className='mt-5 w-full flex flex-col justify-between space-y-1 p-2 border border-main-300 rounded-lg'>
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
                            <p className='text-main-yellow-600 ml-3'> KWD {finalAmount}</p>
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
