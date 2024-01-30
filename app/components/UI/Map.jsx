import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';



const Map = ({ latitude, longitude, isSelectable, onSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState({ lat: latitude, lng: longitude });
    const googleMapsApiKey = "AIzaSyCT3dCEg1vWJEHdlrYjeKD9LZBTrQhuKkM"
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
        const lat = latLng.lat().toFixed(5);
        const lng = latLng.lng().toFixed(5)
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
