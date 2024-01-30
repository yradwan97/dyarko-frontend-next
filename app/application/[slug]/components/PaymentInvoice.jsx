import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from "@/app/components/Shared/Typography";
import Line from "@/app/property-search/components/Line";
import PaymentButton from "./PaymentButton";
import PaymentSuccessfuly from './PaymentSuccessfuly';

const Invoice = ({ paymentDetails, onEnd }) => {
    let { PayUrl, invoiceDetails } = paymentDetails
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
    }, paymentStatus)

    return (
        <div className="flex w-full h-3/4 flex-col justify-center items-center mt-8 p-6 border border-gray-200 rounded-lg">
            {paymentStatus === 'success' ? (
                <div>
                    <PaymentSuccessfuly points={finalAmount} visible={successVisible} setVisible={() => setSuccessVisible(false)} />
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
