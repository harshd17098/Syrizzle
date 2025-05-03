import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, MapPin, ChevronRight } from "lucide-react";

const propertyTypes = {
    Residential: [
        "All In Residential",
        "Apartment",
        "Villa",
        "Townhouse",
        "Penthouse",
        "Residential Building",
        "Villa Compound",
        "Residential Floor"
    ],
    Commercial: [
        "All in Commercial",
        "Office",
        "Industrial",
        "Retail",
        "Staff Accomm",
        "Shop",
        "Warehouse",
        "Commercial Floor",
        "Commercial Villa",
        "Bulk Unit",
        "Commercial plot",
        "Factory",
        "industrial Land",
        "Mixed Use Land",
        "Showroom",
        "Commercial Building",
        "other"
    ],
    "Rooms For Rent": [
        "All Rooms For Rent",
        "Apartment",
        "Villa"
    ],
    "Monthly Short Term": [
        "All Monthly Short Term",
        "Apartment",
        "Villa"
    ],
    "Daily Short Term": [
        "All Daily Short Term",
        "Apartment",
        "Villa"
    ],
}

const allAmenities = [
    "Maids Room",
    "Study",
    "Central A/C & Heating",
    "Concierge Service",
    "Balcony",
    "Private Garden",
    "Private Pool",
    "Private Gym",
    "Private Jacuzzi",
    "Shared Pool",
    "Shared Spa",
    "Shared Gym",
    "Security",
    "Maid Service",
    "Covered Parking",
    "Built in Wardobes",
    "Walk-in-Closet",
    "Built in Kitchen Appliances",
    "View of Water",
    "View of Landmark",
    "Pets Allowed",
    "Double Glazed Windows",
    "Day Care Center",
    "Electricity Backup",
    "First Aid Medical Center",
    "Service Elevators",
    "Prayer Room",
    "Laundry Room",
    "Broadband Internet",
    "Satellite / Cable TV",
    "Business Center",
    "Intercom",
    "ATM Facility",
    "Kids Play Area",
    "Reception / Waiting Room",
    "Maintenance Staff",
    "CCTV Security",
    "Cafeteria or Canteen",
    "Shared Kitchen",
    "Facilities for Disabled",
    "Storage Areas",
    "Cleaning Services",
    "Barbeque Area",
    "Lobby in Building",
    "Waste Disposal",
];

const baths = ["2025", "2026", "2027", "2028", "2029", "2030 and above"];


const FiltersLandForSale = () => {
    const options = ["Rent", "Buy"];
    const [selected, setSelected] = useState("Rent");
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Residential");
    const [openS, setOpenS] = useState(false);
    const [selectSeat, setSelectSeat] = useState("");
    const dropdownRef = useRef();
    const [isOpenn, setIsOpenn] = useState(false);
    const [showAllBaths, setShowAllSeats] = useState(false);
    const [selectedbath, setSelectedBath] = useState(null);
    const visibleSeats = showAllBaths ? baths : baths.slice(0, 6);
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const displayedAmenities = showAllAmenities ? allAmenities : allAmenities.slice(0, 6);
    const [isOp, setIsOp] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCompletion, setSelectedCompletion] = useState("");
    const completionOptions = ["Under 25%", "25 to 50%", "51 to 75%", "Above 75%"];
    const option = ["Under 25%", "25 to 50%", "51 to 75%", "Above 75%"];

    const bedOptions = ["Studio", "1", "2", "3", "4", "5", "6", "7","8"];
    const [dropdownState, setDropdownState] = useState({
        isOpen: false,
        isOpenn: false,
        isOpens: false,
    });

    const handleClear = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelectedOption(null);

    };

    const handleSelect = (option) => {
        setSelectSeat(option === selectSeat ? "" : option);
    };
    const handleClearSelection = () => {
        setSelectedCompletion("");
    };
    useEffect(() => {
        // Close the dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="relative inline-flex items-stretch bg-white border border-gray-300 rounded-[16px] shadow px-2" style={{ height: "78px" }}>
                {/* Purpose */}
                <div className="relative flex flex-col justify-center w-[220px] px-4 ">
                    <label htmlFor="location" className="text-[12px] font-bold text-[#2b2d2e] ">
                        Location
                    </label>
                    <div className="relative">
                        <input
                            id="location"
                            type="text"
                            placeholder="Enter location"
                            autoComplete="off"
                            className="w-full text-sm  pr-8 py-1.5 border-none rounded focus:outline-none focus:ring-0 focus:shadow-none"
                            style={{ display: 'flex', boxSizing: 'inherit' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <MapPin className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 cursor-pointer" />
                    </div>
                </div>

                {/* Vertical divider */}
                <div className="w-px bg-gray-300 my-2" />

                {/* Location */}


                {/* Vertical divider */}
                <div className="w-px bg-gray-300 my-2" />

                {/* Property Type */}
                <div className="flex flex-col justify-center w-[200px] px-4 py-2 relative">
                    <span className="text-[12px] font-bold text-[#2b2d2e] mb-1">Property Type</span>
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex justify-between items-center text-sm font-medium cursor-pointer"
                    >
                        All in Residential
                        <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`} />
                    </button>

                    {open && (
                        <div className="absolute mt-2 z-10 bg-white border border-gray-200 shadow-lg flex w-[400px] rounded p-2 top-[60px]">
                            <div className="w-1/2 max-h-60 overflow-y-auto border-r border-gray-100">
                                {Object.keys(propertyTypes).map((category) => (
                                    <button
                                        key={category}
                                        className={`flex justify-between w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedCategory === category ? "bg-gray-100 font-semibold" : ""}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                ))}
                            </div>
                            <div className="w-1/2 max-h-60 overflow-y-auto">
                                {propertyTypes[selectedCategory]?.length > 0 ? (
                                    propertyTypes[selectedCategory].map((sub) => (
                                        <div key={sub} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                            {sub}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-sm text-gray-400">No options</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Vertical divider */}
                <div className="w-px bg-gray-300 my-2" />

                {/* Price Range */}



                {/* Beds */}
                <div className="">
                    <button
                        onClick={() => setOpenS(!openS)}
                        className="px-3 py-2 bg-white text-sm font-medium text-gray-700 flex flex-col items-start border-none w-[136px]" style={{ paddingTop: "18px" }}
                    >
                        <span className="text-[12px] font-bold text-[#2b2d2e] mb-1">Beds</span>
                        <div className="w-full flex items-center justify-between">
                            <span>Any</span>
                            <ChevronDown
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${openS ? "rotate-180" : "rotate-0"}`}
                            />
                        </div>
                    </button>


                    {openS && (
                        <div className="absolute transform -translate-x-1/2 z-10 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg p-4" style={{ right: "0px", left: "498px", top: "70px" }}>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {bedOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`px-2 py-1.5 rounded-full border text-sm transition ${selectSeat === option
                                            ? "bg-black text-white border-black"
                                            : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            } w-auto`}
                                    >
                                        {option}
                                    </button>
                                ))}
                                <button className="col-span-2 text-blue-600 text-sm hover:underline mt-1">View More</button>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    onClick={() => setSelectSeat("")}
                                    className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setOpenS(false)}
                                    className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>


                {/* Vertical divider */}
                <div className="w-px bg-gray-300 my-2" />
                <div className="relative w-[220px]">
                    {/* Dropdown Button */}
                    <button
                        onClick={() => setIsOp(!isOp)}
                        className="w-full px-4 py-2 bg-white flex flex-col items-start rounded-t-md" style={{ paddingTop: "20px" }}
                    >
                        <span className="text-[12px] font-semibold text-[#2b2d2e] mb-1">Project Completion</span>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-sm text-gray-700">{selectedOption || "Select"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isOp ? "rotate-180" : ""}`} />
                        </div>
                    </button>

                    {/* Dropdown Content */}
                    {isOp && (
                        <div className="absolute w-[280px] bg-white border border-gray-200 rounded-b-md shadow-md p-4 z-50">
                            {/* Centered Options */}
                            <div className="grid grid-cols-2 gap-2 mb-4 justify-items-center">
                                {option.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedOption(item)}
                                        className={`px-4 py-2 text-sm rounded-full border transition-all text-center
                            ${selectedOption === item
                                                ? "bg-black text-white border-black"
                                                : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
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

                <div className="w-px bg-gray-300 my-2" />
                <div className="relative w-[220px]">
                    {/* Dropdown Button */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-2 pt-5 bg-white flex flex-col items-start rounded-t-md"
                    >
                        <span className="text-[12px] font-semibold text-[#2b2d2e] mb-1">
                        Pre-handover Payment
                        </span>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-sm text-gray-700">
                                {selectedCompletion || "Select"}
                            </span>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                            />
                        </div>
                    </button>

                    {/* Dropdown Content */}
                    {isDropdownOpen && (
                        <div className="absolute w-[280px] bg-white border border-gray-200 rounded-b-md shadow-md p-4 z-50">
                            {/* Options */}
                            <div className="grid grid-cols-2 gap-2 mb-4 justify-items-center">
                                {completionOptions.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedCompletion(option)}
                                        className={`px-4 py-2 text-sm rounded-full border transition-all text-center
                  ${selectedCompletion === option
                                                ? "bg-black text-white border-black"
                                                : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between">
                                <button
                                    onClick={handleClearSelection}
                                    className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Clear
                                </button>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="px-4 py-2 bg-black text-white text-sm rounded hover:opacity-90"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-px bg-gray-300 my-2" />


                {/* Filters */}
                <div className="relative inline-block " ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpenn(!isOpenn)}
                        className="flex items-center justify-between w-[280px] px-4 mt-2 border-l-0 bg-white text-left shadow-sm hover:bg-gray-50"
                        style={{ height: "66px", borderTopRightRadius: "16px", borderBottomRightRadius: "16px" }}
                    >
                        <div className="flex flex-col items-start">
                            <span className="text-[13px] font-medium text-black-500"><b>Filters</b></span>
                            <span className="text-sm text-gray-800 truncate">Regional Specs, Keywords, ...</span>
                        </div>
                        <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-200 ${isOpenn ? "rotate-180" : ""}`} />
                    </button>

                    {isOpenn && (
                        <div className="absolute z-10 mt-2 w-[418px] right-0 bg-white border border-gray-200 shadow-xl rounded-xl flex flex-col max-h-[600px] overflow-auto">
                            <div className="mb-6 ml-4 mr-4 mt-4">
                                <h2 className="font-semibold mb-3" style={{fontSize:'14px'}}>Handover</h2>
                                <div className="flex flex-wrap gap-2">
                                    {visibleSeats.map((bath) => (
                                        <button
                                            key={bath}
                                            onClick={() => setSelectedBath(bath)}
                                            className={`px-4 py-2 ml-2 rounded-full border text-sm transition ${selectedbath === bath
                                                ? "bg-black text-white border-black"
                                                : "text-gray-700 border-gray-300 hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                                }`}
                                        >
                                            {bath}
                                        </button>
                                    ))}
                                  
                                </div>
                            </div>
                           
                           

                            {/* Keywords */}
                            <div className="mb-6 ml-4 mr-4">
                                <h2 className="text-lg font-semibold mb-2" style={{fontSize:'14px'}}>Developer</h2>
                                <input
                                    type="text"
                                    placeholder="E.g. Emaar Properties PJSC"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <hr className="my-3" />
                            {/* Listed By */}
                            <div className="mb-6 ml-4 mr-4">
                                <h2 className="text-lg font-semibold mb-2"style={{fontSize:'14px'}}>Project Status</h2>
                                <div className="flex gap-3">
                                    {['Under Construction', 'Completed'].map((label, idx) => (
                                        <button
                                            key={idx}
                                            className="px-4 py-1 border border-gray-300 rounded-full  hover:bg-[rgb(242,247,254)] hover:border-[rgb(137,184,246)]"
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            

                            {/* Sticky Footer */}
                            <div className="sticky bottom-0 bg-white border-t px-4 py-3 flex justify-between items-center">
                                <button className="px-4 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" style={{minWidth:"152px",height:"50px"}}>
                                    Clear
                                </button>
                                <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-900"style={{minWidth:"152px",height:"50px"}}>
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

}

export default FiltersLandForSale