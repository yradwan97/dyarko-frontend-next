import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@/src/app/[locale]/components/Shared/Typography";
import Line from "@/src/app/[locale]/property-search/components/Line";
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


    let displayDetails = details?.filter(d => {
        if (d.description !== "commission" && d.description !== "Commission" && d.amount > 0) {
            return d
        }
    }) || []

    let invoiceId = invoice?.ID,
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
        <>
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
            <div className="flex w-full h-full flex-col justify-center items-center mt-8 p-2 border border-gray-200 rounded-lg">

                <div className='flex flex-col justify-center items-center border-1'>
                    <div className="flex">
                        <div className="w-1/4 flex flex-row my-2 mr-8 ml-2 space-x-6 justify-between items-start">
                            <div className="flex flex-col items-center justify-between space-y-10">
                                <Image src={diarkoLogo} alt="Diarko Logo" width={150} height={150} />
                                <QRCode size={128} value={invoice?.pdf} />
                            </div>
                            <div className="w-1/4 border-l border-solid border-black h-full"></div>
                        </div>
                        <div className="w-3/4">
                            <div className='flex flex-col justify-center space-y-1 pt-3 px-2'>
                                <Typography as='h1' className='text-center' variant='body-lg-bold'>Rent Invoice</Typography>
                                <Typography as='p' className='text-center mb-3' variant='body-sm-regular'>#{invoiceId}</Typography>

                                <div className='flex flex-col space-y-1'>
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
                                            <p>{format(new Date(), "MMM dd, yyyy")}</p>
                                        </div>
                                        <div className='space-x-4 flex flex-row'>
                                            <p>Type: </p>
                                            <p className='capitalize'>{rent_type ? rent_type : ""}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between flex-row'>
                                        <div className='space-x-4 flex flex-row'>
                                            <p>Start Date: </p>
                                            <p>{format(new Date(invoice?.start_date), "MMM dd, yyyy")}</p>
                                        </div>
                                        <div className='space-x-4 flex flex-row'>
                                            <p>End Date: </p>
                                            <p>{format(new Date(invoice?.end_date), "MMM dd, yyyy")}</p>
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
                                            <p>{ownerId}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between flex-row'>
                                        <div className='space-x-4 flex flex-row'>
                                            <p>Rental Name: </p>
                                            <p className='capitalize'>{rentalName}</p>
                                        </div>
                                        <div className='space-x-4 flex flex-row'>
                                            <p>Rental Id: </p>
                                            <p>{rentalId}</p>
                                        </div>
                                    </div>
                                    <Line className="mb-4 !bg-black  " />
                                    <div className='flex justify-between space-y-1 flex-col'>
                                        {displayDetails.map((item, index) => (
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
        </>
        // <div>Invoice</div>
    );
};

DetailedInvoice.propTypes = {
    invoice: PropTypes.object.isRequired
};

export default DetailedInvoice;
