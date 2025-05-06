
import { ChevronRight, Home } from 'lucide-react';
import React, { useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { ChevronDown, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    FaHeart,
    FaCamera,
} from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { Mail, Phone, MessageCircle } from 'lucide-react'; // Optional: Replace with your preferred icon library
import { FaWhatsapp } from 'react-icons/fa';
import FiltersResidential from "../Filters/Rent/FiltersResidential";
import FiltersAccounting from '../Filters/Jobs/FiltersAccounting';
import { MapPin } from "lucide-react"; // or use any location icon
import FiltersEngineering from '../Filters/Jobs/FiltersEngineering';

const sortOptions = [
    "Popular",
    "Verified",
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Highest to Lowest",
    "Price Lowest to Highest",
];

const carBrands = [

    "Civil Engineering (57)",
    "Others - Engineering (17)",
    "Mechanical Engineering (11)",
    "Electric Engineering (7)",
    "General Accountant (7)",
    "Al Ain (1853)",
    "Umm Al Qawain (104)",
    "Fujeirah (71)",


];
const car = {
    price: "Senior Steel Structure Engineer",
    title: "Confidential",
    location: "AED ",
    location1: "20,000 +",
    location2: " per month + Commission",
    year: 2013,
    mileage: "Corner Unit | Brand New | Premium Living",
    hand: "Creek Vistas Grande, Sobha Hartland, Dubai, UAE",
    specs: "GCC Specs",
    imageUrls: [
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/b352dc54dd5d4cb48a09133534596d2d-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/003aec46920b4fbb9c09711b37f7c61f-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/6ce1903593db429c97cf834a9b07acbb-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/715de7a3eaac4f23848091a031e622da-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/6ce1903593db429c97cf834a9b07acbb-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f1b529c-c41c-4adc-8214-237a9435fbcc/23a9f1b599ec4c8f83be89123bbb5110-.jpg?impolicy=dpv",
    ],
};
const Engineering = () => {
    const [open, setOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const visibleBrands = showMore ? carBrands.slice(0, 8) : carBrands.slice(0, 7);

    const [selected, setSelected] = useState("Popular");
    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
    };
    const [selecte, setSelecte] = useState("All");
    const [verifiedFirst, setVerifiedFirst] = useState(false);
    const [enabled, setEnabled] = useState(false);

    const options = ["All", "Furnished", "Unfurnished"];
    return (
        <>
            <section>
                <div className="sticky top-1 " style={{ zIndex: "9999" }}>
                    <FiltersEngineering/>
                </div>

                <div>
                    <div className="px-5 py-8" style={{ paddingBottom: "0px" }}>
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <Home className="w-4 h-4 text-black" style={{ fontSize: "20px" }} />
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 "> UAE </a>
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 ">Jobs </a>
                            <ChevronRight className="w-4 h-4" />
                            <span> Engineering </span>
                        </div>
                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4 mb-4">

                            <h1 className="mt-2 text-xl font-semibold text-gray-900">
                                <span className="font-bold">Engineering Jobs in UAE, UAE</span>
                                <span className="font-normal text-gray-600"> • 104 Ads</span>
                            </h1>

                            <div className="flex items-center space-x-3">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    {/* Save Search Button */}
                                    <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-800 hover:bg-gray-100">
                                        <BookmarkIcon className="w-5 h-5 text-black" />
                                        Save Search
                                    </button>

                                </div>


                            </div>
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-2 my-4">
                        {visibleBrands.map((brand, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 border rounded-full  hover:bg-blue-50 transition"
                                style={{ color: "#0F5DC4" }}
                            >
                                {brand}
                            </button>
                        ))}


                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="px-4 py-2 border border-gray text-sm text-blue-600 rounded-md hover:bg-blue-50 hover:text-blue-800 focus:outline-none transition"
                            style={{ borderRadius: "50px" }}
                        >
                            {showMore ? "View Less" : "View More"}
                        </button>



                    </div>

                </div>
                <div className="flex flex-col md:flex-row gap-4 max-w-5xl items-start " style={{ width: "915px", marginTop: "25px" }} >
                    <div className="">




                        <div
                            className="absolute top-2 right-2 text-white text-xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            <FaHeart />
                        </div>

                        <div
                            className="absolute top-1 right-9 text-white text-2xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            <IoMdShareAlt />
                        </div>

                        <div
                            className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-base z-10 cursor-pointer flex items-center justify-center rounded-md w-7 h-7 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            ‹
                        </div>
                        <div
                            className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-base z-10 cursor-pointer flex items-center justify-center rounded-md w-7 h-7 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            ›
                        </div>

                        <div className="swiper-pagination absolute bottom-1 w-full text-center z-10" />
                    </div>

                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl md:text-2xl font-semibold pb-2" style={{fontSize:'16px'}}>{car.price}</h2>
                            <span
                                className="text-xs px-2 py-0.5 rounded font-semibold text-white"
                                style={{ background: "linear-gradient(94.47deg, rgb(77, 159, 235) 2.35%, rgb(18, 112, 236) 95.78%)", marginRight: "10px", fontSize: "10px" }}
                            >
                                featured
                            </span>
                        </div>

                        <p className="text-base"style={{color:"rgb(12, 74, 157);"}}>{car.title}</p>
                        <div className="flex items-center gap-1 mt-3 text-gray-600 text-sm md:text-base">

                            {car.location}


                            {car.location1}


                            {car.location2}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-gray-700 text-sm md:text-base items-center relative">

                            <div className="space-y-2">
                                {/* Top Info Boxes */}
                                <div className="flex flex-wrap gap-2">
                                    <div className="bg-gray-100 px-4 py-2 rounded text-xs font-semibold text-gray-700">
                                        <div className="uppercase text-[10px] font-medium text-gray-500 mb-1" style={{ color: 'rgb(107, 109, 112)' }}>
                                            Employment Type
                                        </div>
                                        <div className="text-sm font-semibold text-gray-800">Full Time</div>
                                    </div>

                                    <div className="bg-gray-100 px-4 py-2 rounded text-xs font-semibold text-gray-700">
                                        <div className="uppercase text-[10px] font-medium text-gray-500 mb-1">
                                            Minimum Work Experience
                                        </div>
                                        <div className="text-sm font-semibold text-gray-800">5-10 Years</div>
                                    </div>

                                    <div className="bg-gray-100 px-4 py-2 rounded text-xs font-semibold text-gray-700">
                                        <div className="uppercase text-[10px] font-medium text-gray-500 mb-1">
                                            Minimum Education Level
                                        </div>
                                        <div className="text-sm font-semibold text-gray-800">Bachelors Degree</div>
                                    </div>
                                </div>

                                {/* Bottom Info: Posted + Location */}
                                <div className="flex items-center text-sm space-x-3 mt-1">
                                    <span className=" font-medium" style={{color:"gray"}}>Posted 2 hours ago</span>
                                    <hr className="border-r border-gray-300 h-full m-0 flex-shrink-0" />

                                    <span className="flex items-center text-gray-600">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        Dubai Media City, Dubai
                                    </span>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </section>
        </>
    )
}
export default Engineering;