import React from 'react'
import FeatureItem from './FeatureItem'
import HeadTitle from './HeadTitle'
import { calculateDifference, capitalizeFirst, squareMetersToSquareFeet } from '@/app/utils/utils'
import { getYear, format } from "date-fns"

function FeatureComponent({ property }) {
    const weeksDiff = calculateDifference(property?.createdAt ? new Date(property?.createdAt) : new Date(property?.updatedAt), true)
    const isAvailable = calculateDifference(property?.available_date, false) >= 0
    console.log(weeksDiff)

    return (
        <div className='py-12 border-b  border-gray-200'>
            <HeadTitle text="Unit Features" />
            <div className='flex flex-col md:flex-row md:space-x-20'>
                <div className='md:w-1/2'>
                    <ul className='space-y-5'>
                        <FeatureItem firstText="Listed on " secondText={`${weeksDiff} ${weeksDiff === 1 ? "week" : "weeks"} `} companyName={true} />
                        <FeatureItem firstText="Date available" secondText={isAvailable ? "Available now" : `Available from ${format(new Date(property?.available_date), "dd/MM/yyyy")}`} />
                        <FeatureItem firstText="Year Built" secondText={getYear(new Date(property?.createdAt)).toString()} />
                        <FeatureItem firstText="Type" secondText={capitalizeFirst(property.type)} />

                    </ul>
                </div>
                <div className='md:w-1/2 mt-5 md:mt-0'>
                    <ul className='space-y-5'>
                        <FeatureItem firstText="City" secondText={capitalizeFirst(property.city)} />
                        {property.area && <FeatureItem firstText="Size" secondText={`${property.area} m2`} />}
                        {property.area && <FeatureItem firstText="Lot Size" secondText={`${Math.floor(squareMetersToSquareFeet(property.area))} sqft`} />}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FeatureComponent