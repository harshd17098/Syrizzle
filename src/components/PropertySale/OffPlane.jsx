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
import FiltersOffPlane from "../Filters/Sale/FiltersOffPlane";
import FiltersSaleType from "../Filters/Sale/FiltersSaleType";
import { FaCheckCircle } from "react-icons/fa";

const sortOptions = [
    "Popular",
    "Verified",
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Highest to Lowest",
    "Price Lowest to Highest",

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
const car = {
    price: "AED 1,185,000",
    title: "Apartment",
    location: "544 sqft",
    year: 2013,
    mileage: "Spacious 1BHK l Prime Location l Last Unit ",
    hand: "The Haven, Majan, Dubai",
    specs: "GCC Specs",
    imageUrls: [
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/2f26e80bb2cf46e9aca89dc0affef3a0-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/483d7744e76a449aa9128c4d9dc020b1-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/eb55fd8fc85f4aedac3b6edc4235ce5e-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/0bb1135860bb448c8e71d8b5d82eacab-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/5cdb338056224d639b2e7b856e7d0310-.jpg?impolicy=dpv",
        "https://dbz-images.dubizzle.com/images/2025/04/29/219cf5b4-8d02-4f05-a0fd-9a1feb7e1406/927e162bb39c42d7ae8b929f00f748bc-.jpg?impolicy=dpv",
    ],
};
const OffPlane = () => {
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
    const [isVerified, setIsVerified] = useState(true);

    const options = ["All", "Ready", "Off-Plan"];
    return (
        <>
            <section>
                <div className="sticky top-1 " style={{ zIndex: "9999" }}>
                    <FiltersOffPlane />
                </div>

                <div>
                    <div className="px-5 py-8" style={{ paddingBottom: "0px" }}>
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <Home className="w-4 h-4 text-black" style={{ fontSize: "20px" }} />
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 ">Properties for Sale in UAE</a>
                            <ChevronRight className="w-4 h-4" />
                            <span>Off Plan Properties in UAE</span>
                        </div>
                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4 mb-4">

                            <h1 className="mt-2 text-xl font-semibold text-gray-900">
                                <span className="font-bold">Off Plan Properties for sale in UAE</span>
                                <span className="font-normal text-gray-600"> • 116,035 Ads</span>
                            </h1>

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
                                                    {selected === option}
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
                    <div className="flex justify-between items-center w-full max-w-4xl px-4 py-4">
                        {/* Furnishing Options */}
                        <div className="flex gap-2">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setSelecte(option)}
                                    style={{ width: '110px' }}
                                    className={`px-4 py-2 rounded border text-sm font-medium ${selecte === option
                                        ? "bg-blue-50 text-blue-700 border-blue-400"
                                        : "bg-white text-black border-gray-300"
                                        }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Toggle */}
                        <label className="flex items-center space-x-3 cursor-pointer select-none">
                            <span className="text-sm font-semibold text-black">Show Verified First</span>
                            <div
                                onClick={() => setIsVerified(!isVerified)}
                                className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${isVerified ? "bg-black" : "bg-gray-300"
                                    }`}
                            >
                                <div
                                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${isVerified ? "translate-x-5" : "translate-x-0"
                                        }`}
                                />
                            </div>
                        </label>

                    </div>
                </div>
                <div>
                    <FiltersSaleType />
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

                        <div className="absolute top-2 left-2 z-10 flex gap-2">
  <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded shadow flex items-center gap-1">
    <FaCheckCircle className="text-green-600 text-sm" />
    Verified
  </span>
  <span className="bg-white text-black text-xs font-medium px-2 py-1 rounded shadow">
    Off-Plan
  </span>
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

                        <p className="text-base text-gray-800">{car.title}</p>
                        <div className="flex items-center gap-1 mt-3 text-gray-600 text-sm md:text-base">
                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/bed_space.svg"
                                alt="bed"
                                className="mr-1"
                            />
                            <span>Studio</span>

                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/bath.svg"
                                alt="bath"
                                className="ml-2 mr-1"
                            />
                            <span>1 baths</span>

                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/size.svg"
                                alt="size"
                                className="ml-2 mr-1"
                            />
                            <span>600 sqft</span>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-gray-700 text-sm md:text-base items-center relative">

                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-1" style={{ fontWeight: "600" }}>
                                    {car.mileage}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <h3 className="text-lg font-semibold" style={{ backgroundColor: '#F7F7F8' }}>
                                        <span className="text-sm text-gray-700" title="Payment Plan">
                                            Payment Plan
                                            <span className="text-sm text-black ml-1" title="40/60">
                                                40/60
                                            </span>
                                        </span>
                                    </h3>
                                    <div
                                        className="group relative"
                                        data-testid="payment-plan-chip-tooltip"
                                    >
                                        <img
                                            className="h-5 w-5 cursor-pointer"
                                            src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/info-black.svg"
                                            alt="info"
                                            loading="lazy"
                                            data-testid="icon"
                                        />
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full hidden group-hover:block p-2 bg-black text-white text-xs rounded-md">
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <img
                                        src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/map.svg"
                                        alt=""
                                    />
                                    {car.hand}
                                </div>
                            </div>


                            <div className="flex items-center justify-center">
                                <div className="rounded-lg overflow-hidden absolute" style={{ right: "10px", top: "56px", padding: "4px", width: "74px", height: "74px" }}>
                                    <img
                                        src="https://dbz-images.dubizzle.com/profiles/property_agency/1635946646_Untitled-500LOGO.png?impolicy=agency"
                                        alt="UPGRADE YOUR CAR AUCTIONS L.L.C"
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {/* Email Button */}
                                <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-black font-medium py-2 px-4 rounded-md">
                                    <Mail className="text-blue-600 w-4 h-4" />
                                    Email
                                </button>

                                {/* Call Button */}
                                <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-black font-medium py-2 px-4 rounded-md">
                                    <Phone className="text-red-600 w-4 h-4" />
                                    Call
                                </button>

                                {/* WhatsApp Button */}
                                <button className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-black font-medium py-2 px-4 rounded-md">
                                    <FaWhatsapp className="text-green-600 w-4 h-4" />
                                    WhatsApp
                                </button>
                            </div>
                        </div>


                    </div>

                </div>
            </section>
        </>
    )
}
export default OffPlane;