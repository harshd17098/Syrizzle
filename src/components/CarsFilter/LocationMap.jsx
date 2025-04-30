import React, { useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaCar } from "react-icons/fa";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Flag } from "lucide-react";


L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const LocationMap = (onClick) => {
    const [showMap, setShowMap] = useState(false);
    const position = [25.0212, 55.2107]; 

    return (
        <>
            <div className="container m-auto">
                <div className="mt-6 w-8/12">
                    <h2 className="text-2xl font-semibold">Location</h2>
                    <p className="text-gray-700 mt-1">Green Community, Dubai, UAE</p>

                    <div className="relative mt-4 h-[300px] rounded-xl overflow-hidden shadow">
                        {!showMap && (
                            <>
                                {/* Blurred background */}
                                <img
                                    src="https://via.placeholder.com/800x300?text=Map+Blur"
                                    alt="Map background"
                                    className="w-full h-full object-cover filter blur-sm"
                                />

                                {/* Show Map Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button
                                        onClick={() => setShowMap(true)}
                                        className="bg-white shadow-lg px-4 py-2 rounded-full flex items-center gap-2 text-blue-600 font-medium hover:bg-gray-100"
                                    >
                                        <span className="relative w-5 h-5">
                                            <FaMapMarkerAlt className="absolute inset-0 text-blue-500 text-lg" />
                                            <FaCar className="absolute inset-0 text-white text-[10px] mt-[4px] ml-[1px]" />
                                        </span>
                                        <span>Show Map</span>
                                    </button>
                                </div>
                            </>
                        )}

                        {showMap && (
                            <MapContainer
                                center={position}
                                zoom={13}
                                scrollWheelZoom={false}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>Green Community, Dubai</Popup>
                                </Marker>
                            </MapContainer>
                        )}
                    </div>
                </div>
                <div className="border-t pt-4 w-8/12 flex justify-center">
                    <button
                        onClick={onClick}
                        className="flex items-center gap-2 text-sm p-5 text-black hover:bg-gray-100  rounded-xl hover:p-5"
                    >
                        <Flag className="w-4 h-4" strokeWidth={1.5} />
                        <span>Report This Ad</span>
                    </button>
                </div>
            </div >
        </>
    );
};

export default LocationMap;
