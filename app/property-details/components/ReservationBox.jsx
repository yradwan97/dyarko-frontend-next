import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import Line from '../../property-search/components/Line'
import Button from '../../components/Shared/Button'
import Typography from '../../components/Shared/Typography'
import DocumentOutline from '../../components/UI/icons/DocumentOutline'
import CalenderOutline from '../../components/UI/icons/CalenderOutline'
import ChevronDown from '../../components/UI/icons/ChevronDown'
import LocationControlSolid from '../../components/UI/icons/LocationControlSolid'
import ScheduleTour from './ScheduleTour'
import { getPropertyPeriod, getPropertyPrice } from '@/app/utils/utils'


function ReservationBox({ property }) {

    const [date, setDate] = useState(null)
    const [visible, setVisible] = useState(false)

    const getSubmitButtonText = () => {
        let text = ""
        switch (property?.payment_type) {
            case "rent":
                text = "Rent";
                break;
            case "installment":
                text = "Request Installment";
                break;
            default:
                text = "Select"
                break
        }

        return text
    }

    return (
        <>
            <ScheduleTour id={property?.owner?._id} visible={visible} setVisible={setVisible} />
            <div className='border-[1.5px] border-gray-200 rounded-md p-6 '>
                <Typography variant='body-xs' as="span" className="text-main-secondary">{property?.payment_type === "rent" && "Rent"} Price</Typography>
                <Typography variant='body-lg-bold' as="p" className="text-main-yellow-600">
                    ${property && getPropertyPrice(property)}
                    {property?.payment_type === "rent" && <sub><Typography variant='body-xs' as="span" className="text-main-secondary">{property && getPropertyPeriod(property)}</Typography></sub>}
                </Typography>
                <Button
                    variant='primary'
                    className="stroke-white hover:stroke-main-600 my-6 flex justify-center items-center leading-6 w-full"
                    to={`/application/${property?._id}`}
                >
                    <DocumentOutline className='stroke-inherit mr-1 w-5 h-5' />
                    <Typography variant='body-md-bold' as="span">{property && getSubmitButtonText()}</Typography>
                </Button>
                <Line />
                <Typography variant='body-lg-bold' as="p" className="my-6">Request a home tour</Typography>

                <Button onClick={() => setVisible(true)} variant="primary" className="bottom-7 w-full left-7 !bg-main-blue !border-main-blue flex justify-center my-6 items-center">
                    <LocationControlSolid className='stroke-white w-5 h-5 mr-1' />
                    <Typography variant='body-sm-bold' as='span' className="text-white transition-colors ease-in-out duration-500">Request a tour</Typography>
                </Button>
                <Typography variant='body-xs' as='span' className="text-gray-500">It’s free, with no obligation － cancel anytime.</Typography>
            </div>
        </>
    )
}

export default ReservationBox