import styles from './Map.module.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useURLPosition } from '../hooks/useURLPosition';

import Button from './Button';
function Map(){
    const {cities} = useCities();
    const [mapPosition, setMapPositon] = useState([40,0]);
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
    
    const [lat, lng] = useURLPosition();

    useEffect(function(){
        if(lat && lng)
            setMapPositon([lat,lng]);
    },
    [lat, lng]);

    useEffect(function(){
        if(geolocationPosition.lat || geolocationPosition.lng)
        {
            setMapPositon([geolocationPosition.lat, geolocationPosition.lng]);
        }
    },[geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {
                !geolocationPosition.lat&&(
                    <Button type='position' onClick={getPosition}>
                        {isLoadingPosition ? "Loading..." : "Use your position"}
                    </Button>
                )
            }
            <MapContainer 
                center={mapPosition}
                zoom={6} 
                scrollWheelZoom={true} 
                className={styles.map}>
                
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />

                {cities.map((city) =>(
                <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                    <Popup>
                        <span>{city.emoji}<span>{city.cityName}</span></span>
                    </Popup>
                </Marker>

                ))}
                <ChangeCenter position={mapPosition}/>
                <DetectClick />
            </MapContainer>
        </div>
    );
}

/* eslint-disable */
function ChangeCenter({position}){
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick(){
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}

export default Map;