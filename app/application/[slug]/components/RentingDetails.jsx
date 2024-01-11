import React, { useEffect, useState } from 'react'
import { axiosClient as axios } from "../../../services/axiosClient"

import Button from '@/app/components/Shared/Button'
import Typography from '@/app/components/Shared/Typography'
import CaravanLocation from "./CaravanLocation"
import PaymentFrequency from "./PaymentFrequency"
import TentsSelector from './TentsSelector'
import FromToDatePicker from "./FromToDatePicker"
import AvailableServices from "./AvailableSevices"

import { useSession } from 'next-auth/react'

const RentingDetails = ({ property, setStep, onChange }) => {
  console.log(property)
  const [fromToDates, setFromToDates] = useState({})
  const [availableTents, setAvailableTents] = useState([])
  const [selectedTents, setSelectedTents] = useState([])
  const [showTents, setShowTents] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [paymentFrequency, setPaymentFrequency] = useState("daily")
  const [validationError, setValidationError] = useState('');
  const [caravanLocation, setCaravanLocation] = useState('')
  const { data: session } = useSession()
  let rentingInfo = {}
  let caravanMovable = (property?.category === "caravan" && property?.type === "movable")


  useEffect(() => {
    if (property?.category === "tent_group") {
      if (fromToDates.fromDate && fromToDates.toDate && session) {
        getTents()
      }
    }
  }, [fromToDates, session])

  const getTents = async () => {
    let datesBody = {
      "startDate": fromToDates.fromDate,
      "endDate": fromToDates.toDate,
      "property": property?._id
    }

    let response = await axios.post("/rents/available-tents", datesBody)
    if (response.status === 200) {
      setShowTents(true)
      if (response.data.data.availableTents.length)
        setAvailableTents(response.data.data.availableTents)
    }
  }



  const validateAndProceed = () => {
    setValidationError('');

    if (caravanMovable) {
      if (caravanLocation === "") {
        setValidationError("Please select a location to deliver the caravan.")
        return
      }
    }

    if (property?.category === 'tent_group') {
      if (selectedTents.length < 1) {
        setValidationError('Please select at least one tent for tent groups.');
        return;
      }

      // If property is a tent group, set payment frequency to 'daily'
      setPaymentFrequency('daily');
    } else {
      // If property is not a tent group, check for selected payment frequency
      if (!paymentFrequency) {
        setValidationError('Please select a payment frequency.');
        return;
      }
    }


    if (!fromToDates.fromDate || !fromToDates.toDate) {
      setValidationError('Please select start and end dates.');
      return;
    }

    rentingInfo = {
      start_date: fromToDates.fromDate,
      end_date: fromToDates.toDate,
      property: property._id,
      rent_type: paymentFrequency || "daily",
    }
    selectedServices.length > 0 && (rentingInfo.services = selectedServices)
    if (property?.category === 'tent_group') rentingInfo.tents = selectedTents
    if (caravanMovable) {
      rentingInfo.lat = caravanLocation.lat
      rentingInfo.long = caravanLocation.lng
    }

    onChange(rentingInfo)
    // If all validations pass, continue to the next step
    setStep((step) => step + 1);
  };

  return (
    <>
      <Typography variant='h4' as='h4' className={`mt-16 text-black mb-2`}>Renting Information</Typography>
      <div className='mt-8 p-6 border border-gray-200 rounded-lg'>

        {/* only render CaravanLocation if property is movable caravan */}
        {(property?.category === "caravan" && property?.type === "movable") &&
          <CaravanLocation isSelectable={true} onChange={(location) => setCaravanLocation(location)} />
        }

        {/* PaymentFrequency selector not rendered in tent_group, frequency fixed to daily */}
        {property?.category !== "tent_group" &&
          <PaymentFrequency property={property} onChange={(value) => setPaymentFrequency(value)} />
        }
        <FromToDatePicker paymentFrequency={paymentFrequency} property={property} onDateChange={(values) => {
          if (values.fromDate !== null && values.toDate !== null) {
            setFromToDates(values)
          }
        }} />
        {showTents &&
          <TentsSelector
            options={availableTents}
            onChange={(selections) => {
              setSelectedTents(selections)
            }}
          />
        }
        {property?.services?.length > 0 &&
          <AvailableServices property={property} onChange={(values) => setSelectedServices(values)} />
        }

        <div className='my-2 py-2 pl-4 pr-6' />
        {validationError && <p className="text-red-500">{validationError}</p>}
        <div className='w-full flex justify-center items-center'>
          <Button
            variant="primary"
            className="block w-10/12 mx-auto my-2 md:ml-auto md:mr-0 md:w-1/2"
            onClick={validateAndProceed}
          >
            Continue
          </Button>
        </div>
      </div>


    </>
  )
}

export default RentingDetails