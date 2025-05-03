import FiltersCommercial from "../Filters/Rent/FiltersCommercial";
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
import FiltersMonthly from "../Filters/Rent/FiltersMonthly";
import FiltersLandForSale from "../Filters/Sale/FiltersLandForSale";
const sortOptions = [
    "Popular",
    "Nearest Handover",
    "Lowest Starting Price",
    "Highest Starting Price",
    "Lowest Downpayment",


];
const carBrands = [

    "Dubai (12,046)",
    "Abu Dhabi (2,829)",
    "Sharjah (1,735)",
    "Ajman (1,522)",
    "Umm Al Qawain (881)",
    "Al Ain (244)",
    "Ras Al Khaimah (184)",
    "Fujeirah (37)",


];
const avatars = [
    "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/bec348e69b2b4a7d9b70b98627f8e7ad-.webp?impolicy=lpv",
    "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/e6323ad8c2a642708043294e2a4b7f33-.webp?impolicy=lpv",
    "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/05cc008a3f604bb3b051fcfe98950ae7-.webp?impolicy=lpv",
];
const car = {
    price: "Faradis Tower",
    title: "10% Down Payment",
    location: "Faradis Tower, Al Mamzar, Sharjah",
    year: "Faradis Tower, Al Mamzar, Sharjah",
    mileage: "Faradis Tower, Al Mamzar, Sharjah.",
    hand: "Dubai Marina Mall, Dubai Marina, Dubai",
    specs: "GCC Specs",
    imageUrls: [
        "https://dbz-images.dubizzle.com/images/2025/02/27/c819d58a-0166-4907-9542-cc849e5987fc/daf9ab87240946c9851d51683c510cf3-.png?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/05cc008a3f604bb3b051fcfe98950ae7-.webp?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/bec348e69b2b4a7d9b70b98627f8e7ad-.webp?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/20920fd60e094e3bae778d828d7f0255-.webp?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/5f72b910fce846b68753a55c06731625-.webp?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2024/07/02/59093477-ce8c-48b2-9c82-6b7227223f20/5f72b910fce846b68753a55c06731625-.webp?impolicy=dpv",
    ],
};
const LandForSale = () => {
    const [open, setOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const visibleBrands = showMore ? carBrands.slice(0, 8) : carBrands.slice(0, 7);

    const [selected, setSelected] = useState("Oldest to Newest");
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
                    <FiltersLandForSale />
                </div>

                <div>
                    <div className="px-5 py-8" style={{ paddingBottom: "5px" }}>
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <Home className="w-4 h-4 text-black" style={{ fontSize: "20px" }} />
                            <ChevronRight className="w-4 h-4" />
                            <span >New Projects in UAE
                            </span>
                        </div>
                        <div className="flex justify-between items-end flex-wrap md:flex-nowrap gap-4 ">
                            <h3 className="bold" style={{ fontWeight: '700', fontSize: "20px" }}>Latest New Projects in UAE</h3>
                            <div className="flex-1" /> {/* Fills space to push next div to the end */}

                            <div className="flex items-center space-x-3 justify-end">
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
                                                </button>
                                            ))}
                                        </div>
                                    )}
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
                    <div className="relative w-full md:w-[330px] h-[250px] rounded-lg overflow-hidden">
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
                            className="absolute top-2 left-2 text-white text-xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                            <div className="bg-white rounded shadow p-1 w-fit">
                                <p
                                    className="text-sm font-medium text-black"
                                    title="Under Construction"
                           style={{fontSize:"12px"}}     >
                                    Under Construction
                                </p>
                            </div>
                        </div>

                        <div
                            className="absolute top-1 right-9 text-white text-2xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            style={{ transition: "background-color 0.3s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
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

                    <div className="flex-1 w-full space-y-4">
                        {/* Header Row: Price + Premium */}
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl md:text-2xl font-semibold">{car.price}</h2>

                        </div>

                        {/* Title */}
                        <p className="text-base text-gray-800">{car.title}</p>

                        {/* Mileage */}
                        <div className="flex items-center gap-1 font-semibold">
                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/map.svg"
                                alt=""
                            />
                            {car.mileage}
                        </div>

                        <hr className="my-2" />

                        {/* Avatar Group + Info */}
                        <div className="flex items-center gap-8">
                            <div className="flex -space-x-2">
                                {avatars.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Image ${index + 1}`}
                                        className="w-10 h-10 rounded-md border border-white shadow object-cover"
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col">
                                <h3
                                    className="text-sm font-medium text-black truncate"
                                    title="Residentials"
                           style={{fontWeight:"700"}}     >
                                    Residentials
                                </h3>
                                <h3
                                    className="text-sm text-gray-600 truncate"
                                    title="Delivery by Q1 2027"
                                >
                                    Delivery by Q1 2027
                                </h3>
                            </div>
                        </div>

                        {/* Developer + Logo */}
                        <div className="flex flex-wrap gap-4 items-center text-gray-700 text-sm md:text-base relative">
                            <div className="flex items-center gap-1">
                                <h2>
                                    Developer: <span className="font-semibold">Tiger Properties</span>
                                </h2>
                            </div>

                            <div className="absolute right-2 " style={{ top: "-55px" }}>
                                <div className="w-[74px] h-[74px] p-1 rounded-lg overflow-hidden">
                                    <img
                                        src="https://dbz-images.dubizzle.com/profiles/developer_agency/2024/09/23/13e836d1d7af4e47825b8441822ab006-.jpg?impolicy=agency"
                                        alt="UPGRADE YOUR CAR AUCTIONS L.L.C"
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}
export default LandForSale;