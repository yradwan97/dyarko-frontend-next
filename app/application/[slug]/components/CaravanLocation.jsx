import React, { useState } from 'react';
import Map from '../../../components/UI/Map';

const CaravanLocation = ({ isSelectable, onChange }) => {
    const [selectedLocation, setSelectedLocation] = useState("");


    const handleSelect = (location) => {
        setSelectedLocation(location);
        onChange(location)
    };
    let { lat, lng } = selectedLocation
    return (
        <div>
            <Map
                latitude={29.2799283891296} // Set initial latitude
                longitude={47.90808142031251} // Set initial longitude
                isSelectable={isSelectable}
                onSelect={handleSelect}
            />

            <div className='p-4 border rounded-lg border-main-300 my-2'>
                <label>
                    Location:
                    <input className='relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600'
                        type="text" value={`${lat !== undefined ? `${selectedLocation?.lat},` : ""} ${lng !== undefined ? selectedLocation?.lng : ""}`} disabled />
                </label>
            </div>
        </div>
    );
};

export default CaravanLocation;
