import React, { useEffect, useState } from 'react'
import { axiosClient as axios } from "../../../services/axiosClient"

import Button from '@/src/app/[locale]/components/Shared/Button'
import Typography from '@/src/app/[locale]/components/Shared/Typography'
import CaravanLocation from "./CaravanLocation"
import PaymentFrequency from "./PaymentFrequency"
import TentsSelector from './TentsSelector'
import FromToDatePicker from "./FromToDatePicker"
import AvailableServices from "./AvailableSevices"

import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

const RentingDetails = ({ rentingInfo, property, setStep, onChange }) => {

  const [fromToDates, setFromToDates] = useState({})
  const [availableTents, setAvailableTents] = useState([])
  const [selectedTents, setSelectedTents] = useState([])
  const [showTents, setShowTents] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [paymentFrequency, setPaymentFrequency] = useState('daily')
  const [overlapError, setOverlapError] = useState(false)
  const [validationError, setValidationError] = useState('');
  const [caravanLocation, setCaravanLocation] = useState('')
  const { data: session } = useSession()
  const t = useTranslations("Application.RentingDetails")

  let isCaravanMovable = (property?.category === "caravan" && property?.type === "movable")
  let isCaravanFixed = (property?.category === "caravan" && property?.type === "fixed")
  let isTentGroup = property?.category === "tent_group"
  let isRent = property?.payment_type === "rent"
  let hasServices = property?.services?.length > 0
  useEffect(() => {
    if (property && !isTentGroup && !isCaravanMovable) {
      setPaymentFrequency(property?.is_weekly ? "weekly" : property?.is_monthly ? "monthly" : "daily")
    }
  }, [property])
  useEffect(() => {
    const getTents = async () => {
      let datesBody = {
        "startDate": fromToDates.fromDate,
        "endDate": fromToDates.toDate,
        "property": property?._id
      }
      try {
        let response = await axios.post("/rents/available-tents", datesBody)
        if (response.status === 200) {
          setShowTents(true)
          if (response.data.data.availableTents.length)
            setAvailableTents(response.data.data.availableTents)
        }
      } catch (e) {
        console.error(e)
      }
    }

    if (property?.category === "tent_group") {
      if (fromToDates.fromDate && fromToDates.toDate && session) {
        getTents()
      }
    }
  }, [fromToDates, session, property?.category])

  const validateAndProceed = () => {
    setValidationError('');

    if (isCaravanMovable) {
      if (caravanLocation === "") {
        setValidationError(t("Errors.caravan"))
        return
      }
    }

    if (property?.category === 'tent_group') {
      if (selectedTents.length < 1) {
        setValidationError(t("Errors.tents"));
        return;
      }

      // If property is a tent group, set payment frequency to 'daily'
      setPaymentFrequency('daily');
    } else {
      // If property is not a tent group, check for selected payment frequency
      if (!paymentFrequency) {
        setValidationError(t("Errors.frequency"));
        return;
      }
    }


    if (!fromToDates.fromDate || !fromToDates.toDate) {
      setValidationError(t("Errors.dates"));
      return;
    }
    if (overlapError) {
      return
    }

    rentingInfo = {
      start_date: fromToDates.fromDate,
      end_date: fromToDates.toDate,
      property: property._id,
      rent_type: paymentFrequency || "daily",
    }
    selectedServices.length > 0 && (rentingInfo.services = selectedServices)
    if (property?.category === 'tent_group') rentingInfo.tents = selectedTents
    if (isCaravanMovable) {
      rentingInfo.lat = caravanLocation.lat
      rentingInfo.long = caravanLocation.lng
    }

    onChange(rentingInfo)
    // If all validations pass, continue to the next step
    setStep((step) => step + 1);
  };

  return (
    <>
      <Typography variant='h4' as='h4' className={`mt-16 text-black mb-2`}>{t("title")}</Typography>
      <div className='mt-8 p-6 border border-gray-200 rounded-lg'>

        {/* only render CaravanLocation if property is movable caravan */}
        {(property?.category === "caravan" && property?.type === "movable") &&
          <CaravanLocation isSelectable={true} onChange={(location) => setCaravanLocation(location)} />
        }

        {/* PaymentFrequency selector not rendered in tent_group, frequency fixed to daily */}
        {(!isTentGroup && isRent) &&
          <PaymentFrequency paymentFrequency={paymentFrequency} property={property} onChange={(value) => setPaymentFrequency(value)} />
        }
        {isRent &&
          <FromToDatePicker
            paymentFrequency={paymentFrequency}
            overlapError={overlapError}
            setOverlapError={setOverlapError}
            property={property}
            onDateChange={(values) => {
              if (values.fromDate !== null && values.toDate !== null) {
                setFromToDates(values)
              }
            }}
          />}
        {showTents &&
          <TentsSelector
            options={availableTents}
            onChange={(selections) => {
              setSelectedTents(selections)
            }}
          />
        }
        {hasServices &&
          <AvailableServices property={property} onChange={(values) => setSelectedServices(values)} />
        }

        <div className='my-2 py-2 pl-4 pr-6' />
        {validationError && <p className="text-error">{validationError}</p>}
        <div className='w-full flex justify-center items-center'>
          <Button
            variant="primary"
            className="block w-10/12 mx-auto my-2 md:ml-auto md:mr-0 md:w-1/2"
            onClick={validateAndProceed}
          >
            {t("continue")}
          </Button>
        </div>
      </div>


    </>
  )
}

export default RentingDetails