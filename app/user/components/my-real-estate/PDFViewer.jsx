import React, { useState } from 'react';
import Typography from "../../../components/Shared/Typography"
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/Shared/Button"
import Modal from '@/app/components/Shared/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import menuImage from "@/public/assets/menu.png";
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import ChevronDown from '@/app/components/UI/icons/ChevronDown';
import ChevronRight from '@/app/components/UI/icons/ChevronRight';

const PDFViewer = ({ invoice, setShowInvoice }) => {
    const [showExtendModal, setShowExtendModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [invoiceActionsMenuAnchor, setInvoiceActionsMenuAnchor] = useState(null);
    const router = useRouter()

    const handleClick = (event) => {
        setInvoiceActionsMenuAnchor(event.currentTarget);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    console.log(invoice)
    const {
        ID,
        invoice_no,
        status,
        pdf,
        installment_type,
        rent_type,
        userPdf
    } = invoice

    const handleExtensionRequest = () => {
        // TODO: implement extension
    }

    const srcUrl = new URL(installment_type ? pdf : userPdf);
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
                {status === "UNPAID" &&
                    <div className="cursor-pointer ml-2 border border-main-600 rounded-lg p-2 hover:shadow-md flex flex-row space-x-1" onClick={handleClick}>
                        <Typography as='p' variant='body-md'>
                            Actions
                        </Typography>
                        {Boolean(invoiceActionsMenuAnchor) ?
                            <ChevronDown className="mt-2 ml-0.5 h-2 w-2 stroke-black" />
                            :
                            <ChevronRight className="mt-2 ml-0.5 h-2 w-2 stroke-black" />
                        }
                    </div>
                }
                {/* TODO: invoice comes with date field, check if date is before or after today to hide or show extend */}
                <Menu anchorEl={invoiceActionsMenuAnchor} title='Actions' open={Boolean(invoiceActionsMenuAnchor)} onClose={() => setInvoiceActionsMenuAnchor(null)}>
                    {invoice?.rent_type && <MenuItem onClick={() => setShowExtendModal(true)}>Extend Invoice</MenuItem>}
                    <MenuItem onClick={() => router.push(`/payment/${invoice._id}`)}>Pay Invoice</MenuItem>
                </Menu>

            </div>
            <Typography className='text-center mb-4 mt-8' as="h3" variant='h3'>
                Invoice #{ID ? ID : invoice_no}
            </Typography>
            {status === "PAID" ? <div className='h-2/3 md:h-[600px]'>
                <iframe
                    title="Invoice"
                    src={srcUrl.toString()}
                    width="100%"
                    height="100%"
                />
            </div>
                :
                <Typography as='h4' variant="h4" className='text-center mt-8'>
                    Invoice not available yet.
                    <p className='text-sm mt-2 !font-regular'>Kindly pay the invoice amount from the actions above to view your invoice.</p>
                </Typography>}
            <Modal className='!h-[450px] mt-4' isOpen={showExtendModal} onClose={setShowExtendModal}>
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
