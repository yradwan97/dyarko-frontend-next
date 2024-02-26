import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';



const Map = ({ latitude, longitude, isSelectable, onSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState({ lat: latitude, lng: longitude });
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
        <>
            {isSelectable && <p className='mb-2'>Drag the pin and drop to select a location.</p>}
            <GoogleMap mapContainerStyle={mapStyles} zoom={11} center={defaultCenter}>
                <Marker
                    position={selectedPosition}
                    draggable={isSelectable}
                    onDragEnd={handleMarkerDragEnd}
                />
            </GoogleMap>
        </>
    );
};

export default Map;
