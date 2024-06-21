import React, { useEffect, useState } from 'react';
import Typography from "../../../components/Shared/Typography"
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Button from "../../../components/Shared/Button"
import Modal from '@/src/app/[locale]/components/Shared/Modal';
import { Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import ChevronDown from '@/src/app/[locale]/components/UI/icons/ChevronDown';
import ChevronRight from '@/src/app/[locale]/components/UI/icons/ChevronRight';
import { DayPicker } from 'react-day-picker';
import { differenceInDays, differenceInCalendarMonths, format } from "date-fns"
import 'react-day-picker/dist/style.css';
import { axiosClient as axios } from '@/src/app/[locale]/services/axiosClient';
import Link from "next/link"
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';

const PDFViewer = ({ invoice, setShowInvoice }) => {
    console.log(invoice)
    const [showExtendModal, setShowExtendModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const t = useTranslations("Account.RealEstates.Invoice")
    const [invoiceActionsMenuAnchor, setInvoiceActionsMenuAnchor] = useState(null);
    const [dayPickerFooter, setDayPickerFooter] = useState(<p className='text-main-400'>{t("extend.footer-main")}</p>)
    const router = useRouter()
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 600px)');

        const handleMediaQueryChange = (e) => {
            setIsSmallScreen(e.matches);
        };

        handleMediaQueryChange(mediaQuery); // Initial check
        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);

    const handleClick = (event) => {
        setInvoiceActionsMenuAnchor(event.currentTarget);
    };

    const cancelExtension = () => {
        setSelectedDate(null)
        setShowExtendModal(false)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const {
        ID,
        invoice_no,
        status,
        pdf,
        installment_type,
        rent_type,
        date,
        userPdf
    } = invoice

    const handleExtensionRequest = async () => {

        setDayPickerFooter(<p>Please pick a day!</p>)
        const difference = differenceInDays(new Date(selectedDate), new Date(invoice?.date).setHours(0, 0, 0, 0))
        // if (difference > 30) {
        //     setDayPickerFooter(<p className='text-error'>{t("extend.footer-error")}</p>)
        //     return
        // }
        try {
            let extendInvoiceBody = {
                "date": `${format(new Date(selectedDate), "MM/dd/yyyy")}`
            }
            let response = await axios.put(installment_type ? `/installments_invoices/${invoice?._id}` : `/invoices/${invoice?._id}`, extendInvoiceBody)
            toast.success(t("extend-modal.submit-success"))
        } catch (e) {
            toast.error(t("extend-modal.submit-error"))
            console.error(e)
        }
        cancelExtension()
    }
    const handleExtendSelected = () => {
        setShowExtendModal(true)
        setInvoiceActionsMenuAnchor(null)
    }

    const toggleShowExtendActionItem = () => {
        return (status === "UNPAID" && new Date(invoice?.date) < new Date() && !invoice?.extendRequestStatus)
    }

    let srcUrl;
    if (status === "PAID") {
        srcUrl = new URL(rent_type ? userPdf : pdf);
        srcUrl.searchParams.set('zoom', 62);
    }
    let paymentType = invoice?.rent_type ? "rents" : "installments"


    return (
        <div className="p-2 sm:p-3 h-full">
            <div className='flex flex-row items-center justify-between'>
                <div
                    className="flex cursor-pointer"
                    onClick={() => setShowInvoice(false)}
                >
                    <ChevronLeftIcon className="mr-2.5 h-6 w-5 text-main-600" />
                    <span className="text-md font-bold text-main-600">
                        {t("back")}
                    </span>
                </div>
                {status === "UNPAID" &&
                    <div className="cursor-pointer ml-2 border border-main-600 rounded-lg p-2 hover:shadow-md flex flex-row space-x-1" onClick={handleClick}>
                        <Typography as='p' variant='body-md'>
                            {t("actions.title")}
                        </Typography>
                        {Boolean(invoiceActionsMenuAnchor) ?
                            <ChevronDown className="mt-2 ml-0.5 h-2 w-2 stroke-black" />
                            :
                            <ChevronRight className="mt-2 ml-0.5 h-2 w-2 stroke-black" />
                        }
                    </div>
                }
                <Menu anchorEl={invoiceActionsMenuAnchor} title={t("actions.title")} open={Boolean(invoiceActionsMenuAnchor)} onClose={() => setInvoiceActionsMenuAnchor(null)}>
                    {toggleShowExtendActionItem() && <MenuItem onClick={handleExtendSelected}>{t("actions.extend")}</MenuItem>}
                    <MenuItem onClick={() => router.push(`/payment/${paymentType}/${invoice._id}`)}>Pay Invoice</MenuItem>
                </Menu>

            </div>
            <Typography className='text-center mb-4 mt-8' as="h3" variant='h3'>
                {t("invoice-no")} {ID ? ID : invoice_no}
            </Typography>
            {status === "PAID" ?
                <>
                    {isSmallScreen ?
                        <Typography className='text-center text-main-500' as="p" variant='p'>
                            <Link href={srcUrl.toString()} passHref legacyBehavior>
                                <a target='_blank' rel="noopener noreferrer">
                                    {t("view-invoice")}
                                </a>
                            </Link>
                        </Typography>
                        :
                        <div className='md:h-[600px]'>
                            <iframe
                                title="Invoice"
                                src={srcUrl?.toString()}
                                width="100%"
                                height="100%"
                                style={{ minHeight: '400px' }}
                            />
                        </div>}
                </>
                :
                <Typography as='h4' variant="h4" className='text-center mt-8'>
                    {t("no-invoice.main")}
                    <p className='text-sm mt-2 !font-regular'>{t("no-invoice.sub")}</p>
                </Typography>
            }
            <Modal className='!h-[470px] mt-24' isOpen={showExtendModal} onClose={setShowExtendModal}>
                <Typography as='h4' variant='h4' className='text-main-600 mb-2'>
                    {t("extend-modal.title")}
                </Typography>
                <DayPicker
                    selected={selectedDate}
                    required
                    captionLayout='dropdown'
                    fromDate={new Date()}
                    onDayClick={handleDateChange}
                    footer={dayPickerFooter}
                />
                <div className="flex space-x-2 flex-row">
                    <Button variant={selectedDate ? "primary" : "primary-outline"} disabled={!selectedDate} onClick={handleExtensionRequest}>{t("extend-modal.request")}</Button>
                    <Button variant="primary" onClick={cancelExtension}>{t("extend-modal.cancel")}</Button>
                </div>
            </Modal>
        </div>
    );
};

export default PDFViewer;
