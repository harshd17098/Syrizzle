import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Car, Truck, Activity, HardDrive, BarChart2, Cpu, Database, Film, Gift, Heart, IceCream, Key, } from "lucide-react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { FaTags, FaCarSide } from 'react-icons/fa';

import { FaSearch } from "react-icons/fa";

const allColors = [
    { name: "Black", color: "bg-[#2E2E2E]" },
    { name: "Blue", color: "bg-[#0066FF]" },
    { name: "Brown", color: "bg-[#8B4513]" },
    { name: "Burgundy", color: "bg-[#800020]" },
    { name: "Gold", color: "bg-gradient-to-r from-[#FFD700] to-[#FFFACD]" },
    { name: "Silver", color: "bg-[#C0C0C0]" },
    { name: "White", color: "bg-[#FFFFFF]" },
    { name: "Gray", color: "bg-[#808080]" },
    { name: "Green", color: "bg-[#228B22]" },
    { name: "Yellow", color: "bg-[#FFFF00]" },
    { name: "Orange", color: "bg-[#FFA500]" },
    { name: "Beige", color: "bg-[#F5F5DC]" },
    { name: "Navy", color: "bg-[#000080]" },
    { name: "Teal", color: "bg-[#008080]" },
    { name: "Purple", color: "bg-[#800080]" },
    { name: "Pink", color: "bg-[#FFC0CB]" },
    { name: "Champagne", color: "bg-[#F7E7CE]" },
    { name: "Copper", color: "bg-[#B87333]" },
    { name: "Charcoal", color: "bg-[#36454F]" },
    { name: "Sky Blue", color: "bg-[#87CEEB]" },
    { name: "Lime", color: "bg-[#BFFF00]" },
    { name: "Maroon", color: "bg-[#800000]" },
];


const allSpecs = [
    "N/A",
    "High-School / Secondary",
    "Bachelors Degree",
    "Masters Degree",
    "PhD"

];
const Badges = [
    "First Owner",
    "In Warranty",
    "Dealer Warranty",
    "Service History",
    "No Accidents",
    "Original Paint",
    "Service Contract",
];



const BODY_TYPES = [
    { label: "SUV", icon: Car },
    { label: "Coupe", icon: Car },
    { label: "Sedan", icon: Car },
    { label: "Crossover", icon: Activity },
    { label: "Hard Top Convertible", icon: HardDrive },
    { label: "Pick Up Truck", icon: Truck },
    { label: "Hatchback", icon: BarChart2 },
    { label: "Minivan", icon: Film },
    { label: "Wagon", icon: Cpu },
    { label: "Electric", icon: Gift },
    { label: "Luxury", icon: Heart },
    { label: "Diesel", icon: IceCream },
    { label: "Other", icon: Key },
];
const horsepowerOptions = [
    '0 - 99 HP',
    '100 - 199 HP',
    '200 - 299 HP',
    '300 - 399 HP',
    '400 - 499 HP',
    '500 - 599 HP',
    '600 - 699 HP',
    '700 - 799 HP',
    '800 - 899 HP',
    '900 + HP',
    'Unknown',

];


const engineCapacityOptions = [
    '0 - 499 cc',
    '500 - 999 cc',
    '1000 - 1499 cc',
    '1500 - 1999 cc',
    '2000 - 2499 cc',
    '2500 - 2999 cc',
    '3000 - 3499 cc',
    '3500 - 3999 cc',
    '4000+ cc',
    'Unknown',
];
const FiltersFreelancers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    const [isOp, setIsOp] = useState(false);
    const [isOpp, setIsOpp] = useState(false);
    const [isOpenn, setIsOpenn] = useState(false);
    const [search, setSearch] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isInspectedOnly, setIsInspectedOnly] = useState(false);

    const [showAll, setShowAll] = useState(false);
    const [showAlls, setShowAlls] = useState(false);
    const [showAlll, setShowAlll] = useState(false);
    const [showA, setShowA] = useState(false);
    const [show, setShow] = useState(false);

    const [showAllAdsPosted, setShowAllAdsPosted] = useState(false);
    const [showAllCylinders, setShowAllCylinders] = useState(false);

    const visibleColors = showA ? allColors : allColors.slice(0, 5);
    const visibleColor = show ? allColors : allColors.slice(0, 5);

    const [showAllHorsepower, setShowAllHorsepower] = useState(false);
    const [showAllEngineCapacity, setShowAllEngineCapacity] = useState(false);

    const remainingCount = allColors.length - 5;
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const dropdownRef = useRef();
    const [showAllSeats, setShowAllSeats] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [transmission, setTransmission] = useState("");
    const [transmissionn, setTransmissionn] = useState("");

    const [showAllTech, setShowAllTech] = useState(false);
    const [showAllExtras, setShowAllExtras] = useState(false);

    const seats = ["2", "4", "5", "6", "7", "8", "8+"];
    const [selectedDoor, setSelectedDoor] = useState(null);
    const doorOptions = [2, 3, 4, "5+"];

    const visibleSeats = showAllSeats ? seats : seats.slice(0, 5);
    const specsToShow = showAll ? allSpecs : allSpecs.slice(0, 5);
    const itemsToRender = showAlls ? BODY_TYPES : BODY_TYPES.slice(0, 6);
    const specsToShows = showAlll ? Badges : Badges.slice(0, 5);
    const [selectedExperience, setSelectedExperience] = useState(null);

    const [selectedPrice, setSelectedPrice] = useState(null);
    const handlePriceSelect = (label) => {
        setSelectedPrice(label);
    };
    const [showAllPrices, setShowAllPrices] = useState(false);
    const experienceOptions = [
        "0-1 Years",
        "1-2 Years",
        "2-5 Years",
        "5-10 Years",
        "10+ Years"
    ];
    const priceOptions = [
        "Negotiable",
        "Less than 2,000",
        "2,000 - 3,999",
        "4,000 - 5,999",
        "6,000 - 7,999",
        "8,000 - 9,999",
        "10,000 - 11,999",
        "12,000+",
    ];


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const [filters, setFilters] = useState({
        ads360: true,
        english: true,
        yardSale: true,
        comingSoon: true,
    });

    const toggleFilter = (key) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const checkboxStyle = (active) =>
        `flex items-center px-3 py-2 text-sm gap-2 cursor-pointer transition ${active
        }`;
    const adsPostedOptions = [
        "Today", "Within 3 days", "Within 1 week", "Within 2 weeks", "Within 1 month",
        "Within 3 months", "Within 6 months", "Within 9 months", "Within 1 year",
        "Last 24 Hours", "Past Weekend", "Last 7 Days", "Older",
    ];

    const cylinderOptions = [
        "3", "4", "5", "6", "8", "10", "12", "Unknown",

    ];

    const baseBtnStyle = "px-4 py-1 border rounded-full text-sm transition text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]";
    const cities = [
        "All Cities",
        "Dubai",
        "Abu Dhabi",
        "Ras Al Khaimah",
        "Sharjah",
        "Fujairah",
        "Ajman",
        "Umm Al Quwain",
        "Al Ain",
    ];
    const technicalFeatures = [
        '4 Wheel Drive', 'All Wheel Drive', 'All Wheel Steering', 'Anti-Lock Brakes/ABS',
        'Cruise Control', 'Dual Exhaust', 'Front Airbags', 'Front Wheel Drive',
        'N2O System', 'Power Steering', 'Rear Wheel Drive', 'Side Airbags', 'Tiptronic Gears',
    ];

    const extras = [
        'Air Conditioning', 'Alarm/Anti-Theft System', 'AM/FM Radio',
        'Aux Audio In', 'Bluetooth System', 'CD Player', 'Heated Seats',
    ];


    const warrantyOptions = ['Yes', 'No', 'Does not apply'];
    const handleClear = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedPrice(null);
        setShowAllPrices(false);
        setSelectedExperience(null);

    };
    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSelect = (item) => {
        setSearch(item.name);
        setIsFocused(false);
    };

    return (
        <>
            <div className="relative  text-left flex" style={{ padding: "9px 0px" }}>
                {/* Dropdown Toggle */}
                <div className="relative" ref={dropdownRef} style={{ zIndex: "999" }}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="border-t border-b border-l px-4 py-2 text-left shadow-sm bg-white flex flex-col justify-start rounded-l-[16px]"
                        style={{ width: "166px", height: "67px" }}
                    >
                        <div className="text-[12px] font-bold capitalize text-[#2b2d2e] text-left mb-1">
                            <b>City</b>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="block text-sm font-medium text-gray-800">
                                {selectedCity}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div
                            className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-out transform opacity-100 scale-100 translate-y-0 animate-dropdown"
                            style={{ top: "65px" }}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {cities.map((city) => (
                                    <button
                                        key={city}
                                        className={`px-3 py-1 text-sm rounded-full border ${selectedCity === city
                                            ? "bg-black text-white"
                                            : "hover:bg-gray-100 text-gray-700"
                                            }`}
                                        onClick={() => {
                                            setSelectedCity(city);
                                            setIsOpen(false); // Close dropdown on selection
                                        }}
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                                onClick={() => setIsOpen(false)}
                            >
                                Apply Filters
                            </button>
                        </div>
                    )}
                </div>

                <div
                    className="w-64 border-t border-b p-2 shadow-sm bg-white relative"
                    style={{ height: "67px", width: '385px' }}
                >
                    {/* Left and Right Borders */}
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />
                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />

                    <div className="text-sm font-semibold text-gray-700">Keyword</div>

                    {/* Search input and icon container */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Make, Model"
                            className={`w-full pr-8 focus:outline-none text-sm py-1 border-none`}
                            value={search}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                        />
                        <FaSearch className="absolute right-2  transform -translate-y-1/2 text-gray-500 text-sm" style={{ top: "2px" }} />
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsOpens(!isOpens)}
                        className="px-3 py-2 border-t border-b bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
                        style={{ borderLeft: "none", width: "136px", height: "67px" }}
                    >
                        <span className="block text-xs font-semibold pb-2">Salary</span>
                        <div className="flex items-center justify-between w-full">
                            <span>{selectedPrice || "Select"}</span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpens ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                    </button>

                    {isOpens && (
                        <div
                            className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
                            style={{ top: "49px", left: "0px" }}
                        >
                            {/* Pills-style options */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {(showAllPrices ? priceOptions : priceOptions.slice(0, 5)).map(
                                    (label, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handlePriceSelect(label)}
                                            className={`px-3 py-1 text-sm border rounded-full ${selectedPrice === label
                                                ? "bg-black text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={() => setShowAllPrices(!showAllPrices)}
                                    className="px-3 py-1 text-sm border rounded-full text-blue-600 hover:bg-gray-100"
                                >
                                    {showAllPrices ? "View Less" : "View More"}
                                </button>
                            </div>

                            {/* Clear and Apply Buttons */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsOpens(false)}
                                    className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative inline-block">
                    <button
                        onClick={() => setIsOp(!isOp)}
                        className="px-3 py-2 border-t border-b bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
                        style={{ borderLeft: "none", width: "136px", height: "67px" }}
                    >
                        <span
                            className="text-[13px] text-black-500 font-semibold pb-2"
                        >
                            Experience
                        </span>
                        <div className="flex items-center justify-between w-full">
                            <span>{selectedExperience || "Select"}</span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOp ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                    </button>

                    {/* Vertical borders */}
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />
                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />

                    {isOp && (
                        <div
                            className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4"
                            style={{ top: "49px", left: "-35px" }}
                        >
                            {/* Experience pills */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {experienceOptions.map((label, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedExperience(label)}
                                        className={`px-3 py-1 text-sm border rounded-full ${selectedExperience === label
                                                ? "bg-black text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Clear and Apply */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsOp(false)}
                                    className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>




                <div className="relative inline-block" ref={dropdownRef}>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsOpenn(!isOpenn)}
                        className="flex items-center justify-between w-[280px] px-4 py-2 border  border-l-0  bg-white text-left shadow-sm hover:bg-gray-50"
                        style={{ height: "66px", borderTopRightRadius: "16px", borderBottomRightRadius: "16px" }}      >
                        <div className="flex flex-col items-start">
                            <span className="text-[13px] font-medium text-black-500"><b>Filters</b></span>
                            <span className="text-sm text-gray-800 truncate">Regional Specs, Keywords, ...</span>
                        </div>
                        <ChevronDown
                            className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpenn ? "rotate-180" : ""}`}
                        />
                    </button>
                    {/* Dropdown Panel */}
                    {isOpenn && (
                        <div
                            className="absolute z-10 mt-2 w-[418px] right-0 bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col max-h-[600px]"
                        >
                            {/* Scrollable content area */}
                            <div className="overflow-y-auto px-4 pt-4 pb-2" style={{ maxHeight: "calc(600px - 72px)" }}>
                                {/* Inspected Section */}



                                {/* Regional Specs */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Education</h4>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {specsToShow.map((label) => (
                                            <span
                                                key={label}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                style={{ marginRight: "10px" }}       >
                                                {label}
                                            </span>
                                        ))}


                                    </div>

                                    {/* Toggle link */}

                                </div>


                                {/* Keywords */}


                                <hr className="my-3" />

                                {/* Seller Type */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-4 mt-4">Employment Type</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Full Time", "Part Time", "Contract", "Temporary", "Other"].map((label) => (
                                            <span
                                                key={label}
                                                className=" text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                style={{ padding: "10px 16px" }}    >
                                                {label}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <hr className="my-3" />

                                {/* Body Type */}


                                <div className=" w-full max-w-md bg-white rounded-lg ">
                                    {/* Seats */}


                                    {/* Transmission Type */}
                                    <div className="mt-6 mb-6">
                                        <h2 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Remote Job</h2>
                                        <div className="flex gap-3">
                                            {["Yes", "No"].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setTransmission(type)}
                                                    className={` border rounded-full text-sm transition
                                             ${transmission === type
                                                            ? "bg-black text-white border-black"
                                                            : "border-gray-300 text-gray-700 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                        }`}
                                                    style={{ padding: "10px 16px" }} >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="my-3" />

                                    <div className="mt-6 mb-6">
                                        <h2 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Ads Posted</h2>
                                        <div className="flex gap-3">
                                            {["Past 24 Hours", "Past 7 Days", "Past 30 Days"].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setTransmissionn(type)}
                                                    className={` border rounded-full text-sm transition
                                             ${transmissionn === type
                                                            ? "bg-black text-white border-black"
                                                            : "border-gray-300 text-gray-700 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                        }`}
                                                    style={{ padding: "10px 12px" }} >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <hr className="my-3" />

                                    {/* Badges */}





                                    {/* Dealer Name */}
                                    <div className="mb-7 mt-7">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Category</h4>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Accounting / Finance"
                                                className="
                                                       w-full border rounded-md px-3 py-2 pl-8 text-sm h-10
                                                       focus:outline-none focus:ring-0
                                                       focus-visible:outline-none focus-visible:ring-0
                                                     "
                                            />
                                            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <hr className="my-3" />

                                    <div className="mb-7 mt-7">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Role</h4>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="All in Accounting Finance"
                                                className="
                                              w-full border rounded-md px-3 py-2 pl-8 text-sm h-10
                                              focus:outline-none focus:ring-0
                                              focus-visible:outline-none focus-visible:ring-0
                                            "
                                            />
                                            <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>





                                    {/* Doors */}



                                    <hr className="my-3" />

                                    <div className="max-w-md  ">




                                        <div className="max-w-md ">
                                            <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Other Filters</h3>
                                            <div className="flex flex-col gap-2">
                                                <label className={checkboxStyle(filters.ads360)} onClick={() => toggleFilter("ads360")}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.ads360}
                                                        readOnly
                                                        className="accent-red-600"
                                                        style={{
                                                            transform: "scale(1.5)",
                                                            width: "15px",
                                                            height: "20px",
                                                            border: "2px solid red",
                                                            backgroundColor: "#fefefe",
                                                            borderRadius: "4px",
                                                        }}
                                                    />
                                                    <span style={{ marginLeft: "5px" }}>Show ads in English only</span>
                                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/view360.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />
                                                </label>

                                                <label className={checkboxStyle(filters.english)} onClick={() => toggleFilter("english")}>
                                                    <input
                                                        type="checkbox"
                                                        checked={filters.english}
                                                        readOnly
                                                        className="accent-red-600"
                                                        style={{
                                                            transform: "scale(1.5)",
                                                            width: "15px",
                                                            height: "20px",
                                                            border: "2px solid red",
                                                            backgroundColor: "#fefefe",
                                                            borderRadius: "4px",
                                                        }}
                                                    />
                                                    <span style={{ marginLeft: "5px" }}>Show ads by verified users</span>
                                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/language.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />                                                </label>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Sticky Footer */}
                            <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-between items-center">
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                                    Clear
                                </button>
                                <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900">
                                    Apply Filters
                                </button>
                            </div>





                        </div>
                    )}

                </div>
            </div>

        </>
    )
}
export default FiltersFreelancers;