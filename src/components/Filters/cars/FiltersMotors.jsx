import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Car, Truck, Activity, HardDrive, BarChart2, Cpu, Database, Film, Gift, Heart, IceCream, Key, } from "lucide-react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaHeadphonesAlt } from 'react-icons/fa';
import { PiTelevisionSimpleBold } from 'react-icons/pi';
import { FaTags, FaCarSide } from 'react-icons/fa';
import { Options } from "../../../context/Options";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

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

const FiltersMotors = ({ setCity, city }) => {

    // const [isOpen, setIsOpen] = useState(false);
    // const [isOpens, setIsOpens] = useState(false);
    // const [isOp, setIsOp] = useState(false);
    // const [isOpp, setIsOpp] = useState(false);
    // const [isOpenn, setIsOpenn] = useState(false);
    // const [search, setSearch] = useState("");
    // const [isFocused, setIsFocused] = useState(false);
    // const [isInspectedOnly, setIsInspectedOnly] = useState(false);

    // const [showAll, setShowAll] = useState(false);
    // const [showAlls, setShowAlls] = useState(false);
    // const [showAlll, setShowAlll] = useState(false);
    // const [showA, setShowA] = useState(false);
    // const [show, setShow] = useState(false);

    // const [showAllAdsPosted, setShowAllAdsPosted] = useState(false);
    // const [showAllCylinders, setShowAllCylinders] = useState(false);

    // const visibleColors = showA ? allColors : allColors.slice(0, 5);
    // const visibleColor = show ? allColors : allColors.slice(0, 5);

    // const [showAllHorsepower, setShowAllHorsepower] = useState(false);
    // const [showAllEngineCapacity, setShowAllEngineCapacity] = useState(false);

    // const remainingCount = allColors.length - 5;
    // const [selectedCity, setSelectedCity] = useState("All Cities");
    // const [minPrice, setMinPrice] = useState("");
    // const [maxPrice, setMaxPrice] = useState("");
    // const dropdownRef = useRef();
    // const [showAllSeats, setShowAllSeats] = useState(false);
    // const [selectedSeat, setSelectedSeat] = useState(null);
    // const [transmission, setTransmission] = useState("");
    // const [transmissionn, setTransmissionn] = useState("");

    // const [showAllTech, setShowAllTech] = useState(false);
    // const [showAllExtras, setShowAllExtras] = useState(false);

    // const seats = ["2", "4", "5", "6", "7", "8", "8+"];
    // const [selectedDoor, setSelectedDoor] = useState(null);
    // const doorOptions = [2, 3, 4, "5+"];

    // const visibleSeats = showAllSeats ? seats : seats.slice(0, 5);
    // const specsToShow = showAll ? allSpecs : allSpecs.slice(0, 5);
    // const itemsToRender = showAlls ? BODY_TYPES : BODY_TYPES.slice(0, 6);
    // const specsToShows = showAlll ? Badges : Badges.slice(0, 5);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             dropdownRef.current &&
    //             !dropdownRef.current.contains(event.target)
    //         ) {
    //             setIsOpen(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);
    // const [filters, setFilters] = useState({
    //     ads360: true,
    //     english: true,
    //     yardSale: true,
    //     comingSoon: true,
    // });

    // const toggleFilter = (key) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [key]: !prev[key],
    //     }));
    // };

    // const checkboxStyle = (active) =>
    //     `flex items-center px-3 py-2 text-sm gap-2 cursor-pointer transition ${active
    //     }`;
    // const adsPostedOptions = [
    //     "Today", "Within 3 days", "Within 1 week", "Within 2 weeks", "Within 1 month",
    //     "Within 3 months", "Within 6 months", "Within 9 months", "Within 1 year",
    //     "Last 24 Hours", "Past Weekend", "Last 7 Days", "Older",
    // ];

    // const cylinderOptions = [
    //     "3", "4", "5", "6", "8", "10", "12", "Unknown",

    // ];

    // const baseBtnStyle = "px-4 py-1 border rounded-full text-sm transition text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]";

    // const technicalFeatures = [
    //     '4 Wheel Drive', 'All Wheel Drive', 'All Wheel Steering', 'Anti-Lock Brakes/ABS',
    //     'Cruise Control', 'Dual Exhaust', 'Front Airbags', 'Front Wheel Drive',
    //     'N2O System', 'Power Steering', 'Rear Wheel Drive', 'Side Airbags', 'Tiptronic Gears',
    // ];

    // const extras = [
    //     'Air Conditioning', 'Alarm/Anti-Theft System', 'AM/FM Radio',
    //     'Aux Audio In', 'Bluetooth System', 'CD Player', 'Heated Seats',
    // ];


    // const warrantyOptions = ['Yes', 'No', 'Does not apply'];
    // const handleClear = () => {
    //     setMinPrice("");
    //     setMaxPrice("");
    // };
    // const handleInputChange = (e) => {
    //     setSearch(e.target.value);
    // };

    // const handleSelect = (item) => {
    //     setSearch(item.name);
    //     setIsFocused(false);
    // };

    const { cities, models } = Options();
    const [cityOpen, setCityopen] = useState(false)
    const [modalOpen, setModalopen] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setCityopen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10, pointerEvents: "none" },
        visible: { opacity: 1, y: 0, pointerEvents: "auto" },
    };

    const handleCity = (list) => {
        setCity(list)
        setCityopen(false)
    }

    const Labelbutton = ({ label, open, set, value }) => {
        return (
            <>
                <button className="flex flex-col gap-2 p-1 place-items-start w-full" onClick={() => set(prev => !prev)}>
                    <span className="text-xs font-semibold">{label}</span>
                    <div className="flex flex-row justify-between gap-3 place-items-center w-full">
                        <span className="text-sm">{value}</span>
                        <h1 className={` ${open ? 'rotate-180' : ''} text-sm transition-all duration-300 ease-in-out`}><IoIosArrowDown /></h1>
                    </div>
                </button>
            </>
        )
    }


    return (
        <>
            <div className="sticky top-0 rounded-xl border border-neutral-500 z-50 p-2 shadow-lg">
                {/* <button className="flex flex-col gap-2 p-2 place-items-start w-full" onClick={()=>setCityopen(!cityOpen)}>
                    <span className="text-xs font-semibold">City</span>
                    <div className="flex flex-row justify-between gap-3 place-items-center w-full">
                        <span className="text-sm">{city}</span>
                        <h1 className={` ${cityOpen ? 'rotate-180' : ''} text-sm transition-all duration-300 ease-in-out`}><IoIosArrowDown /></h1>
                    </div>
                </button> */}
                <div className="relative inline-block text-left" ref={dropdownRef}>
                    <Labelbutton label='City' open={cityOpen} set={setCityopen} value={city} />
                    <AnimatePresence>
                        {cityOpen && (
                            <motion.div
                                className="absolute left-0 mt-2 w-60 bg-white border rounded-md shadow-lg "
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex p-4 flex-row flex-wrap gap-3">
                                    {cities.map((list, i) => (
                                        <button onClick={() => handleCity(list)} key={i} className={`text-sm px-2 py-1  font-medium ${list == city ? 'text-white bg-black' : ''} rounded-full`}>{list}</button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="relative inline-block text-left border-l border-gray-300 ps-2">
                    <button className="flex flex-col gap-2 p-1 place-items-start w-full" onClick={() => setModalopen(prev => !prev)}>
                        <span className="text-xs font-semibold">Make and Model</span>
                        <div className="flex flex-row justify-between gap-3 place-items-center w-full">
                            <input type="text" name="" id="" className="w-full focus:outline-none text-sm placeholder:text-xs" placeholder="Search Make, Model" />
                            <h1 className={` ${modalOpen ? 'rotate-180' : ''} text-sm transition-all duration-300 ease-in-out`}><IoIosArrowDown /></h1>
                        </div>
                    </button>
                    <AnimatePresence>
                        {modalOpen && (
                            <motion.div
                                className="absolute left-0 mt-2 w-60 bg-white border rounded-md shadow-lg"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex p-4 flex-row flex-wrap gap-3">
                                    {models.map((list, i) => (
                                        <button onClick={() => handleCity(list)} key={i} className={`text-sm px-2 py-1  font-medium ${list == city ? 'text-white bg-black' : ''} rounded-full`}>{list.name}</button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

        </>
        // <div className=" top-0 bg-white z-50 text-left flex" style={{ padding: "9px 0px" }}>
        //     {/* Dropdown Toggle */}
        //     <div className="relative h-full" >
        //         <button
        //             onClick={() => setIsOpen(!isOpen)}
        //             className="border-t border-b border-l px-4 py-2 text-left shadow-sm bg-white flex flex-col justify-start rounded-l-[16px]"
        //             style={{ width: "166px", height: "67px" }}
        //         >
        //             <div className="text-[12px] font-bold capitalize text-[#2b2d2e] text-left mb-1">
        //                 <b>City</b>
        //             </div>
        //             <div className="flex items-center justify-between">
        //                 <span className="block text-sm font-medium text-gray-800">
        //                     {selectedCity}
        //                 </span>
        //                 <ChevronDown
        //                     className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
        //                         }`}
        //                 />
        //             </div>
        //         </button>

        //         {/* Dropdown */}
        //         {isOpen && (
        //             <div
        //                 className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-out transform opacity-100 scale-100 translate-y-0 animate-dropdown"
        //                 style={{ top: "65px" }}
        //             >
        //                 <div className="grid grid-cols-2 gap-2">
        //                     {cities.map((city) => (
        //                         <button
        //                             key={city}
        //                             className={`px-3 py-1 text-sm rounded-full border ${selectedCity === city
        //                                 ? "bg-black text-white"
        //                                 : "hover:bg-gray-100 text-gray-700"
        //                                 }`}
        //                             onClick={() => {
        //                                 setCity(city)
        //                                 setSelectedCity(city);
        //                                 setIsOpen(false); // Close dropdown on selection
        //                             }}
        //                         >
        //                             {city}
        //                         </button>
        //                     ))}
        //                 </div>
        //                 <button
        //                     className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        //                     onClick={() => setIsOpen(false)}
        //                 >
        //                     Apply Filters
        //                 </button>
        //             </div>
        //         )}
        //     </div>

        //     <div className="w-64 border-t border-b p-2 shadow-sm bg-white relative" style={{ height: "67px", border: "1px 0px soiled gray", width: '285px' }}>
        //         {/* Short left border */}
        //         <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

        //         <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />

        //         <div className="text-sm font-semibold text-gray-700 ">Make and Model</div>

        //         {/* Search input */}
        //         <input
        //             type="text"
        //             placeholder="Search Make, Model"
        //             className={`w-full focus:outline-none text-sm py-1 transition ${isFocused ? "border-black" : "border-gray-300"
        //                 }`}
        //             value={search}
        //             onChange={handleInputChange}
        //             onFocus={() => setIsFocused(true)}
        //             onBlur={() => setTimeout(() => setIsFocused(false), 150)} // Timeout to allow click selection
        //         />

        //         {/* Suggestions */}
        //         {isFocused && (
        //             <div className="absolute z-10 bg-white border mt-2 rounded shadow w-full">
        //                 <div className="px-4 py-2 border-b text-sm font-semibold text-gray-600">
        //                     Popular Searches
        //                 </div>
        //                 <ul className="divide-y">
        //                     {popularSearches.map((item, index) => (
        //                         <li
        //                             key={index}
        //                             className="flex justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
        //                             onClick={() => handleSelect(item)}
        //                         >
        //                             <span>{item.name}</span>
        //                             <span className="text-xs text-gray-400">{item.type}</span>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         )}

        //         {/* Done button */}
        //         {isFocused && (
        //             <div className="mt-3 text-right">
        //                 <button
        //                     onClick={() => setIsFocused(false)}
        //                     className="text-sm font-medium text-blue-600 hover:underline"
        //                 >
        //                     Done
        //                 </button>
        //             </div>
        //         )}
        //     </div>

        //     <button
        //         onClick={() => setIsOpens(!isOpens)}
        //         className="px-3 py-2 border-t border-b  bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
        //         style={{ borderLeft: "none", width: "136px" }}
        //     >
        //         <span className="block text-xs text-black-500" style={{ fontWeight: "600", paddingBottom: '8px' }}><b>Price Range</b></span>
        //         <div className="flex items-center justify-between w-full">
        //             <span>Select</span>
        //             <ChevronDown
        //                 className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpens ? "rotate-180" : ""
        //                     }`}
        //             />
        //         </div>
        //     </button>

        //     {isOpens && (
        //         <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "345px" }}>
        //             <div className="flex space-x-2 mb-4">
        //                 <input
        //                     type="number"
        //                     value={minPrice}
        //                     onChange={(e) => setMinPrice(e.target.value)}
        //                     placeholder="From"
        //                     className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                 />
        //                 <input
        //                     type="number"
        //                     value={maxPrice}
        //                     onChange={(e) => setMaxPrice(e.target.value)}
        //                     placeholder="Upto"
        //                     className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                 />
        //             </div>
        //             <div className="flex justify-between">
        //                 <button
        //                     onClick={handleClear}
        //                     className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
        //                 >
        //                     Clear
        //                 </button>
        //                 <button
        //                     onClick={() => setIsOpen(false)}
        //                     className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
        //                 >
        //                     Apply Filters
        //                 </button>
        //             </div>
        //         </div>
        //     )}

        //     <div className=" relative inline-block">
        //         <button
        //             onClick={() => setIsOp(!isOp)}
        //             className="px-3 py-2 border-t border-b   bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
        //             style={{ borderLeft: "none", width: "136px", height: "67px" }}
        //         >
        //             <span className=" text-[13px] text-black-500" style={{ paddingBottom: "8px", fontWeight: "600" }}><b>Year</b></span>
        //             <div className="flex items-center justify-between w-full">
        //                 <span>Select</span>
        //                 <ChevronDown
        //                     className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOp ? "rotate-180" : ""
        //                         }`}
        //                 />
        //             </div>
        //         </button>
        //         <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

        //         {/* Right Divider */}
        //         <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />
        //         {isOp && (
        //             <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "-35px" }}>
        //                 <div className="flex space-x-2 mb-4">
        //                     <input
        //                         type="number"
        //                         value={minPrice}
        //                         onChange={(e) => setMinPrice(e.target.value)}
        //                         placeholder="From"
        //                         className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                     />
        //                     <input
        //                         type="number"
        //                         value={maxPrice}
        //                         onChange={(e) => setMaxPrice(e.target.value)}
        //                         placeholder="Upto"
        //                         className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                     />
        //                 </div>
        //                 <div className="flex justify-between">
        //                     <button
        //                         onClick={handleClear}
        //                         className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
        //                     >
        //                         Clear
        //                     </button>
        //                     <button
        //                         onClick={() => setIsOp(false)}
        //                         className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
        //                     >
        //                         Apply Filters
        //                     </button>
        //                 </div>
        //             </div>
        //         )}

        //     </div>


        //     <div className=" relative inline-block">
        //         <button
        //             onClick={() => setIsOpp(!isOpp)}
        //             className="px-3 py-2 border-t border-b   bg-white  font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex flex-col items-start"
        //             style={{ borderLeft: "none", width: "136px", height: "67px" }}
        //         >
        //             <span className="block text-[12px] text-black-500" style={{ fontWeight: "600", paddingBottom: "8px" }}><b>Kilometers</b></span>
        //             <div className="flex items-center justify-between w-full">
        //                 <span>Select</span>
        //                 <ChevronDown
        //                     className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpp ? "rotate-180" : ""
        //                         }`}
        //                 />
        //             </div>
        //         </button>
        //         <div className="absolute left-0 top-2 bottom-2 w-px bg-gray-300" />

        //         {/* Right Divider */}
        //         <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-300" />
        //         {isOpp && (
        //             <div className="absolute z-10 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4" style={{ top: "49px", left: "-35px" }}>
        //                 <div className="flex space-x-2 mb-4">
        //                     <input
        //                         type="number"
        //                         value={minPrice}
        //                         onChange={(e) => setMinPrice(e.target.value)}
        //                         placeholder="From"
        //                         className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                     />
        //                     <input
        //                         type="number"
        //                         value={maxPrice}
        //                         onChange={(e) => setMaxPrice(e.target.value)}
        //                         placeholder="Upto"
        //                         className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
        //                     />
        //                 </div>
        //                 <div className="flex justify-between">
        //                     <button
        //                         onClick={handleClear}
        //                         className="px-4 py-2 border text-sm rounded text-gray-600 hover:bg-gray-100"
        //                     >
        //                         Clear
        //                     </button>
        //                     <button
        //                         onClick={() => setIsOpp(false)}
        //                         className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
        //                     >
        //                         Apply Filters
        //                     </button>
        //                 </div>
        //             </div>
        //         )}

        //     </div>

        //     <div className="relative inline-block" ref={dropdownRef}>
        //         {/* Toggle Button */}
        //         <button
        //             onClick={() => setIsOpenn(!isOpenn)}
        //             className="flex items-center justify-between w-[280px] px-4 py-2 border  border-l-0  bg-white text-left shadow-sm hover:bg-gray-50"
        //             style={{ height: "66px", borderTopRightRadius: "16px", borderBottomRightRadius: "16px" }}      >
        //             <div className="flex flex-col items-start">
        //                 <span className="text-[13px] font-medium text-black-500"><b>Filters</b></span>
        //                 <span className="text-sm text-gray-800 truncate">Regional Specs, Keywords, ...</span>
        //             </div>
        //             <ChevronDown
        //                 className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpenn ? "rotate-180" : ""}`}
        //             />
        //         </button>
        //         {/* Dropdown Panel */}
        //         {isOpenn && (
        //             <div
        //                 className="absolute z-10 mt-2 w-[418px] right-0 bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col max-h-[600px]"
        //             >
        //                 {/* Scrollable content area */}
        //                 <div className="overflow-y-auto px-4 pt-4 pb-2" style={{ maxHeight: "calc(600px - 72px)" }}>
        //                     {/* Inspected Section */}
        //                     {/* <div className="mb-4">
        //                         <div className="flex items-center gap-2 text-[14px] font-bold text-[#2B2D2E] mb-3 leading-[1.2]">
        //                             <img
        //                                 src="https://static.dubizzle.com/frontend-web/listings/assets/images/dubizzleLogo.svg"
        //                                 alt="Dubizzle"
        //                                 className="h-4 w-auto"
        //                             />
        //                             <span style={{ paddingTop: "6px" }}>inspected cars</span>
        //                             <span className="rounded-[10px] px-2 py-[2px] bg-[#69C966] text-white uppercase font-bold text-[12px]" style={{ marginTop: "6px" }}>
        //                                 New
        //                             </span>
        //                         </div>

        //                         <label className="flex items-center mt-2 text-sm text-gray-700">
        //                             <input
        //                                 type="checkbox"
        //                                 className="
        //                                             mr-2
        //                                             w-[21px] h-[21px]
        //                                             border border-gray-300 rounded-sm bg-white
        //                                             hover:border-gray-400
        //                                             checked:border-red-500 checked:bg-red-100 checked:accent-red-500
        //                                             transition
        //                                           "
        //                                 checked={isInspectedOnly}
        //                                 onChange={() => setIsInspectedOnly(!isInspectedOnly)}
        //                             />
        //                             Show inspected cars only
        //                         </label>
        //                     </div>

        //                     <hr className="my-3" /> */}

        //                     {/* Regional Specs */}
        //                     <div className="mb-4">
        //                         <h4 className="text-sm font-semibold text-gray-800 mb-2">Regional Specs</h4>
        //                         <div className="flex flex-wrap gap-2 mb-2">
        //                             {specsToShow.map((label) => (
        //                                 <span
        //                                     key={label}
        //                                     className="px-4 py-2 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                     style={{ marginRight: "10px" }}       >
        //                                     {label}
        //                                 </span>
        //                             ))}

        //                             <button
        //                                 onClick={() => setShowAll(!showAll)}
        //                                 className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                             >
        //                                 {showAll ? "View Less" : "View More"}
        //                             </button>
        //                         </div>

        //                         {/* Toggle link */}

        //                     </div>

        //                     <hr className="my-3" />

        //                     {/* Keywords */}
        //                     <div className="mb-7 mt-7">
        //                         <h4 className="text-sm font-semibold text-gray-800 mb-2">Keywords</h4>
        //                         <div className="relative">
        //                             <input
        //                                 type="text"
        //                                 placeholder="Enter Keyword..."
        //                                 className="
        //                                   w-full border rounded-md px-3 py-2 pl-8 text-sm h-10
        //                                   focus:outline-none focus:ring-0
        //                                   focus-visible:outline-none focus-visible:ring-0
        //                                 "
        //                             />
        //                             <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        //                         </div>
        //                     </div>

        //                     <hr className="my-3" />

        //                     {/* Seller Type */}
        //                     <div className="mb-4">
        //                         <h4 className="text-sm font-semibold text-gray-800 mb-4 mt-4">Seller Type</h4>
        //                         <div className="flex flex-wrap gap-2">
        //                             {["Owner", "Dealer", "Dealership/Certified Pre-Owned"].map((label) => (
        //                                 <span
        //                                     key={label}
        //                                     className=" text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                     style={{ padding: "10px 16px" }}    >
        //                                     {label}
        //                                 </span>
        //                             ))}
        //                         </div>
        //                     </div>

        //                     <hr className="my-3" />

        //                     {/* Body Type */}
        //                     <div className=" py-2">
        //                         <h4 className="text-sm font-semibold text-gray-800 mb-4">Body Type</h4>

        //                         <div className="grid grid-cols-3 gap-4">
        //                             {itemsToRender.map(({ label, icon: Icon }) => (
        //                                 <button
        //                                     key={label}
        //                                     className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 hover:bg-gray-50 transition"
        //                                 >
        //                                     <Icon className="w-6 h-6 text-gray-600 mb-2" />
        //                                     <span className="text-xs text-gray-700 text-center">{label}</span>
        //                                 </button>
        //                             ))}
        //                         </div>

        //                         <div className="mt-4 text-center">
        //                             <button
        //                                 onClick={() => setShowAlls(!showAlls)}
        //                                 className="inline-flex items-center text-sm font-medium text-gray-600 " style={{ fontWeight: "700" }}
        //                             >
        //                                 {showAlls ? "View Less" : `View More`}
        //                                 <ChevronDown
        //                                     className={`w-4 h-4 ml-1 transition-transform duration-200 ${showAlls ? "rotate-180" : ""
        //                                         }`}
        //                                 />
        //                             </button>
        //                         </div>
        //                     </div>
        //                     <hr className="my-3" />

        //                     <div className=" w-full max-w-md bg-white rounded-lg ">
        //                         {/* Seats */}
        //                         <div className="mb-6">
        //                             <h2 className="font-semibold mb-3">Seats</h2>
        //                             <div className="flex flex-wrap gap-2">
        //                                 {visibleSeats.map((seat) => (
        //                                     <button
        //                                         key={seat}
        //                                         onClick={() => setSelectedSeat(seat)}
        //                                         className={`px-4 py-2 ml-2 rounded-full border text-sm transition
        //                                   ${selectedSeat === seat
        //                                                 ? "bg-black text-white border-black"
        //                                                 : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                             }`}
        //                                     >
        //                                         {seat}
        //                                     </button>
        //                                 ))}
        //                                 <button
        //                                     onClick={() => setShowAllSeats(!showAllSeats)}
        //                                     className="px-4 py-1 text-sm border border-gray-300 rounded-full text-blue-600  hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                 >
        //                                     {showAllSeats ? "View Less" : "View More"}
        //                                 </button>
        //                             </div>
        //                         </div>
        //                         <hr className="my-3" />

        //                         {/* Transmission Type */}
        //                         <div className="mt-6 mb-6">
        //                             <h2 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Transmission Type</h2>
        //                             <div className="flex gap-3">
        //                                 {["Manual", "Automatic"].map((type) => (
        //                                     <button
        //                                         key={type}
        //                                         onClick={() => setTransmission(type)}
        //                                         className={` border rounded-full text-sm transition
        //                                  ${transmission === type
        //                                                 ? "bg-black text-white border-black"
        //                                                 : "border-gray-300 text-gray-700 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                             }`}
        //                                         style={{ padding: "10px 16px" }} >
        //                                         {type}
        //                                     </button>
        //                                 ))}
        //                             </div>
        //                         </div>

        //                         <hr className="my-3" />

        //                         <div className="mt-6 mb-6">
        //                             <h2 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Fuel Type</h2>
        //                             <div className="flex gap-3">
        //                                 {["Petrol", "Diesel", "Hybrid", "Electric"].map((type) => (
        //                                     <button
        //                                         key={type}
        //                                         onClick={() => setTransmissionn(type)}
        //                                         className={` border rounded-full text-sm transition
        //                                  ${transmissionn === type
        //                                                 ? "bg-black text-white border-black"
        //                                                 : "border-gray-300 text-gray-700 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                             }`}
        //                                         style={{ padding: "10px 16px" }} >
        //                                         {type}
        //                                     </button>
        //                                 ))}
        //                             </div>
        //                         </div>

        //                         <hr className="my-3" />

        //                         {/* Badges */}
        //                         {/* <div className="mb-4">
        //                             <h4 className="text-sm font-semibold text-gray-800 mb-6 mt-6">Badges</h4>
        //                             <div className="flex flex-wrap gap-2 mb-2">
        //                                 {specsToShows.map((label) => (
        //                                     <span
        //                                         key={label}
        //                                         className="px-4 py-2 text-sm border border-gray-300 rounded-full cursor-pointer hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                         style={{ marginRight: "10px" }}       >
        //                                         {label}
        //                                     </span>
        //                                 ))}

        //                                 <button
        //                                     onClick={() => setShowAlll(!showAlll)}
        //                                     className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                 >
        //                                     {showAlll ? "View Less" : "View More"}
        //                                 </button>
        //                             </div>


        //                         </div>

        //                         <hr className="my-3" /> */}



        //                         {/* Dealer Name */}
        //                         <div className="mb-7 mt-7">
        //                             <h4 className="text-sm font-semibold text-gray-800 mb-2">Dealer Name</h4>
        //                             <div className="relative">
        //                                 <input
        //                                     type="text"
        //                                     placeholder="Enter Keyword..."
        //                                     className="
        //                                            w-full border rounded-md px-3 py-2 pl-8 text-sm h-10
        //                                            focus:outline-none focus:ring-0
        //                                            focus-visible:outline-none focus-visible:ring-0
        //                                          "
        //                                 />
        //                                 <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        //                             </div>
        //                         </div>

        //                         <hr className="my-3" />

        //                         {/* Export Status */}
        //                         {/* <div className="mt-6 mb-6">
        //                             <h2 className="font-semibold mb-3">Export Status</h2>
        //                             <div className="flex gap-3">
        //                                 {["UAE (can be exported)", "Export Only"].map((type) => (
        //                                     <button
        //                                         key={type}
        //                                         onClick={() => setTransmission(type)}
        //                                         className={` border rounded-full text-sm transition
        //                                  ${transmission === type
        //                                                 ? "bg-black text-white border-black"
        //                                                 : "border-gray-300 text-gray-700 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                             }`}
        //                                         style={{ padding: "10px 16px" }} >
        //                                         {type}
        //                                     </button>
        //                                 ))}
        //                             </div>
        //                         </div> */}

        //                         {/* <hr className="my-3" /> */}



        //                         <div className="">
        //                             <h3 className="text-sm font-semibold text-gray-800 mb-3">Exterior Color</h3>
        //                             <div className="flex flex-wrap gap-3">
        //                                 {visibleColors.map((item, index) => (
        //                                     <button
        //                                         key={index}
        //                                         className={`flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-700 transition 
        //                                                           hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]`}
        //                                     >
        //                                         <span
        //                                             className={`w-3 h-3 rounded-full ${item.color} border border-gray-400`}
        //                                         ></span>
        //                                         {item.name}
        //                                     </button>
        //                                 ))}


        //                                 <button
        //                                     onClick={() => setShowA(!showA)}
        //                                     className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                 >
        //                                     {showAlll ? "View Less" : "View More"}
        //                                 </button>

        //                             </div>
        //                         </div>
        //                         <hr className="my-3" />


        //                         <div className="">
        //                             <h3 className="text-sm font-semibold text-gray-800 mb-3">Interior Color</h3>
        //                             <div className="flex flex-wrap gap-3">
        //                                 {visibleColor.map((item, index) => (
        //                                     <button
        //                                         key={index}
        //                                         className={`flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 text-sm text-gray-700 transition 
        //                       hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]`}
        //                                     >
        //                                         <span
        //                                             className={`w-3 h-3 rounded-full ${item.color} border border-gray-400`}
        //                                         ></span>
        //                                         {item.name}
        //                                     </button>
        //                                 ))}


        //                                 <button
        //                                     onClick={() => setShow(!show)}
        //                                     className=" text-blue-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                 >
        //                                     {show ? "View Less" : "View More"}
        //                                 </button>

        //                             </div>
        //                         </div>
        //                         <hr className="my-3" />


        //                         <div className="w-full max-w-md  space-y-6">

        //                             {/* Horsepower Section */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Horsepower</h3>
        //                                 <div className="flex flex-wrap gap-3">
        //                                     {(showAllHorsepower ? horsepowerOptions : horsepowerOptions.slice(0, 5)).map((item, index) => (
        //                                         <button
        //                                             key={index}
        //                                             className="px-4 py-2.5 border rounded-full text-sm hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                         >
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllHorsepower(!showAllHorsepower)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-2.5 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllHorsepower ? 'View Less' : 'View More'}
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             <hr className="my-3" />

        //                             {/* Engine Capacity Section */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Engine Capacity (Cc)</h3>
        //                                 <div className="flex flex-wrap gap-3">
        //                                     {(showAllEngineCapacity ? engineCapacityOptions : engineCapacityOptions.slice(0, 5)).map((item, index) => (
        //                                         <button
        //                                             key={index}
        //                                             className="px-4 py-2.5 border rounded-full text-sm hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                         >
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllEngineCapacity(!showAllEngineCapacity)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-2.5 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllEngineCapacity ? 'View Less' : 'View More'}
        //                                     </button>
        //                                 </div>
        //                             </div>

        //                         </div>

        //                         {/* Doors */}

        //                         <hr className="my-3" />
        //                         <div className="mb-6">
        //                             <h2 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Doors</h2>
        //                             <div className="flex flex-wrap gap-2">
        //                                 {doorOptions.map((door) => (
        //                                     <button
        //                                         key={door}
        //                                         onClick={() => setSelectedDoor(door)}
        //                                         className={`px-4 py-2 ml-2 rounded-full border text-sm transition
        //                                                ${selectedDoor === door
        //                                                 ? "bg-black text-white border-black"
        //                                                 : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                             }`}
        //                                     >
        //                                         {door}
        //                                     </button>
        //                                 ))}
        //                             </div>
        //                         </div>

        //                         <hr className="my-3" />
        //                         <div className="max-w-md space-y-8">

        //                             {/* Technical Features */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Technical Features</h3>
        //                                 <div className="flex flex-wrap gap-2">
        //                                     {(showAllTech ? technicalFeatures : technicalFeatures.slice(0, 5)).map((item, index) => (
        //                                         <button
        //                                             key={index}
        //                                             className="px-4 py-2.5 border rounded-full text-sm transition text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                         >
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllTech(!showAllTech)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-2.5 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllTech ? 'View Less' : 'View More'}
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             <hr className="my-3" />

        //                             {/* Extras */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Extras</h3>
        //                                 <div className="flex flex-wrap gap-2">
        //                                     {(showAllExtras ? extras : extras.slice(0, 5)).map((item, index) => (
        //                                         <button
        //                                             key={index}
        //                                             className="px-4 py-2 border rounded-full text-sm transition text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                         >
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllExtras(!showAllExtras)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-2 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllExtras ? 'View Less' : 'View More'}
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             <hr className="my-3" />

        //                             <div className="max-w-md ">
        //                                 <label className="block font-semibold mb-2" style={{ fontSize: "14px" }}>Location</label>
        //                                 <div className="relative">
        //                                     <input
        //                                         type="text"
        //                                         placeholder="Enter location"
        //                                         className="w-full border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm text-gray-700 focus:outline-none focus-visible:outline-none"
        //                                     />
        //                                     <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        //                                 </div>
        //                             </div>
        //                             <hr className="my-3" />

        //                             {/* Warranty */}
        //                             <div className="">
        //                                 <h3 className="font-semibold mb-3 " style={{ fontSize: "14px" }}>Warranty</h3>
        //                                 <div className="flex flex-wrap gap-2">
        //                                     {warrantyOptions.map((item, index) => (
        //                                         <button
        //                                             key={index}
        //                                             className="px-4 py-2 border rounded-full text-sm transition text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
        //                                         >
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <hr className="my-3" />
        //                         <div className="max-w-md  ">

        //                             {/* Ads Posted Section */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Ads Posted</h3>
        //                                 <div className="flex flex-wrap gap-2">
        //                                     {(showAllAdsPosted ? adsPostedOptions : adsPostedOptions.slice(0, 5)).map((item, index) => (
        //                                         <button key={index} className={baseBtnStyle}>
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllAdsPosted(!showAllAdsPosted)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-1 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllAdsPosted ? "View Less" : "View More"}
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             <hr className="my-3" />

        //                             {/* Number of Cylinders Section */}
        //                             <div>
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Number Of Cylinders</h3>
        //                                 <div className="flex flex-wrap gap-2">
        //                                     {(showAllCylinders ? cylinderOptions : cylinderOptions.slice(0, 5)).map((item, index) => (
        //                                         <button key={index} className={baseBtnStyle}>
        //                                             {item}
        //                                         </button>
        //                                     ))}
        //                                     <button
        //                                         onClick={() => setShowAllCylinders(!showAllCylinders)}
        //                                         className="text-blue-600 font-medium text-sm px-4 py-1 border rounded-full hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)] transition"
        //                                     >
        //                                         {showAllCylinders ? "View Less" : "View More"}
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                             {/* <hr className="my-3" />
        //                             <div className="max-w-md ">
        //                                 <h3 className="font-semibold mb-3" style={{ fontSize: "14px" }}>Other Filters</h3>
        //                                 <div className="flex flex-col gap-2">
        //                                     <label className={checkboxStyle(filters.ads360)} onClick={() => toggleFilter("ads360")}>
        //                                         <input
        //                                             type="checkbox"
        //                                             checked={filters.ads360}
        //                                             readOnly
        //                                             className="accent-red-600"
        //                                             style={{
        //                                                 transform: "scale(1.5)",
        //                                                 width: "15px",
        //                                                 height: "20px",
        //                                                 border: "2px solid red",
        //                                                 backgroundColor: "#fefefe",
        //                                                 borderRadius: "4px",
        //                                             }}
        //                                         />
        //                                         <span style={{ marginLeft: "5px" }}>Ads with 360 view</span>
        //                                         <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/view360.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />
        //                                     </label>

        //                                     <label className={checkboxStyle(filters.english)} onClick={() => toggleFilter("english")}>
        //                                         <input
        //                                             type="checkbox"
        //                                             checked={filters.english}
        //                                             readOnly
        //                                             className="accent-red-600"
        //                                             style={{
        //                                                 transform: "scale(1.5)",
        //                                                 width: "15px",
        //                                                 height: "20px",
        //                                                 border: "2px solid red",
        //                                                 backgroundColor: "#fefefe",
        //                                                 borderRadius: "4px",
        //                                             }}
        //                                         />
        //                                         <span style={{ marginLeft: "5px" }}>Ads in English</span>
        //                                         <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/language.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />                                                </label>

        //                                     <label className={checkboxStyle(filters.yardSale)} onClick={() => toggleFilter("yardSale")}>
        //                                         <input
        //                                             type="checkbox"
        //                                             checked={filters.yardSale}
        //                                             readOnly
        //                                             className="accent-red-600"
        //                                             style={{
        //                                                 transform: "scale(1.5)",
        //                                                 width: "15px",
        //                                                 height: "20px",
        //                                                 border: "2px solid red",
        //                                                 backgroundColor: "#fefefe",
        //                                                 borderRadius: "4px",
        //                                             }}
        //                                         />
        //                                         <span style={{ marginLeft: "5px" }}>Yard Sale</span>
        //                                         <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/yard-sale.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />
        //                                     </label>

        //                                     <label className={checkboxStyle(filters.comingSoon)} onClick={() => toggleFilter("comingSoon")}>
        //                                         <input
        //                                             type="checkbox"
        //                                             checked={filters.comingSoon}
        //                                             readOnly
        //                                             className="accent-red-600"
        //                                             style={{
        //                                                 transform: "scale(1.5)",
        //                                                 width: "15px",
        //                                                 height: "20px",
        //                                                 border: "2px solid red",
        //                                                 backgroundColor: "#fefefe",
        //                                                 borderRadius: "4px",
        //                                             }}
        //                                         />
        //                                         <span style={{ marginLeft: "5px" }}>Coming Soon Cars</span>
        //                                         <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/filters/comingsoon.png" style={{ marginLeft: "5px", width: "25px", height: "25px" }} alt="" />
        //                                     </label>
        //                                 </div>
        //                             </div> */}

        //                         </div>
        //                     </div>
        //                 </div>

        //                 {/* Sticky Footer */}
        //                 <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-between items-center">
        //                     <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
        //                         Clear
        //                     </button>
        //                     <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900">
        //                         Apply Filters
        //                     </button>
        //                 </div>





        //             </div>
        //         )}

        //     </div>
        // </div>
    )
}
export default FiltersMotors;


