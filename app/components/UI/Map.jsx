import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const Map = ({ latitude, longitude, isSelectable, onSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState({ lat: latitude, lng: longitude });
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    const mapStyles = {
        height: '400px',
        width: '100%',
    };

    const defaultCenter = {
        lat: latitude,
        lng: longitude,
    };

    const handleMarkerDragEnd = (event) => {
        const { latLng } = event;
        const lat = parseFloat(latLng.lat().toFixed(5));
        const lng = parseFloat(latLng.lng().toFixed(5))
        setSelectedPosition({ lat, lng });
        onSelect({ lat, lng });
    };

    useEffect(() => {
        setSelectedPosition({ lat: latitude, lng: longitude });
    }, [latitude, longitude]);

    return (
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
                <Marker
                    position={selectedPosition}
                    draggable={isSelectable}
                    onDragEnd={handleMarkerDragEnd}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
