import React, { useEffect, useState } from 'react';
import Typography from '@/app/components/Shared/Typography';
import OTPInput from './OTPInput';
import { axiosClient as axios } from "../../../services/axiosClient";
import { useSession } from 'next-auth/react';
import { toast } from "react-toastify";
import Button from '@/app/components/Shared/Button';

const OTP = ({ onComplete }) => {
    const { data: session } = useSession();
    const [otpGeneratedOnce, setOtpGeneratedOnce] = useState(false);
    const length = 6
    const [otp, setOTP] = useState(Array(length).fill(''));

    const generateOTP = async () => {
        try {
            let response = await axios.post("/otp");

            console.log(response?.data.data.code);

            // Set otpGeneratedOnce to true after successfully generating OTP
            response?.data?.success && setOtpGeneratedOnce(true);
        } catch (error) {
            console.error("Error generating OTP:", error);

            // Handle errors and toast the message
            if (error.response && error.response.data && error.response.data.errors) {
                const errorMessages = error.response.data.errors.map(err => err.msg);
                toast.error(errorMessages.join(', '));
            }
        }
    };

    useEffect(() => {
        // Check if there is a session and generateOTP has not been called yet
        if (session && !otpGeneratedOnce) {
            generateOTP();
        }
    }, [session]);

    const handleComplete = async (otp) => {
        try {
            let response = await axios.post(`/otp/${parseInt(otp)}`);

            console.log(response);
            response?.data?.success && onComplete(otp);
            if (!response?.data?.success) {
                toast('Incorrect OTP! Please confirm and try again');
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
                Please enter the OTP you received on your Dyakro OTP mobile application!
            </Typography>
            <Typography variant='body-xs-medium' as="p" className="mt-3">
                Make sure to download your OTP application from the App store or Play store,
                based on your mobile device.
            </Typography>
            <OTPInput otp={otp} setOTP={setOTP} length={length} onComplete={handleComplete} />
            <div className='flex items-center justify-center space-x-2 p-1 mt-2'>
                <Button variant='primary' onClick={() => onComplete(otp.join(''))}>Submit</Button>
                <Button variant='primary' onClick={() => generateOTP()}>Generate OTP</Button>
            </div>
        </div>
    );
};

export default OTP;
