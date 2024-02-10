import CalenderOutline from '@/app/components/UI/icons/CalenderOutline';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays, format } from "date-fns"
import { axiosClient as axios } from "../../services/axiosClient"
import { useSession } from 'next-auth/react';


const FromToDatePicker = ({ property, onDateChange, paymentFrequency }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [fromDateVisible, setFromDateVisible] = useState(false);
    const [toDateVisible, setToDateVisible] = useState(false);
    const [rentedDates, setRentedDates] = useState([])
    const { data: session } = useSession()

    useEffect(() => {
        if (paymentFrequency !== "daily") {
            setToDate(null)
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
    }, [property, session,])

    const handleFromDateChange = (date) => {
        setFromDate(date);
        setFromDateVisible(false)
        onDateChange({ fromDate: format(new Date(date), "yyyy/MM/dd"), toDate: toDate !== null ? format(new Date(toDate), "yyyy/MM/dd") : null });
    };


    const handleToDateChange = (date) => {
        setToDate(date);
        setToDateVisible(false);
        onDateChange({
            fromDate: format(new Date(fromDate), "yyyy/MM/dd"),
            toDate: format(new Date(date), "yyyy/MM/dd"),
        });
    };


    const filterPastAndRentedDatesTo = (date) => {
        const currentDate = new Date();

        // Check if the date is in the future
        if (date <= currentDate) {
            return false;
        }

        // filter out before available date (if any)
        if (property?.available_date && date < new Date(property?.available_date)) {
            return false
        }

        // filter out rented dated
        for (const rentedDateRange of rentedDates) {
            const startDate = new Date(rentedDateRange.start_date);
            const endDate = new Date(rentedDateRange.end_date);

            // Check if the date is within the rented date range (if any)
            if (date >= startDate && date <= endDate) {
                return false;
            }
        }

        // Make sure that To Date is after From Date.
        if (fromDate && date <= fromDate) {
            return false;
        }

        // Check payment frequency
        if (paymentFrequency === "weekly" && fromDate) {
            const daysDifference = differenceInDays(new Date(date), new Date(fromDate));

            // Filter out any days where the difference between fromDate and toDate is not divisible by 7
            return daysDifference % 7 === 0;
        } else if (paymentFrequency === "monthly" && fromDate) {
            const daysDifference = differenceInDays(new Date(date), new Date(fromDate));
            console.log(daysDifference)
            // Filter out any days where the difference isn't divisible by 30
            return daysDifference % 30 === 0;
        }

        // If the date is in the future, not within any rented date range, and following rules per payment frequency, allow it
        return true;
    };


    const filterPastAndRentedDatesFrom = (date) => {
        const currentDate = new Date();

        // filter out past dates
        if (date < currentDate) {
            return false;
        }

        // filter out before available date (if any)
        if (property?.available_date && date < new Date(property?.available_date)) {
            return false
        }

        // filter out rented dates
        for (const rentedDateRange of rentedDates) {
            const startDate = new Date(rentedDateRange.start_date);
            const endDate = new Date(rentedDateRange.end_date);

            if (date >= startDate && date <= endDate) {
                return false;
            }
        }

        return true;
    }

    useEffect(() => {
        if (toDate !== null) {
            setToDate(null)
        }
    }, [fromDate])

    return (
        <>
            {
                (new Date(property?.available_date) > new Date()) &&
                <p className='mt-3 m-2 text-main-yellow-600'>
                    Available starting: {format(new Date(property?.available_date), "dd/MM/yyyy")}
                </p>
            }
            <div className="flex flex-col md:flex-row rounded-lg border my-2 border-main-300">
                <div className='flex flex-col w-[50%] p-2 '>
                    <div className="relative flex w-full flex-row  pl-6 pr-4 ">
                        <label>From Date:</label>

                    </div>
                    <div className="flex flex-row">
                        <DatePicker
                            className="bg-white w-full appearance-none rounded-lg border-2 mb-2 border-black px-0 text-md 
                            font-regular text-gray-500 text-center focus:border-main-400 focus-visible:outline-1"
                            selected={fromDate}
                            open={fromDateVisible}
                            onFocus={() => setFromDateVisible(true)}
                            onBlur={() => setFromDateVisible(false)}
                            filterDate={filterPastAndRentedDatesFrom}
                            onChange={handleFromDateChange}
                            dateFormat="dd/MM/yyyy"
                        />
                        <div onClick={() => setFromDateVisible(!fromDateVisible)} className=" right-0 flex h-8 w-8 ml-5 items-center justify-center bg-white">
                            <CalenderOutline className="h-3 w-3 stroke-main-600" />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col w-[50%] p-2 '>
                    <div className="relative flex w-full flex-row  pl-6 pr-4 ">
                        <label>To Date:</label>

                    </div>
                    <div className="flex flex-row">
                        <DatePicker
                            className="bg-white w-full appearance-none rounded-lg border-2 mb-2 border-black px-0 text-md
                            font-regular text-gray-500 text-center focus:border-main-400 focus-visible:outline-1"
                            selected={toDate}
                            open={toDateVisible}
                            onFocus={() => setToDateVisible(true)}
                            onBlur={() => setToDateVisible(false)}
                            filterDate={filterPastAndRentedDatesTo}
                            onChange={handleToDateChange}
                            dateFormat="dd/MM/yyyy"
                        />
                        <div onClick={() => setToDateVisible(!toDateVisible)} className=" right-0 flex h-8 w-8 ml-5 items-center justify-center bg-white">
                            <CalenderOutline className="h-3 w-3 stroke-main-600" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FromToDatePicker


