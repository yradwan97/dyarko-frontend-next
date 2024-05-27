import React, { useEffect, useState } from 'react';
import Typography from '@/src/app/[locale]/components/Shared/Typography';
import OTPInput from './OTPInput';
import { axiosClient as axios } from "../../../services/axiosClient";
import { toast } from "react-toastify";
import Button from '@/src/app/[locale]/components/Shared/Button';
import { useTranslations } from 'next-intl';

const OTP = ({ onComplete }) => {
    const length = 6
    const t = useTranslations("Application.OTP")
    const [otp, setOTP] = useState(Array(length).fill(''));
    const [allowSubmit, setAllowSubmit] = useState(false)
    useEffect(() => {
        setAllowSubmit(otp.every(o => o))
    }, [otp])
    const generateOTP = async () => {
        try {
            let response = await axios.post("/otp");

            console.log(response?.data.data.code);

        } catch (error) {
            console.error("Error generating OTP:", error);

            // Handle errors and toast the message
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg);
                toast.error(errorMessages.join(', '));
            }
        }
    };

    const handleComplete = async (otp) => {
        try {
            let response = await axios.post(`/otp/${parseInt(otp)}`);

            response?.data?.success && onComplete(otp);
            if (!response?.data?.success) {
                toast(t("incorrect"));
                setOTP(Array(length).fill(''))
            }
        } catch (error) {
            console.error("Error checking OTP:", error);
            // Handle errors and toast the message
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg);
                toast.error(errorMessages.join(', '));
                setOTP(Array(length).fill(''))
            }
        }
    };

    return (
        <div className="mt-12 p-6 border border-gray-200 rounded-lg text-center">
            <Typography variant='body-md' as="h4" className="mt-1">
                {t("header")}
            </Typography>
            <Typography variant='body-xs-medium' as="p" className="mt-3">
                {t("subheader")}
            </Typography>
            <OTPInput otp={otp} setOTP={setOTP} length={length} onComplete={handleComplete} />
            <div className='flex items-center justify-center space-x-2 p-1 mt-2'>
                <Button variant='primary' disabled={!allowSubmit} onClick={() => onComplete(otp.join(''))}>{t("submit")}</Button>
                {/* <Button variant='primary' onClick={() => generateOTP()}>Generate OTP</Button> */}
            </div>
        </div>
    );
};

export default OTP;
