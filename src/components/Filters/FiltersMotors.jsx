import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Car, Truck, Activity, HardDrive, BarChart2, Cpu, Database, Film, Gift, Heart, IceCream, Key, } from "lucide-react";


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

const popularSearches = [
    { name: "BMW", type: "Make" },
    { name: "Nissan Patrol", type: "Model" },
];
const allSpecs = [
    "GCC",
    "American",
    "Canadian",
    "European",
    "Japanese",
    "Korean",
    "Chinese",
    "Other",

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
const FiltersMotors = () => {
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
    const visibleColors = showA ? allColors : allColors.slice(0, 5);
    const remainingCount = allColors.length - 5;
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const dropdownRef = useRef();
    const [showAllSeats, setShowAllSeats] = useState(false);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [transmission, setTransmission] = useState("");
    const [transmissionn, setTransmissionn] = useState("");

    const seats = ["2", "4", "5", "6", "7", "8", "8+"];

    const visibleSeats = showAllSeats ? seats : seats.slice(0, 5);
    const specsToShow = showAll ? allSpecs : allSpecs.slice(0, 5);
    const itemsToRender = showAlls ? BODY_TYPES : BODY_TYPES.slice(0, 6);
    const specsToShows = showAlll ? Badges : Badges.slice(0, 5);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
    const handleClear = () => {
        setMinPrice("");
        setMaxPrice("");
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
            <div className="relative inline-block text-left flex" style={{ padding: "9px 0px" }}>
                {/* Dropdown Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="border-t border-b border-l px-4 py-2 text-left shadow-sm bg-white flex flex-col justify-start rounded-l-[16px]"
                    style={{ width: "166px" }}  >
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


                {/* Dropdown Menu */}
                {isOpen && (
                    <div
                        className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 
               transition-all duration-300 ease-out transform opacity-100 scale-100 translate-y-0
               animate-dropdown"
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
                                    onClick={() => setSelectedCity(city)}
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

                <div className="w-64 border-t border-b p-2 shadow-sm bg-white relative" style={{ height: "67px", border: "1px 0px soiled gray", width: '285px' }}>
                    {/* Short left border */}
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />

                    <div className="text-sm font-semibold text-gray-700 ">Make and Model</div>

                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search Make, Model"
                        className={`w-full focus:outline-none text-sm py-1 transition ${isFocused ? "border-black" : "border-gray-300"
                            }`}
                        value={search}
                        onChange={handleInputChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Timeout to allow click selection
                    />

                    {/* Suggestions */}
                    {isFocused && (
                        <div className="absolute z-10 bg-white border mt-2 rounded shadow w-full">
                            <div className="px-4 py-2 border-b text-sm font-semibold text-gray-600">
                                Popular Searches
                            </div>
                            <ul className="divide-y">
                                {popularSearches.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <span>{item.name}</span>
                                        <span className="text-xs text-gray-400">{item.type}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Done button */}
                    {isFocused && (
                        <div className="mt-3 text-right">
                            <button
                                onClick={() => setIsFocused(false)}
                                className="text-sm font-medium text-blue-600 hover:underline"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsOpens(!isOpens)}
                    className="px-3 py-2 border-t border-b  bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
                    style={{ borderLeft: "none", width: "136px" }}
                >
                    <span className="block text-xs text-black-500" style={{ fontWeight: "600", paddingBottom: '8px' }}><b>Price Range</b></span>
                    <div className="flex items-center justify-between w-full">
                        <span>Select</span>
                        <ChevronDown
                            className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpens ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </button>

                {isOpens && (
                    <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "345px" }}>
                        <div className="flex space-x-2 mb-4">
                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                placeholder="From"
                                className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                placeholder="Upto"
                                className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={handleClear}
                                className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                <div className=" relative inline-block">
                    <button
                        onClick={() => setIsOp(!isOp)}
                        className="px-3 py-2 border-t border-b   bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
                        style={{ borderLeft: "none", width: "136px", height: "67px" }}
                    >
                        <span className=" text-[13px] text-black-500" style={{ paddingBottom: "8px", fontWeight: "600" }}><b>Year</b></span>
                        <div className="flex items-center justify-between w-full">
                            <span>Select</span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOp ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                    </button>
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

                    {/* Right Divider */}
                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />
                    {isOp && (
                        <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "-35px" }}>
                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="From"
                                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Upto"
                                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>
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


                <div className=" relative inline-block">
                    <button
                        onClick={() => setIsOpp(!isOpp)}
                        className="px-3 py-2 border-t border-b   bg-white  font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
                        style={{ borderLeft: "none", width: "136px", height: "67px" }}
                    >
                        <span className="block text-[12px] text-black-500" style={{ fontWeight: "600", paddingBottom: "8px" }}><b>Kilometers</b></span>
                        <div className="flex items-center justify-between w-full">
                            <span>Select</span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpp ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                    </button>
                    <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

                    {/* Right Divider */}
                    <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />
                    {isOpp && (
                        <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "-35px" }}>
                            <div className="flex space-x-2 mb-4">
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="From"
                                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="Upto"
                                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsOpp(false)}
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
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 text-[14px] font-bold text-[#2B2D2E] mb-3 leading-[1.2]">
                                        <img
                                            src="https://static.dubizzle.com/frontend-web/listings/assets/images/dubizzleLogo.svg"
                                            alt="Dubizzle"
                                            className="h-4 w-auto"
                                        />
                                        <span style={{ paddingTop: "6px" }}>inspected cars</span>
                                        <span className="rounded-[10px] px-2 py-[2px] bg-[#69C966] text-white uppercase font-bold text-[12px]" style={{ marginTop: "6px" }}>
                                            New
                                        </span>
                                    </div>

                                    <label className="flex items-center mt-2 text-sm text-gray-700">
                                        <input
                                            type="checkbox"
                                            className="
                                                        mr-2
                                                        w-[21px] h-[21px]
                                                        border border-gray-300 rounded-sm bg-white
                                                        hover:border-gray-400
                                                        checked:border-red-500 checked:bg-red-100 checked:accent-red-500
                                                        transition
                                                      "
                                            checked={isInspectedOnly}
                                            onChange={() => setIsInspectedOnly(!isInspectedOnly)}
                                        />
                                        Show inspected cars only
                                    </label>
                                </div>

                                <hr className="my-3" />

                                {/* Regional Specs */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Regional Specs</h4>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {specsToShow.map((label) => (
                                            <span
                                                key={label}
                                                className="px-4 py-2 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                style={{ marginRight: "10px" }}       >
                                                {label}
                                            </span>
                                        ))}

                                        <button
                                            onClick={() => setShowAll(!showAll)}
                                            className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                        >
                                            {showAll ? "View Less" : "View More"}
                                        </button>
                                    </div>

                                    {/* Toggle link */}

                                </div>

                                <hr className="my-3" />

                                {/* Keywords */}
                                <div className="mb-7 mt-7">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Keywords</h4>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter Keyword..."
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

                                {/* Seller Type */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-4 mt-4">Seller Type</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Owner", "Dealer", "Dealership/Certified Pre-Owned"].map((label) => (
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
                                <div className=" py-2">
                                    <h4 className="text-sm font-semibold text-gray-800 mb-4">Body Type</h4>

                                    <div className="grid grid-cols-3 gap-4">
                                        {itemsToRender.map(({ label, icon: Icon }) => (
                                            <button
                                                key={label}
                                                className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
                                            >
                                                <Icon className="w-6 h-6 text-gray-600 mb-2" />
                                                <span className="text-xs text-gray-700 text-center">{label}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-4 text-center">
                                        <button
                                            onClick={() => setShowAlls(!showAlls)}
                                            className="inline-flex items-center text-sm font-medium text-gray-600 " style={{ fontWeight: "700" }}
                                        >
                                            {showAlls ? "View Less" : `View More`}
                                            <ChevronDown
                                                className={`w-4 h-4 ml-1 transition-transform duration-200 ${showAlls ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                                <hr className="my-3" />

                                <div className=" w-full max-w-md bg-white rounded-lg ">
                                    {/* Seats */}
                                    <div className="mb-6">
                                        <h2 className="font-semibold mb-3">Seats</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {visibleSeats.map((seat) => (
                                                <button
                                                    key={seat}
                                                    onClick={() => setSelectedSeat(seat)}
                                                    className={`px-4 py-2 ml-2 rounded-full border text-sm transition
                                              ${selectedSeat === seat
                                                            ? "bg-black text-white border-black"
                                                            : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                        }`}
                                                >
                                                    {seat}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setShowAllSeats(!showAllSeats)}
                                                className="px-4 py-1 text-sm border border-gray-300 rounded-full text-blue-600  hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            >
                                                {showAllSeats ? "View Less" : "View More"}
                                            </button>
                                        </div>
                                    </div>
                                    <hr className="my-3" />

                                    {/* Transmission Type */}
                                    <div className="mt-6 mb-6">
                                        <h2 className="font-semibold mb-3" style={{fontSize:"14px"}}>Transmission Type</h2>
                                        <div className="flex gap-3">
                                            {["Manual", "Automatic"].map((type) => (
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
                                        <h2 className="font-semibold mb-3" style={{fontSize:"14px"}}>Fuel Type</h2>
                                        <div className="flex gap-3">
                                            {["Petrol", "Diesel", "Hybrid", "Electric"].map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setTransmissionn(type)}
                                                    className={` border rounded-full text-sm transition
                                             ${transmissionn === type
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

                                    {/* Badges */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-6 mt-6">Badges</h4>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {specsToShows.map((label) => (
                                                <span
                                                    key={label}
                                                    className="px-4 py-2 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                    style={{ marginRight: "10px" }}       >
                                                    {label}
                                                </span>
                                            ))}

                                            <button
                                                onClick={() => setShowAlll(!showAlll)}
                                                className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            >
                                                {showAlll ? "View Less" : "View More"}
                                            </button>
                                        </div>

                                        {/* Toggle link */}

                                    </div>

                                    <hr className="my-3" />



                                    {/* Dealer Name */}
                                    <div className="mb-7 mt-7">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Dealer Name</h4>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Enter Keyword..."
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

                                    {/* Export Status */}
                                    <div className="mt-6 mb-6">
                                        <h2 className="font-semibold mb-3">Export Status</h2>
                                        <div className="flex gap-3">
                                            {["UAE (can be exported)", "Export Only"].map((type) => (
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



                                    <div className="">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Exterior Color</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {visibleColors.map((item, index) => (
                                                <button
                                                    key={index}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-700 transition 
              hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]`}
                                                >
                                                    <span
                                                        className={`w-3 h-3 rounded-full ${item.color} border border-gray-400`}
                                                    ></span>
                                                    {item.name}
                                                </button>
                                            ))}

                                            
                                                <button
                                                onClick={() => setShowA(!showA)}
                                                className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            >
                                                {showAlll ? "View Less" : "View More"}
                                            </button>
                                            
                                        </div>
                                    </div>
                                    <hr className="my-3" />









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
export default FiltersMotors;