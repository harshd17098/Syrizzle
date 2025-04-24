import FiltersMotors from "../Filters/FiltersMotors";
import React, { useState } from "react";
import { IoMdShareAlt } from "react-icons/io";

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

const Motors = () => {
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
        <section className="px-4 py-6">
            <FiltersMotors />
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
                            style={{ background: "linear-gradient(95.78deg, rgb(255, 189, 61) 2.35%, rgb(241, 162, 7) 95.78%)", marginRight: "10px" ,fontSize:"10px"}}
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
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`w-10 h-10 rounded border text-sm font-medium transition-colors ${currentPage === pageNum
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    {/* Next & Last */}
                    <button
                        className={`${arrowBtnBase} ${currentPage === totalPages ? disabledArrowStyle : activeArrowStyle
                            }`}
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </button>
                    <button
                        className={`${arrowBtnBase} ${currentPage === totalPages ? disabledArrowStyle : activeArrowStyle
                            }`}
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronsRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Motors;