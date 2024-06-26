import React, { useEffect, useState } from 'react';
import Map from '../../../components/UI/Map';
import { useTranslations } from 'next-intl';


const CaravanLocation = ({ isSelectable, onChange }) => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [displayLocation, setDisplayLocation] = useState("")
    const t = useTranslations("Application.RentingDetails")
    useEffect(() => {
        if (window.google && window.google.maps) {
            const geocoder = new window.google.maps.Geocoder();
            const latLng = new window.google.maps.LatLng(selectedLocation.lat, selectedLocation.lng);
            if (selectedLocation.lat && selectedLocation.lng) {
                geocoder.geocode({ location: latLng }, (results, status) => {
                    if (status === 'OK') {
                        const address = results[0].formatted_address;
                        setDisplayLocation(address)
                    } else {
                        console.error('Reverse geocode was not successful for the following reason:', status);
                        setDisplayLocation("")
                    }
                });
            }
        }
    }, [selectedLocation]);

    const handleSelect = (location) => {
        setSelectedLocation(location);
        onChange(location)
    };
    let { lat, lng } = selectedLocation
    return (
        <div>
            <Map
                latitude={29.2799283891296}
                longitude={47.90808142031251}
                isSelectable={isSelectable}
                onSelect={handleSelect}
            />

            <div className='p-4 border rounded-lg border-main-300 my-2'>
                <label>
                    {t("location")}:
                    <input className='relative block w-full rounded-lg border border-gray-200 py-3 px-5 text-black outline-none focus:border-main-yellow-600 focus-visible:ring-main-yellow-600'
                        type="text" value={displayLocation === "" ? selectedLocation : displayLocation} disabled />
                </label>
            </div>
        </div>
    );
};

export default CaravanLocation;
