import FiltersMotors from "../../Filters/cars/FiltersMotors";
import React, { useState } from "react";
import { IoMdShareAlt } from "react-icons/io";
import { ChevronDown, Check } from "lucide-react";
import { FaArrowsUpDown } from "react-icons/fa6";

import { BookmarkIcon } from '@heroicons/react/24/outline';

import {
    FaHeart,
    FaCamera,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Link } from "react-router-dom";
const carBrands = [

    "Mercedes-Benz 5658",
    "Toyota (3520)",
    "Nissan (3239)",
    "BMW (2374)",
    "Land Rover (1937)",
    "Ford (1493)",
    "Porsche (1257)",
    "Lexus (1200)",
    "Audi (1164)",
    "Hyundai (1162)",
    "Jeep (1049)",
    "Kia (1029)",
    "Chevrolet (961)",
    "Mitsubishi (930)",
    "Volkswagen (896)",
    "Dodge (622)",
    "Rolls-Royce (620)",
    "Honda (599)",
    "Infiniti (569)",
    "Bentley (472)",
    "MINI (413)",
    "Ferrari (404)",
    "Mazda (399)",
    "Tesla (376)",
    "Lamborghini (370)",
    "GMC (348)",
    "Cadillac (327)",
    "Suzuki (326)",
    "Renault (296)",
    "Jetour (272)",
    "Peugeot (225)",
    "MG (218)",
    "Maserati (207)",
    "Jaguar (200)",
    "Volvo (166)",
    "BYD (166)"

];
const sortOptions = [
    "Default",
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Highest to Lowest",
    "Price Lowest to Highest",
    "Kilometers Highest to Lowest",
    "Kilometers Lowest to Highest",
    "Year Highest to Lowest",
    "Year Lowest to Highest",
];
const Motors = () => {
    const [showMore, setShowMore] = useState(false);
    const visibleBrands = showMore ? carBrands.slice(0, 36) : carBrands.slice(0, 7);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Oldest to Newest");

    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
    };

    const car = {
        price: "AED 19,000",
        title: "GCC UNDER WARRANTY Until 08/2027 and 3-Service free BRAND NEW O...",
        location: "Al Qusais, Dubai",
        year: 2013,
        mileage: "228,000 km",
        hand: "Left Hand",
        specs: "GCC Specs",
        imageUrls: [
            "https://dbz-images.dubizzle.com/images/2024/09/23/3745682b2cb94a6d8140b6e46427a3ee-.jpeg?impolicy=dpv",
            "https://dbz-images.dubizzle.com/images/2024/09/23/7bf467999051470ea4806258e8e6dadc-.jpeg?impolicy=dpv",
            "https://dbz-images.dubizzle.com/images/2024/09/23/67052d15ff7e44008400cb80efdb4ca9-.jpeg?impolicy=dpv",
            "https://dbz-images.dubizzle.com/images/2024/09/23/499d88850a1c40eba0673ab03a19794e-.jpeg?impolicy=dpv",
            "https://dbz-images.dubizzle.com/images/2024/09/23/0490d486fae0463190ceb0a17301cbbf-.jpeg?impolicy=dpv",
            "https://dbz-images.dubizzle.com/images/2024/09/23/4a708ff2e63744008642f414297477c5-.jpeg?impolicy=dpv",
        ],
    };
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const arrowBtnBase =
        'p-2 rounded border text-gray-700 transition-colors';
    const activeArrowStyle = 'bg-white border-gray-300 hover:bg-gray-100';
    const disabledArrowStyle = 'bg-[#E0E1E3] border-[#A3A6AA] cursor-not-allowed';
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <section className="px-4 py-6">
                <FiltersMotors />
                <div>
                    <div className="p-6">
                        <div className="text-sm text-blue-500 mb-2">UAE  <span style={{ color: "gray" }}>&gt;</span> Motors <span style={{ color: "gray" }}>&gt;</span> &nbsp;<span style={{ color: "gray" }}>Cars</span> </div>
                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4 mb-4">
                            {/* Left Side: Title */}
                            <h2 className=" " style={{ fontSize: "20px" }}>
                                Cars for sale in <span className="text-black font-bold">UAE</span> • 37,574 Ads
                            </h2>

                            {/* Right Side: Sort + Save */}
                            <div className="flex items-center space-x-3">
                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="flex items-center gap-1 px-4 py-2 border rounded-md text-sm font-medium text-gray-800 hover:bg-gray-100"
                                    >
                                        <FaArrowsUpDown className={open ? "text-red-500" : "text-gray-500"} size={16} />
                                        Sort: <span className="font-semibold">{selected}</span>
                                    </button>

                                    {open && (
                                        <div className="absolute z-10 mt-2 w-64 bg-white border rounded-md shadow-md py-2">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option}
                                                    onClick={() => handleSelect(option)}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between ${selected === option ? "font-semibold text-black" : "text-gray-700"
                                                        }`}
                                                >
                                                    {option}
                                                    {selected === option && <Check size={16} />}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                </div>

                                {/* Save Search Button */}
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-800 hover:bg-gray-100">
                                    <BookmarkIcon className="w-5 h-5 text-black" />
                                    Save Search
                                </button>

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
                </div>



                <Link to={"/motors/used-cars/maserati/levante/"}>
                    <div className="flex flex-col md:flex-row gap-4 max-w-5xl items-start " style={{ width: "915px" }} >
                        <div className="relative w-full md:w-[330px] h-[200px] rounded-lg overflow-hidden">
                            <style>{`
                        .swiper-pagination-bullet {
                            background-color: #D3D3D3 !important;
                            opacity: 1;
                        }
                        .swiper-pagination-bullet-active {
                            background-color: white !important;
                        }
                    `}</style>

                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                modules={[Navigation, Pagination]}
                                navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
                                pagination={{ clickable: true, el: ".swiper-pagination" }}
                                className="w-full h-full"
                            >
                                {car.imageUrls.map((url, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={url} alt="Car" className="w-full h-full object-cover rounded-lg" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                                <FaCamera /> {car.imageUrls.length}
                            </div>

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
                                <h2 className="text-xl md:text-2xl font-semibold pb-2">{car.price}</h2>
                                <span
                                    className="text-xs px-2 py-0.5 rounded font-semibold text-white"
                                    style={{ background: "linear-gradient(95.78deg, rgb(255, 189, 61) 2.35%, rgb(241, 162, 7) 95.78%)", marginRight: "10px", fontSize: "10px" }}
                                >
                                    PREMIUM
                                </span>
                            </div>
                            <p className="text-gray-500 text-base flex items-center pb-2">
                                Nissan
                                <span className="w-1 h-1 bg-[#2b2d2e] rounded-full mx-2"></span>
                                Pickup
                                <span className="w-1 h-1 bg-[#2b2d2e] rounded-full mx-2"></span>
                                Double Cab
                            </p>
                            <p className="text-base text-gray-800">{car.title}</p>

                            <div className="flex flex-wrap gap-4 mt-3 text-gray-700 text-sm md:text-base items-center relative">
                                <div className="flex items-center gap-1">
                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/listing-card-icons/calendar.svg" alt="" />
                                    {car.year}
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/listing-card-icons/speedometer.svg" alt="" />
                                    {car.mileage}
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/listing-card-icons/steering-side.svg" alt="" />
                                    {car.hand}
                                </div>
                                <div className="flex items-center gap-1">
                                    <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/listing-card-icons/regional-specs.svg" alt="" />
                                    {car.specs}
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="rounded-lg overflow-hidden absolute" style={{ right: "10px", top: "-6px", padding: "4px", border: "1px solid rgb(224, 225, 227)", width: "74px", height: "74px" }}>
                                        <img
                                            src="https://dbz-images.dubizzle.com/profiles/auto_agency/2024/08/09/955fadee2f2544e68014e0072b2a268b-.jpg?impolicy=agency"
                                            alt="UPGRADE YOUR CAR AUCTIONS L.L.C"
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="flex items-center gap-1 mt-3 text-gray-600 text-sm md:text-base">
                                <img
                                    src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/map.svg"
                                    alt=""
                                    className="mr-1"
                                />
                                {car.location}
                            </div>
                        </div>

                    </div>
                </Link>
                <div className="w-full px-4 py-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
                        {/* First & Previous */}
                        <button
                            className={`${arrowBtnBase} ${currentPage === 1 ? disabledArrowStyle : activeArrowStyle
                                }`}
                            onClick={() => goToPage(1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronsLeft size={16} />
                        </button>
                        <button
                            className={`${arrowBtnBase} ${currentPage === 1 ? disabledArrowStyle : activeArrowStyle
                                }`}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={16} />
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`px-3 py-1 rounded border text-sm ${currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next & Last */}
                        <button
                            className={`${arrowBtnBase} ${currentPage === totalPages ? disabledArrowStyle : activeArrowStyle}`}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight size={16} />
                        </button>
                        <button
                            className={`${arrowBtnBase} ${currentPage === totalPages ? disabledArrowStyle : activeArrowStyle}`}
                            onClick={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronsRight size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Motors;