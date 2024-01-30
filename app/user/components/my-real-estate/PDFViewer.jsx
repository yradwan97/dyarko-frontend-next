import React from 'react';
import Typography from "../../../components/Shared/Typography"
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

const PDFViewer = ({ pdfUrl, invoiceID, setShowInvoice }) => {
    const srcUrl = new URL(pdfUrl);
    srcUrl.searchParams.set('zoom', 62);
    return (
        <div className="p-3">
            <div
                className="mb-7 flex cursor-pointer items-center"
                onClick={() => setShowInvoice(false)}
            >
                <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
                <span className="text-md font-bold text-main-600">
                    Back to Invoices
                </span>
            </div>
            <Typography className='text-center mb-4' as="h1" variant='body-lg-medium'>
                Invoice #{invoiceID}
            </Typography>
            <iframe
                title="Invoice"
                src={srcUrl.toString()}
                width="100%"
                height="600px"
            ></iframe>
        </div>
    );
};

export default PDFViewer;
