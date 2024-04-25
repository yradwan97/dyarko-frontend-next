import React, { useState, useEffect } from 'react';
import Typography from '@/app/components/Shared/Typography';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import Process from './Process';
import Button from '@/app/components/Shared/Button';
import CustomProperty from './CustomProperty';
import RentingDetails from './RentingDetails';
import { useGetSingleProperty } from '@/app/property-listing/propertiesApis';
import { useRouter } from 'next/navigation';
import AgreementTerms from './AgreementTerms';
import OTP from './OTP';
import { axiosClient as axios } from '../../../services/axiosClient';
import PaymentMethod from './PaymentMethod';
import { toast } from 'react-toastify';
import PaymentInvoice from './PaymentInvoice';
import { prettifyError } from '@/app/utils/utils';
import scrollToTop from '@/app/utils/scrollToTop';


const ApplicationContents = ({ id }) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState();
  const [rentingInfo, setRentingInfo] = useState({});
  const [response, setResponse] = useState(null);
  const [property, setProperty] = useState()
  const { data } = useGetSingleProperty(id);
  const router = useRouter();


  useEffect(() => {
    if (data && data?.data) {
      setProperty(data?.data.data)
    }
  }, [data])

  useEffect(() => {
    scrollToTop()
    if (step > 5) {
      router.push("/")
    }
  }, [step])

  const onComplete = async (otp) => {
    try {
      let response = await axios.post(`/otp/${otp}`, null);

      if (response?.data?.success) {
        setStep((step) => step + 1);
      } else {
        toast('Incorrect OTP! Please confirm and try again');
      }
      return;
    } catch (e) {
      console.error(e)
      if (e.response?.data?.errors[0]?.msg) {
        toast.error(prettifyError(e.response?.data?.errors[0]?.msg))
      } else {
        toast.error("Incorrect OTP. Try again!")
      }
    }
  };



  const onCheckOut = async () => {
    let rentObject = { ...rentingInfo, payment_method: selectedMethod.key };

    try {
      let response = await axios.post('/rents', rentObject);

      // Save the response for later use
      setResponse(response?.data?.data);
      setStep(step => step + 1)
    } catch (e) {
      console.error(e)
      if (e.response?.data?.errors[0]?.msg) {
        toast.error(prettifyError(e.response.data.errors[0].msg))
      } else {
        toast.error("Something went wrong.")
      }
    }
  };

  const handleInvoiceComplete = async () => {
    router.push("/")
  }

  return (
    <div className="container py-20">
      {step > 1 && <div className="flex items-center mb-7">
        <ChevronLeftIcon className="w-5 h-6 mr-2.5 text-main-600" />
        <Button onClick={() => setStep(step => step - 1)} className="text-main-600 text-md font-bold">
          Back
        </Button>
      </div>}
      <div className="lg:w-8/12 mx-auto">
        <Typography
          variant="h2"
          as="h2"
          className="text-2xl sm:text-4xl text-black font-bold leading-[44px] sm:leading-[56px] text-center mb-10"
        >
          Tenancy Application
        </Typography>
        <Process step={step} />

        {data?.data && <CustomProperty property={property} />}

        {step === 1 ? (
          <RentingDetails rentingInfo={rentingInfo} onChange={(values) => setRentingInfo(values)} property={property} setStep={setStep} />
        ) : step === 2 ? (
          <AgreementTerms onContinue={() => setStep((step) => step + 1)} property={property} />
        ) : step === 3 ? (
          <OTP onComplete={(otp) => onComplete(otp)} />
        ) : step === 4 ? (
          <PaymentMethod onChange={(value) => setSelectedMethod(value)} onCheckOut={onCheckOut} />
        ) : step === 5 ? (
          <PaymentInvoice property={property} onEnd={handleInvoiceComplete} paymentDetails={response} />
        ) : null}
      </div>


    </div>
  );
};

export default ApplicationContents;
