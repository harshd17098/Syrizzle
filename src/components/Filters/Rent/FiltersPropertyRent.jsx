import { useState } from "react";

const categories = [
    "Residential",
    "Commercial",
    "Rooms For Rent",
    "Monthly Short Term",
    "Daily Short Term",
];

const FiltersPropertyRent = () => {
    const [activeTab, setActiveTab] = useState("Residential");
    const [city, setCity] = useState("Umm al Quwain");

    return (
        <div className="w-full  mx-auto px-4">
            {/* Tabs */}
            <div className="flex gap-2 p-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-all min-w-max h-[45px] ${activeTab === category
                                ? "bg-[#2B2D2E] text-white"
                                : "bg-white text-black hover:bg-gray-100"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Filter Section (always rendered but conditionally visible) */}
            
        </div>
    );
};

export default FiltersPropertyRent;
