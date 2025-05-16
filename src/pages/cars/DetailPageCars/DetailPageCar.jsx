import React, { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaTachometerAlt,
  FaGasPump,
  FaCar,
  FaWhatsapp,
} from "react-icons/fa";
import { FcCallback } from "react-icons/fc";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Camera, Heart, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { Link } from "react-router-dom";

mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const similarAds = [
  {
    id: 1,
    title: "Jeep Wrangler صحاري",
    image:
      "https://dbz-images.dubizzle.com/images/2025/03/20/3a5c4585de0d4e259b28caac0fe8cdd3-.jpeg?impolicy=carousel",
    price: "AED 127,000",
    tags: ["Jeep", "Wrangler"],
    photos: 20,
  },
  {
    id: 2,
    title: '"LOWEST PRICE" Jeep Wrangler',
    image:
      "https://dbz-images.dubizzle.com/images/2025/05/08/3d5ed17af1134088b3cf41d844b3d652-.jpeg?impolicy=carousel",
    price: "AED 134,000",
    tags: ["Jeep", "Wrangler"],
    photos: 20,
  },
  {
    id: 3,
    title: "JEEP WRANGLER SPORT 3.6",
    image:
      "https://dbz-images.dubizzle.com/images/2025/02/22/b92101e8bc6c488bb15d2e7a2450a5aa-.jpeg?impolicy=carousel",
    price: "AED 136,500",
    tags: ["Jeep", "Wrangler"],
    photos: 13,
  },
  {
    id: 4,
    title: "2650 AED Monthly...",
    image:
      "https://dbz-images.dubizzle.com/images/2025/04/19/8b9655836d874e33a108cdc6d6e0cb88-.jpeg?impolicy=carousel",
    price: "AED 133,000",
    tags: ["Jeep", "Wrangler"],
    photos: 18,
  },
];



const reportReasons = [
  "Spam",
  "Fraud",
  "Miscategorized",
  "Repetitive Listing",
  "Copyright Infringement",
  "Not Available",
  "Incorrect Pricing",
];

const images = [
  'https://dbz-images.dubizzle.com/images/2025/05/13/bf814f0c45654c3798bb4c82a21a15cb-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/f31b9781103b4e6baf3c6bf085a11d8d-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/8b6c0282300b4a54a864f9095d17fa72-.jpeg?impolicy=dpv',
 ' https://dbz-images.dubizzle.com/images/2025/02/01/b94eb019484847ebab72a6793054201f-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/58dee88598ce495c823c4da8b2b1a505-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/9d34561d830c469fa65593e2abb97612-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/550f1ee6cfb64ffc8aa92945d0f64fd5-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/e441560965b844dc974efe35c7cf94a7-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/71b4465ffc584460a4da5a9e7e459859-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/9b0900cc28d546f3bbd8e7fdc3085fb1-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/e7140364d9244c2a9b728940ac74b686-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/8353f7104f574cf9886b53fc70ad64dd-.jpeg?impolicy=dpv',
  'https://dbz-images.dubizzle.com/images/2025/02/01/e2fa8346058e41d3b090757bafa37715-.jpeg?impolicy=dpv',
];


const DetailPageCar = () => {
  const [driversOpen, setDriversOpen] = useState(true);
  const [othersOpen, setOthersOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/streets-v11"
  );

  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);
   const [isOpe, setIsOpe] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
  
    const openModal = (index) => {
      setSelectedIndex(index);
      setIsOpe(true);
    };
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollBy({ left: -220, behavior: "smooth" });
    } else {
      current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [55.1535, 24.9843],
      zoom: 13,
    });

    // Add marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([55.1535, 24.9843])
      .addTo(map);

    return () => map.remove();
  }, [mapStyle]);

  return (
    <>
    <div className="container" style={{ padding: "0px 8px" }}>
    <div className="p-6 bg-white min-h-screen font-sans">
        {/* Nav Bar */}
      <div className="flex items-center text-sm text-gray-600 space-x-2 p-4">
      <Link to="/motors/used-cars/" className="text-blue-600 font-medium hover:underline flex items-center">
        ← Back To Search
      </Link>
      <span className="text-gray-400">|</span>

      <Link to="/uae" className="hover:underline text-gray-600">
        UAE
      </Link>
      <ChevronRight size={16} className="text-gray-400" />

      <Link to="/uae/motors" className="hover:underline text-gray-600">
        Motors
      </Link>
      <ChevronRight size={16} className="text-gray-400" />

      <Link to="/uae/motors/cars" className="hover:underline text-gray-600">
        Cars
      </Link>
      <ChevronRight size={16} className="text-gray-400" />

      <Link to="/uae/motors/cars/jeep" className="hover:underline text-gray-600">
        Jeep
      </Link>
      <ChevronRight size={16} className="text-gray-400" />

      <Link to="/uae/motors/cars/jeep/wrangler" className="font-semibold text-black hover:underline">
        Wrangler
      </Link>
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">

          {/* Image layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto p-4">
        {/* Left large image */}
        <div className="col-span-2">
          <img
            src={images[0]}
            alt="Main View"
            className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Right stacked images */}
        <div className="flex flex-col gap-4 relative cursor-pointer">
          <img
            src={images[1]}
            alt="Top Right View"
            className="rounded-2xl shadow-lg w-full h-[195px] object-cover"
            onClick={() => openModal(1)}
          />
          <img
            src={images[2]}
            alt="Bottom Right View"
            className="rounded-2xl shadow-lg w-full h-[195px] object-cover"
            onClick={() => openModal(2)}
          />

          {/* Overlay with count */}
          <div
            className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm rounded-full px-3 py-1 font-semibold"
            onClick={() => setIsOpe(true)}
          >
            13
          </div>
        </div>
      </div>

      {/* Modal for grid gallery */}
      {isOpe && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Image Gallery</h2>
              <button
                className="text-red-500 text-3xl font-bold leading-none"
                onClick={() => setIsOpen(false)}
                aria-label="Close Modal"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery Image ${index + 1}`}
                  className="rounded-xl w-full h-40 object-cover cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setSelectedIndex(index)}
                  style={{
                    border: index === selectedIndex ? '3px solid #3b82f6' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

          <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Price and title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-2xl font-bold">AED 129,990</p>
                <p className="text-lg mt-1">Jeep Wrangler Rubicon</p>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z"
                      />
                    </svg>
                    2021
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 10h2l1 2h13"
                      />
                    </svg>
                    63,000 km
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Left Hand
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M15 12l-3-3-3 3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    GCC Specs
                  </div>
                </div>
              </div>

              {/* Favorite and share buttons */}
              <div className="flex gap-3">
                <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Favorite
                </button>
                <button className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-100 transition flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-2.447 1.894L15 14m-6 4v-5a2 2 0 012-2h4"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Divider */}
            <hr />

            {/* Car Overview */}
            <div className="flex flex-col md:flex-row md:gap-16 text-gray-800">
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-lg mb-2">Car Overview</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="flex justify-between">
                    <span>Body Type</span>
                    <span className="font-semibold">SUV</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exterior Color</span>
                    <span className="font-semibold">Black</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Doors</span>
                    <span className="font-semibold">2 door</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interior Color</span>
                    <span className="font-semibold">Black</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Seating Capacity</span>
                    <span className="font-semibold">4 Seater</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Type</span>
                    <span className="font-semibold">Petrol</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Engine Capacity (cc)</span>
                    <span className="font-semibold">3500 - 3999 cc</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horsepower</span>
                    <span className="font-semibold">200 - 299 HP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>No. of Cylinders</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transmission Type</span>
                    <span className="font-semibold">
                      Automatic Transmission
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty</span>
                    <span className="font-semibold">Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Market</span>
                    <span className="font-semibold">UAE (can be exported)</span>
                  </div>
                </div>
              </div>

              {/* Dealer contact card */}
              <div className="mt-8 md:mt-0 w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/path/to/park-lane-motors-logo.png"
                    alt="Park Lane Motors"
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Park Lane Motors</h4>
                    <p className="text-sm text-gray-500">Dealer</p>
                    <a
                      href="#"
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View All Cars
                    </a>
                  </div>
                </div>
                <div className="bg-blue-50 rounded p-4 flex items-center gap-4 mb-4">
                  <div className="flex-grow text-sm">
                    <p className="font-semibold mb-1">Become a verified user</p>
                    <p>Push your ad to the top and get maximum exposure</p>
                  </div>
                  <button className="bg-black text-white text-xs font-semibold py-2 px-4 rounded">
                    Get Started
                  </button>
                </div>
                <div className="flex gap-4">
                  <button className="flex-grow bg-red-100 text-red-600 rounded py-2 flex items-center justify-center gap-2 hover:bg-red-200 transition">
                    <FcCallback />
                    Call
                  </button>
                  <button className="flex-grow bg-green-100 text-green-600 rounded py-2 flex items-center justify-center gap-2 hover:bg-green-200 transition">
                    <FaWhatsapp />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr />

          <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-900">
            {/* Heading */}
            <h2 className="font-bold text-xl tracking-wide">
              2 DOOR &middot; RUBICON &middot; UNDER WARRANTY AGENCY
            </h2>

            {/* Description with Read More */}
            <p className="whitespace-pre-line">
              NB
              <br />
              <br />
              JEEP WRANGLER RUBICON 2021...
              <br />
              <br />
              {expanded ? (
                <>
                  •Trim: Rubicon <br />
                  •Odometer: 63,000 Km’s <br />
                  •Regional Specification: GCC Spec <br />
                  •Warranty: Till 27/12/2026 or 100,000 KM’s Agency <br />
                  •Engine: 3.6 ,6 CYLINDER | 267 HP <br />
                  •Transmission: 5 Speed Automatic <br />
                  •Color: Black Crystal Exterior | Black Interior <br />
                  <br />
                  AED 129,990 | 2,308 PM
                  <br />
                  <br />
                  FEATURES <br />
                  •Iconic, rugged Jeep design with off-road capability <br />
                  •17-inch alloy wheels with off-road tires <br />
                  •LED headlights, taillights, and fog lights <br />
                  •Aggressive front grille with red tow hooks <br />
                  •Wide fender flares for larger tires <br />
                  •Heavy-duty steel front bumper <br />
                  •Durable skid plates for underbody protection <br />
                  •Functional and stylish black grille accents <br />
                  •Advanced multistage airbags (front, side, and curtain) <br />
                  •Electronic Stability Control (ESC) <br />
                  •Anti-lock Braking System (ABS) <br />
                  •Traction Control System (TCS) <br />
                  •Hill Start Assist and Hill Descent Control <br />
                  •Rearview camera with dynamic grid lines <br />
                  •Park Sense rear park assist system <br />
                  •Blind Spot Monitoring <br />
                  •Forward Collision Warning with Active Braking <br />
                  •Roll mitigation system for added stability <br />
                  •High-strength steel frame for crash protection <br />
                  •Premium cloth or available leather-trimmed seats <br />
                  •8.4-inch Uconnect touchscreen infotainment system <br />
                  •Apple CarPlay and Android Auto integration <br />
                  •Bluetooth hands-free calling and streaming <br />
                  •7-inch digital driver display <br />
                  •Automatic climate control system <br />
                  •Premium audio system with 9 speakers <br />
                  •Leather-wrapped steering wheel with audio controls <br />
                  <br />
                  WHY PARK LANE MOTORS? <br />
                  Park Lane Motors, an award-winning automotive showroom, has
                  extended its legacy to Dubai Investment Park, showcasing a
                  curated selection of high quality new & used vehicles.
                  Renowned for excellence, this expansion reflects the brand’s
                  commitment to delivering unmatched customer experiences in the
                  dynamic automotive market. Park Lane Motors in Dubai
                  Investment Park stands as a testament to the brand’s
                  dedication to setting new standards in the world of
                  automobiles.
                  <br />
                  <br />
                  SELLING YOUR CAR? <br />
                  Let Us Buy Your Car! <br />
                  •FREE Inspection and Evaluation <br />
                  •Guaranteed Exceptional Price <br />
                  •Auto-loan Clearance <br />
                  •Instant Cash Payment <br />
                  <br />
                  Let Us Sell Your Car! (Consignment) <br />
                  •FREE Listing Online <br />
                  •Showroom Condition Detailing <br />
                  •Handling Viewings <br />
                  •Bank Loan Clearance <br />
                  •Instant Cash Payment Upon Sale <br />
                  <br />
                  Website: www.parklanemotorcars.com <br />
                  Instagram: @Parklanemotors <br />
                  Tiktok: @Parklanemotorcars <br />
                  <br />
                  Contact Us Today! <br />
                  Unleash the power of driving with Park Lane Motors. Call us or
                  visit our showroom at Dubai Investment Park 1. <br />
                  Map Link: https://maps.app.goo.gl/qrQmxnyevKHXD9Y19 <br />
                </>
              ) : (
                <>
                  <span className="text-gray-600">
                    Click below to view full details...
                  </span>
                </>
              )}
            </p>

            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 font-semibold hover:underline"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>

            {/* Posted date */}
            <p className="mt-4 text-sm">
              <strong>Posted on:</strong> 3rd May 2025
            </p>

            <hr />

            {/* Features section */}
            <section>
              <h3 className="font-semibold text-lg mb-3">Features</h3>

              {/* Drivers Assistance & Safety */}
              <div className="mb-6 border rounded-md">
                <header
                  onClick={() => setDriversOpen(!driversOpen)}
                  className="flex justify-between items-center p-4 cursor-pointer select-none bg-gray-50"
                >
                  <h4 className="font-semibold text-md">
                    Drivers Assistance & Safety
                  </h4>
                  <span className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 text-sm font-semibold select-none">
                    4
                  </span>
                  <button
                    aria-label={driversOpen ? "Collapse" : "Expand"}
                    className="ml-3 text-gray-600"
                  >
                    {driversOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                </header>

                {driversOpen && (
                  <ul className="grid grid-cols-2 gap-4 p-4 text-sm">
                    {[
                      "All Wheel Drive",
                      "Dual Exhaust",
                      "Cruise Control",
                      "Front Airbags",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Others */}
              <div className="border rounded-md">
                <header
                  onClick={() => setOthersOpen(!othersOpen)}
                  className="flex justify-between items-center p-4 cursor-pointer select-none bg-gray-50"
                >
                  <h4 className="font-semibold text-md">Others</h4>
                  <span className="flex items-center justify-center bg-gray-200 rounded px-2 py-1 text-sm font-semibold select-none">
                    2
                  </span>
                  <button
                    aria-label={othersOpen ? "Collapse" : "Expand"}
                    className="ml-3 text-gray-600"
                  >
                    {othersOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>
                </header>

                {othersOpen && (
                  <ul className="p-4 text-sm space-y-2">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                  </ul>
                )}
              </div>
            </section>

            <div className="max-w-4xl mx-auto p-6">
              <h2 className="text-xl font-bold mb-2">Location</h2>
              <p className="text-gray-700 mb-4">Green Community, Dubai, UAE</p>

              <div className="flex space-x-2 mb-2">
                <button
                  onClick={() =>
                    setMapStyle("mapbox://styles/mapbox/streets-v11")
                  }
                  className="px-4 py-1 border rounded text-sm font-medium bg-white hover:bg-blue-100"
                >
                  Map
                </button>
                <button
                  onClick={() =>
                    setMapStyle("mapbox://styles/mapbox/satellite-v9")
                  }
                  className="px-4 py-1 border rounded text-sm font-medium bg-white hover:bg-blue-100"
                >
                  Satellite
                </button>
              </div>

              <div
                ref={mapContainerRef}
                className="h-64 rounded overflow-hidden shadow"
              />
            </div>

            <div className="relative">
              {/* Trigger Button */}

              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <Flag className="w-4 h-4" />
                Report This Ad
              </button>

              {/* Modal */}
              {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                  <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b p-4">
                      <h3 className="text-lg font-semibold">
                        Report this listing
                      </h3>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-red-500 text-2xl"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Body */}
                    <ul className="divide-y text-sm">
                      {reportReasons.map((reason, index) => (
                        <li
                          key={index}
                          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            // Submit or handle reason here
                            alert(`Reported: ${reason}`);
                            setIsOpen(false);
                          }}
                        >
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 relative">
              <h2 className="text-xl font-semibold mb-4">Similar Ads</h2>

              {/* Carousel Container */}
              <div className="relative">
                {/* Scroll Buttons */}
                <button
                  onClick={() => scroll("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-1 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Scrollable Flex Container */}
                <div
                  ref={scrollRef}
                  className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth px-6"
                >
                  {similarAds.map((ad) => (
                    <div
                      key={ad.id}
                      className="min-w-[200px] max-w-[220px] rounded-lg bg-white shadow-sm border"
                    >
                      <div className="relative">
                        <img
                          src={ad.image}
                          alt={ad.title}
                          className="w-full h-40 object-cover rounded-t-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Camera size={12} />
                          {ad.photos}
                        </div>
                        <Heart className="absolute top-2 right-2 text-white w-5 h-5 cursor-pointer" />
                      </div>
                      <div className="p-2">
                        <h3 className="text-sm font-medium truncate">
                          {ad.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {ad.tags.join(" • ")}
                        </p>
                        <p className="text-base font-semibold text-black mt-1">
                          {ad.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default DetailPageCar;
