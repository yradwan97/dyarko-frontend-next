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
import { toast, ToastContainer } from 'react-toastify';
import PaymentInvoice from './PaymentInvoice';


const ApplicationContents = ({ id }) => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState();
  const [rentingInfo, setRentingInfo] = useState();
  const [response, setResponse] = useState(null);
  const [property, setProperty] = useState()
  const { data } = useGetSingleProperty(id);
  const router = useRouter();

  // useEffect(() => {
  //   router.refresh()
  // }, [])


  useEffect(() => {
    if (data && data?.data) {
      setProperty(data?.data)
      if (data.data.payment_type === "cash") {
        setStep(2)
      }
    }
  }, [data])

  const onComplete = async (otp) => {
    console.log(otp);
    let response = await axios.post(`/otp/${otp}`, null);

    console.log(response);
    response?.data?.success && setStep((step) => step + 1);
    !response?.data?.success && toast('Incorrect OTP! Please confirm and try again');
    return;
  };



  const onCheckOut = async () => {
    let rentObject = { ...rentingInfo, payment_method: selectedMethod.key };
    console.log(rentObject);
    let response = await axios.post('/rents', rentObject);

    console.log(response.data.data);

    // Save the response for later use
    setResponse(response?.data?.data);
    setStep(step => step + 1)
  };

  useEffect(() => {

  }, property)
  const handleInvoiceComplete = async () => {
    router.push("/")
  }

  return (
    <div className="container py-20">
      <div className="flex items-center mb-7">
        <ChevronLeftIcon className="w-5 h-6 mr-2.5 text-main-600" />
        <Button onClick={() => router.back()} className="text-main-600 text-md font-bold">
          Back
        </Button>
      </div>
      <div className="lg:w-8/12 mx-auto">
        <Typography
          variant="h2"
          as="h2"
          className="text-2xl sm:text-4xl text-black font-bold leading-[44px] sm:leading-[56px] text-center mb-10"
        >
          Tenancy Application
        </Typography>
        <Process step={step} />

        {data?.data && <CustomProperty property={data.data} />}

        {step === 1 ? (
          <RentingDetails onChange={(values) => setRentingInfo(values)} property={data?.data} setStep={setStep} />
        ) : step === 2 ? (
          <AgreementTerms onContinue={() => setStep((step) => step + 1)} property={data?.data} />
        ) : step === 3 ? (
          <OTP onComplete={(otp) => onComplete(otp)} />
        ) : step === 4 ? (
          <PaymentMethod onChange={(value) => setSelectedMethod(value)} onCheckOut={onCheckOut} />
        ) : step === 5 ? (
          <PaymentInvoice property={property} onEnd={handleInvoiceComplete} paymentDetails={response} />
        ) : null}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ApplicationContents;
