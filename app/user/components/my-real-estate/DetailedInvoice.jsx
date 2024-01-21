import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@/app/components/Shared/Typography";
import Line from "@/app/property-search/components/Line";
import Image from 'next/image';
import QRCode from 'react-qr-code';
import { format } from "date-fns";
import diarkoLogo from "@/public/assets/DYARKO LOGO PNG-01.png";
import Button from "../../../components/Shared/Button"
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const DetailedInvoice = ({ invoice, setShowInvoice }) => {
    const {
        details,
        owner,
        property,
        paid_at,
        rent_type,
        user,
        status,
        amount,
    } = invoice;

    console.log(invoice)

    let invoiceId = 12345,
        propertyCode = property[0]?.code,
        autoNo = property[0]?.auto_no,
        ownerId = owner?.civilian_id,
        ownerName = owner?.name,
        rentalName = user?.name,
        rentalId = user?.civilian_id;

    const handleExtendInvoice = () => {

    }


    const checkExtensionValidity = () => {
        return (status === "UNPAID" && paid_at && new Date(paid_at) < new Date())
    }

    return (
        <div className="flex w-full h-full flex-col justify-center items-center mt-8 p-2 border border-gray-200 rounded-lg">
            <div className='flex w-full items-center flex-row justify-between'>
                <div
                    className="mb-7 mt-3 flex cursor-pointer items-start"
                    onClick={() => setShowInvoice(false)}
                >
                    <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
                    <span className="text-md font-bold text-main-600">
                        Back to my invoices
                    </span>
                </div>
                {checkExtensionValidity() && <div className='flex items-end pr-3'>
                    <Button
                        variant="primary"
                        onClick={handleExtendInvoice}
                        className="mx-auto !py-0 mb-7 mt-3 block h-10 w-25 text-center"
                    >
                        Request Extend Invoice
                    </Button>
                </div>}
            </div>
            <div className='flex flex-col justify-center items-center border-1'>
                <div className="flex">
                    <div className="w-1/4 flex flex-row my-2 mr-8 ml-2 space-x-6 justify-between items-start">
                        <div className="flex flex-col items-center justify-between space-y-10">
                            <Image src={diarkoLogo} alt="Diarko Logo" width={150} height={150} />
                            {/* TODO: modify qr code value to link from invoice */}
                            <QRCode size={128} value={"https://api.dyarko.com"} />
                        </div>
                        <div className="w-1/4 border-l border-solid border-black h-full"></div>
                    </div>
                    <div className="w-3/4">
                        <div className='flex flex-col justify-center space-y-1 pt-3 px-2'>
                            <Typography as='h1' className='text-center' variant='body-lg-bold'>Rent Invoice</Typography>
                            <Typography as='p' className='text-center mb-3' variant='body-sm-regular'>#{invoiceId}</Typography>

                            <div className='flex flex-col'>
                                <div className='flex justify-between flex-row'>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Property Code:</p>
                                        <p>{propertyCode}</p>
                                    </div>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Auto No:</p>
                                        <p>{autoNo}</p>
                                    </div>
                                </div>
                                <div className='flex justify-between flex-row'>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Date: </p>
                                        <p>{paid_at ? format(new Date(paid_at), "dd/MM/yyyy HH:mm") : ""}</p>
                                    </div>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Type: </p>
                                        <p className='capitalize'>{rent_type ? rent_type : ""}</p>
                                    </div>
                                </div>
                                <Line className="mb-4 !bg-black  " />
                                <div className='flex justify-between flex-row'>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Owner Name: </p>
                                        <p className='capitalize'>{ownerName}</p>
                                    </div>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Owner Id: </p>
                                        {/* TODO: add civilian id for owner */}
                                        <p>12356452145</p>
                                    </div>
                                </div>
                                <div className='flex justify-between flex-row'>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Rental Name: </p>
                                        <p className='capitalize'>{rentalName}</p>
                                    </div>
                                    <div className='space-x-4 flex flex-row'>
                                        <p>Rental Id: </p>
                                        {/* TODO: add civilian id for user */}
                                        <p>321654975</p>
                                    </div>
                                </div>
                                <Line className="mb-4 !bg-black  " />
                                <div className='flex justify-between flex-col'>
                                    {details?.filter(item => item.description !== "commission").map((item, index) => (
                                        <div className='space-x-2 justify-between flex flex-row' key={index}>
                                            <p className='capitalize'>{item.description}: </p>
                                            <p className='text-main-yellow-600 ml-3'> KWD {Math.abs(item.amount)}</p>
                                        </div>
                                    ))}
                                </div>
                                <Line className="mb-4 !bg-black  " />
                                <div className='space-x-2 justify-between flex flex-row'>
                                    <p>Total: </p>
                                    <p className='text-main-yellow-600 ml-3'>KWD {Math.abs(amount)}</p>
                                </div>
                                <Line className="!bg-black   mb-4" />
                                <div className='space-x-2 justify-center text-center flex flex-row'>
                                    <p>Contact Us: </p>
                                    <p>+9659423123</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetailedInvoice.propTypes = {
    invoice: PropTypes.object.isRequired
};

export default DetailedInvoice;
