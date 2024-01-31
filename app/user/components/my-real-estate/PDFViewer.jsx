import React, { useState } from 'react';
import Typography from "../../../components/Shared/Typography"
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/Shared/Button"
import Modal from '@/app/components/Shared/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const PDFViewer = ({ invoice, setShowInvoice }) => {
    const [showExtendModal, setShowExtendModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(invoice)
    const {
        invoice_no,
        status,
        pdf
    } = invoice

    const handleExtensionRequest = () => {

    }

    const srcUrl = new URL(pdf);
    srcUrl.searchParams.set('zoom', 62);
    return (
        <div className="p-3">
            <div className='flex flex-row items-center justify-between'>
                <div
                    className="flex cursor-pointer"
                    onClick={() => setShowInvoice(false)}
                >
                    <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
                    <span className="text-md font-bold text-main-600">
                        Back to Invoices
                    </span>
                </div>
                {status === "UNPAID" && <div className='flex pr-3'>
                    <Button
                        variant="primary"
                        onClick={() => setShowExtendModal(true)}
                        className="mx-auto !py-0 mb-7 mt-3 block h-10 w-25 text-center"
                    >
                        Extend Invoice
                    </Button>
                </div>}
            </div>
            <Typography className='text-center mb-4' as="h1" variant='body-lg-medium'>
                Invoice #{invoice_no}
            </Typography>
            <iframe
                title="Invoice"
                src={srcUrl.toString()}
                width="100%"
                height="600px"
            ></iframe>
            <Modal className='!h-[450px]' isOpen={showExtendModal} onClose={setShowExtendModal}>
                <Typography as='h4' variant='h4' className='mb-2'>
                    Request extension on invoice.
                </Typography>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select a date"
                />
                <div className="flex space-x-2 flex-row">
                    <Button variant="primary" onClick={handleExtensionRequest}>Request</Button>
                    <Button variant="primary" onClick={() => setShowExtendModal(false)}>Cancel</Button>
                </div>
            </Modal>
        </div>
    );
};

export default PDFViewer;
