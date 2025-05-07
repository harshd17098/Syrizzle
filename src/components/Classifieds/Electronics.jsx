import { CheckCircle, ChevronRight, Home, Info } from 'lucide-react';
import React, { useState } from "react";
import { FaArrowsUpDown } from "react-icons/fa6";
import { BookmarkIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
    FaHeart,
    FaCamera,
    FaCheckCircle,
} from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import FiltersElectronics from '../Filters/Classifieds/Electronics';

const sortOptions = [
    "Popular",
    "Verified",
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Highest to Lowest",
    "Price Lowest to Highest",

];
const carBrands = [
    "Televisions (4455)",
    "Wearable Technology (2107)",
    "Home Audio & Turntables (2099)",
    "Electronic Accessories (1762)",
    "Gadgets (1030)",
    "Umm Al Qawain (774)",
    "Al Ain (67)",
    "Fujeirah (16)",
];

const car = {
    price: "LG 65 Inch TV - UT81 AI UHD 4K HDR Smart TV - New 2024  ",
    title: "LED LCD . LG",
    location: "AED 1,399",
    location1: "2 baths",
    location2: "768 sqft",
    mileage: "Close to Metro | Investor deal | Last unit & Smart...",
    title1: "handover Q1 2026",
    hand: "Havelock Residences, Discovery Gardens Du...",
    specs: "GCC Specs",
    imageUrls: [
        "https://dbz-images.dubizzle.com/images/2025/05/02/e261dea4ff544dbeba0e935a91cc63f1-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/4ffa9e0bd38043eba3996b8f057f9c4c-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/16b38dd9d31a450d8bc6dcce1cd71f72-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/3f952acb9f3d420c8ed6bcd51ac2f8f1-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/2f656584c024407bbbcb7a31f94bda79-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/d5eb600cb2ed45818b3a7267c2020885-.jpeg?impolicy=dpc"
        
    ],
};
const Electronics = () => {
    const [open, setOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const visibleBrands = showMore ? carBrands.slice(0, 8) : carBrands.slice(0, 4);

    const [selected, setSelected] = useState("Oldest to Newest");
    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
    };
    const [selecte, setSelecte] = useState("All");
    const [enabled, setEnabled] = useState(false);

    const options = ["All", "Ready", "Off-Plan"];
    return (
        <>
            <section>
                <div className="sticky top-1 " style={{ zIndex: "9999" }}>
                    {/* <FiltersResidentialSale />
                     */}
                    <FiltersElectronics />
                </div>

                <div>
                    <div className="px-5 py-8" style={{ paddingBottom: "0px" }}>
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <Home className="w-4 h-4 text-black" style={{ fontSize: "20px" }} />
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 ">UAE</a>
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 ">Electronics</a>
                            <ChevronRight className="w-4 h-4" />
                            <span>Computers & Networking</span>
                        </div>
                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4 mb-4">

                            <h1 className="mt-2 text-xl font-semibold text-gray-900">
                                <span className="font-bold">New and Used Electronics  for sale in UAE</span>
                                <span className="font-normal text-gray-600"> • 14,110 Ads</span>
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
                    
                </div>
                <div
                    className="flex flex-col md:flex-row gap-4 max-w-5xl items-start"
                    style={{ width: "915px", marginTop: "25px" }}
                >
                    <div className="relative w-full md:w-[330px] h-[230px] rounded-lg overflow-hidden">
                        {/* Custom Swiper bullet styling */}
                        <style>{`
          .swiper-pagination-bullet {
              background-color: #D3D3D3 !important;
              opacity: 1;
          }
          .swiper-pagination-bullet-active {
              background-color: white !important;
          }
        `}</style>

                        {/* Badges - Verified & Off-Plan */}
                        <div className="absolute top-2 left-2 z-10 flex gap-1">
                            <span className="bg-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shadow" style={{ color: 'green' }}>
                                <FaCheckCircle className="text-green-600 w-3 h-3" /> VERIFIED BUSINESS
                            </span>

                        </div>

                        {/* Swiper Carousel */}
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
                                    <img
                                        src={url}
                                        alt="Car"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Image count bottom left */}
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 z-10">
                            <FaCamera /> {car.imageUrls.length}
                        </div>

                        {/* Heart and Share icons */}
                        <div
                            className="absolute top-2 right-2 text-white text-xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                            }
                        >
                            <FaHeart />
                        </div>
                        <div
                            className="absolute top-1 right-9 text-white text-2xl z-10 cursor-pointer rounded-md p-1 transition-colors"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                            }
                        >
                            <IoMdShareAlt />
                        </div>

                        {/* Swiper arrows */}
                        <div
                            className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-base z-10 cursor-pointer flex items-center justify-center rounded-md w-7 h-7 transition-colors"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                            }
                        >
                            ‹
                        </div>
                        <div
                            className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-base z-10 cursor-pointer flex items-center justify-center rounded-md w-7 h-7 transition-colors"
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(43, 45, 46, 0.61)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor = "transparent")
                            }
                        >
                            ›
                        </div>

                        {/* Swiper pagination dots */}
                        <div className="swiper-pagination absolute bottom-1 w-full text-center z-10" />
                    </div>

                    {/* Right-side content */}
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl md:text-2xl font-semibold pb-2" style={{ fontSize: "16px" }}>{car.price}</h2>
                            <span
                                className="text-xs px-2 py-0.5 rounded font-semibold text-white"
                                style={{
                                    background:
                                        "linear-gradient(95.78deg, rgb(255, 189, 61) 2.35%, rgb(241, 162, 7) 95.78%)",
                                    marginRight: "10px",
                                    fontSize: "10px",
                                }}
                            >
                                PREMIUM
                            </span>
                        </div>

                        <p className="text-base text-gray-800">{car.title}</p>

                        <div className="flex items-center gap-1 mt-3 text-black text-sm md:text-base">

                            {car.location}


                        </div>

                        {/* Mileage and tags */}
                        <div className="flex flex-wrap gap-4 mt-3 mb-2 text-gray-700 text-sm md:text-base  relative">
                            {/* AGE, USAGE, CONDITION Tags */}
                            <div className="flex gap-2 flex-wrap">
                                <div className="bg-gray-100 px-3 py-2 rounded-md ">
                                    <div className="text-[10px] text-gray-500 font-semibold leading-none uppercase">Brand New</div>
                                    <div className="text-sm font-semibold">6-12 months</div>
                                </div>
                                <div className="bg-gray-100 px-3 py-2 rounded-md ">
                                    <div className="text-[10px] text-gray-500 font-semibold leading-none uppercase">Usage</div>
                                    <div className="text-sm font-semibold">Never Used</div>
                                </div>
                                <div className="bg-gray-100 px-3 py-2 rounded-md ">
                                    <div className="text-[10px] text-gray-500 font-semibold leading-none uppercase">Condition</div>
                                    <div className="text-sm font-semibold">Flawless</div>
                                </div>
                            </div>


                        </div>
                        <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/map.svg"
                                alt="Location"
                                className="w-4 h-4"
                            />
                            <span className="text-black font-medium">Palm Jumeirah, Dubai</span>
                            <span>•</span>
                            <span>03 May 2025</span>
                        </div>

                        {/* Chat Button */}
                        <div>
                            <button className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-black font-medium py-1.5 px-4 rounded-md border border-blue-100">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Chat
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Electronics;