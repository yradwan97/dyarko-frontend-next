import CalenderOutline from '@/src/app/[locale]/components/UI/icons/CalenderOutline';
import React, { useEffect, useRef, useState } from 'react';
import { format, differenceInCalendarMonths } from "date-fns"
import { axiosClient as axios } from "../../../services/axiosClient"
import { useSession } from 'next-auth/react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslations } from 'next-intl';

const FromToDatePicker = ({ property, overlapError, setOverlapError, onDateChange, paymentFrequency }) => {
    const [fromDate, setFromDate] = useState(null);
    const [fromInputValue, setFromInputValue] = useState('')
    const [toDate, setToDate] = useState(null);
    const [toInputValue, setToInputValue] = useState('')
    const [rentedDates, setRentedDates] = useState([])
    const [overlap, setOverlap] = useState(null)
    const { data: session } = useSession()
    const t = useTranslations("Application.RentingDetails.DatePicker")

    const fromPopperRef = useRef(null);
    const toPopperRef = useRef(null);
    const fromButtonRef = useRef(null);
    const toButtonRef = useRef(null);
    const [fromPopperElement, setFromPopperElement] = useState(null);
    const [toPopperElement, setToPopperElement] = useState(null);
    const [isFromPopperOpen, setIsFromPopperOpen] = useState(false);
    const [isToPopperOpen, setIsToPopperOpen] = useState(false);

    const toPopper = usePopper(toPopperRef.current, toPopperElement, {
        placement: 'auto'
    });
    const fromPopper = usePopper(fromPopperRef.current, fromPopperElement, {
        placement: 'auto'
    });

    const closeFromPopper = () => {
        setIsFromPopperOpen(false);
        fromButtonRef?.current?.focus();
    };
    const closeToPopper = () => {
        setIsToPopperOpen(false);
        fromButtonRef?.current?.focus();
    };

    useEffect(() => {
        if (paymentFrequency !== "daily") {
            setToDate(null)
            setToInputValue("")
        }
    }, [paymentFrequency])


    useEffect(() => {
        const getRentedDates = async (id) => {
            try {
                let response = await axios.get(`/rents/dates/${id}`, {
                    headers: {
                        "auth-token": `Bearer ${session?.user?.accessToken}`
                    }
                })
                if (response.status === 200) {
                    setRentedDates(response.data.data)
                }
            } catch (e) {
                console.error(e)
            }
        }
        if (property?._id && property?.category !== "tent_group" && session) {
            getRentedDates(property?._id)
        }
    }, [property, session])

    const handleFromDateChange = (date) => {
        setFromDate(date);
        setFromInputValue(format(new Date(date), "dd/MM/yyyy"))
        closeFromPopper()
        onDateChange({ fromDate: format(new Date(date), "yyyy/MM/dd"), toDate: toDate !== null ? format(new Date(toDate), "yyyy/MM/dd") : null });
    };


    const handleToDateChange = async (date) => {
        setOverlapError(false)
        setOverlap(null)
        setToDate(date);
        setToInputValue(format(new Date(date), "dd/MM/yyyy"))
        closeToPopper()
        let valid;
        if (fromDate && paymentFrequency) {
            valid = await validateRentDates(date)
        }

        if (valid.isValid) {
            onDateChange({
                fromDate: format(new Date(fromDate), "yyyy/MM/dd"),
                toDate: format(new Date(date), "yyyy/MM/dd"),
            });
        } else {
            setOverlapError(!valid.isValid)
            setOverlap(valid.message)
        }
    };

    const validateRentDates = async (date) => {
        const months = differenceInCalendarMonths(new Date(date), new Date(fromDate))
        if (property?.min_months) {
            if (months < property?.min_months) {
                return { isValid: false, message: `Rent time should be greater than or equal to ${property?.min_months} months` }
            }
        }
        const dateValidationBody = {
            "startDate": format(new Date(fromDate), "yyyy/MM/dd"),
            "endDate": format(new Date(date), "yyyy/MM/dd"),
            "rentType": paymentFrequency,
            "property": property?._id
        }
        let res = await axios.post("/rents/validateTime", dateValidationBody)
        return res.data.data
    }

    const filterPastAndRentedDatesFrom = (date) => {
        const currentDate = new Date();

        // Filter out dates before today
        if (date < currentDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        // Filter out dates before the available date (if any)
        if (property?.available_date && date < new Date(property?.available_date).setHours(0, 0, 0, 0)) {
            return true;
        }

        // Filter out rented dates
        for (const rentedDateRange of rentedDates) {
            const startDate = new Date(rentedDateRange.start_date).setHours(0, 0, 0, 0);
            const endDate = new Date(rentedDateRange.end_date).setHours(23, 59, 59, 999);

            // If the date falls within any rented date range
            if (date >= startDate && date <= endDate) {
                return true;
            }
        }

        return false; // Allow all other dates
    };

    const filterPastAndRentedDatesTo = (date) => {
        const currentDate = new Date();

        // Filter out dates before today
        if (date < currentDate.setHours(0, 0, 0, 0)) {
            return true;
        }

        // Filter out dates before the available date (if any)
        if (property?.available_date && date < new Date(property?.available_date).setHours(0, 0, 0, 0)) {
            return true;
        }

        // Filter out rented dates
        for (const rentedDateRange of rentedDates) {
            const startDate = new Date(rentedDateRange.start_date).setHours(0, 0, 0, 0);
            const endDate = new Date(rentedDateRange.end_date).setHours(23, 59, 59, 999);

            // If the date falls within any rented date range or is the end date of the rented range
            if (date >= startDate && date <= endDate) {
                return true;
            }
        }

        // Make sure that the To Date is after the From Date
        if (fromDate && date <= fromDate.setHours(23, 59, 59, 999)) {
            return true;
        }

        return false; // Allow all other dates
    };



    useEffect(() => {
        if (toDate !== null) {
            setToDate(null)
        }
    }, [fromDate])

    return (
        <>
            {
                (new Date(property?.available_date) < new Date()) &&
                <div className='flex items-center flex-row justify-start'>
                    <InfoIcon color='info' fontSize='small' />
                    <p className='mt-3 m-2 text-main-yellow-600'>
                        {t("available-date")}: {format(new Date(property?.available_date), "dd/MM/yyyy")}
                    </p>
                </div>

            }
            {
                property?.min_months &&
                <div className='flex items-center flex-row justify-start'>
                    <InfoIcon color='info' fontSize='small' />
                    <p className='mt-3 m-2 text-black'>
                        {t("min-months", { months: property?.min_months })}
                    </p>
                </div>
            }
            <div className="flex flex-col md:flex-row rounded-lg border my-2 border-main-300">
                <div className='flex flex-col w-[50%] p-2 '>
                    <div className="relative flex w-full flex-row  pl-6 pr-4 ">
                        <label>{t("start-date")}:</label>
                    </div>
                    <div className="flex flex-row">

                        <div ref={fromPopperRef} className='flex flex-row space-x-2'>
                            <div className='border rounded-lg px-1 py-[2px] border-black ml-2'>
                                <input
                                    size={12}
                                    type="text"
                                    disabled
                                    className='outline-none focus:outline-none'
                                    placeholder={format(new Date(), 'y-MM-dd')}
                                    value={fromInputValue}
                                />
                            </div>
                            <button
                                ref={fromButtonRef}
                                type="button"
                                aria-label="Pick a date"
                                onClick={() => setIsFromPopperOpen(!isFromPopperOpen)}
                            >
                                <CalenderOutline className="h-3 w-3 stroke-main-600" />
                            </button>
                        </div>
                        {isFromPopperOpen && (
                            <FocusTrap
                                active
                                focusTrapOptions={{
                                    initialFocus: isFromPopperOpen,
                                    allowOutsideClick: true,
                                    clickOutsideDeactivates: true,
                                    fallbackFocus: fromButtonRef.current || undefined
                                }}
                            >
                                <div
                                    tabIndex={-1}
                                    style={{ ...fromPopper.styles.popper, zIndex: 999 }}
                                    className="dialog-sheet rounded-lg shadow-lg bg-white border border-gray-200"
                                    {...fromPopper.attributes.popper}
                                    ref={setFromPopperElement}
                                    role="dialog"
                                    aria-label="DayPicker calendar"
                                >
                                    <DayPicker
                                        initialFocus={isFromPopperOpen}
                                        mode="single"
                                        showOutsideDays
                                        fixedWeeks
                                        defaultMonth={fromDate}
                                        selected={fromDate}
                                        onSelect={handleFromDateChange}
                                        disabled={filterPastAndRentedDatesFrom}
                                    />
                                </div>
                            </FocusTrap>
                        )}
                    </div>
                </div>
                <div className='flex flex-col w-[50%] p-2 '>
                    <div className="relative flex w-full flex-row  pl-6 pr-4 ">
                        <label>{t("end-date")}:</label>
                    </div>
                    <div className="flex flex-row">
                        <div ref={toPopperRef} className='flex flex-row space-x-2'>
                            <div className='border rounded-lg px-1 py-[2px] border-black ml-2'>
                                <input
                                    size={12}
                                    type="text"
                                    disabled
                                    className='outline-none focus:outline-none'
                                    placeholder={format(new Date(), 'y-MM-dd')}
                                    value={toInputValue}
                                />
                            </div>
                            <button
                                ref={toButtonRef}
                                type="button"
                                aria-label="Pick a date"
                                onClick={() => {
                                    setIsToPopperOpen(!isToPopperOpen)
                                    setIsFromPopperOpen(false)
                                }}
                            >
                                <CalenderOutline className="h-3 w-3 stroke-main-600" />
                            </button>
                        </div>
                        {isToPopperOpen && (
                            <FocusTrap
                                active
                                focusTrapOptions={{
                                    initialFocus: isToPopperOpen,
                                    allowOutsideClick: true,
                                    clickOutsideDeactivates: true,
                                    fallbackFocus: toButtonRef.current || undefined
                                }}
                            >
                                <div
                                    tabIndex={-1}
                                    style={{ ...toPopper.styles.popper, zIndex: 999 }}
                                    className="dialog-sheet rounded-lg shadow-lg bg-white border border-gray-200"
                                    {...toPopper.attributes.popper}
                                    ref={setToPopperElement}
                                    role="dialog"
                                    aria-label="DayPicker calendar"
                                >
                                    <DayPicker
                                        initialFocus={isToPopperOpen}
                                        mode="single"
                                        showOutsideDays
                                        fixedWeeks
                                        defaultMonth={toDate}
                                        selected={toDate}
                                        onSelect={handleToDateChange}
                                        disabled={filterPastAndRentedDatesTo}
                                    />
                                </div>
                            </FocusTrap>
                        )}
                    </div>
                </div>
            </div>
            {overlapError &&
                <p className='text-error text-center my-2 capitalize'>
                    {overlap}
                </p>}
        </>
    );
}

export default FromToDatePicker


