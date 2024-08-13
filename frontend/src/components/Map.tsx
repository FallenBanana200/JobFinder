import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "../css/Map.css";

interface MarkerData {
    geocode: LatLngTuple;
    popUp: string;
}

function Map() {
    const markers: MarkerData[] = [
        {
            geocode: [48.68, 2.3522],
            popUp: "Addidas"
        },
        {
            geocode: [48.85, 2.3522],
            popUp: "Healthcare Provider LLC"
        },
        {
            geocode: [48.855, 2.34],
            popUp: "FinTech Solutions"
        },
        {
            geocode: [48.87, 2.35],
            popUp: "Tech Innovations Co."
        },
        {
            geocode: [48.82, 2.34],
            popUp: "Green Energy Solutions"
        },
        {
            geocode: [48.86, 2.33],
            popUp: "Global Financial Services"
        },
        {
            geocode: [48.84, 2.36],
            popUp: "Creative Design Agency"
        }
    ];

    return (
        <>
            <MapContainer
                center={[48.8566, 2.3522]}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: "70vh", width: "80vw" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker position={marker.geocode} key={index}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
                <Marker position={[48.83, 2.37]}>
                    <Popup>You</Popup>
                </Marker>
            </MapContainer >
        </>
    );
}

export default Map;
