import FiltersRoomsforRent from "../Filters/Rent/FiltersRoomsforRent";
import { Check, ChevronRight, Home } from 'lucide-react';
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
} from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { Mail, Phone } from 'lucide-react'; // Optional: Replace with your preferred icon library


const sortOptions = [
    "Newest to Oldest",
    "Oldest to Newest",
    "Price Highest to Lowest",
    "Price Lowest to Highest",

];
const carBrands = [
    "Dubai (12,046)",
    "Sharjah (1,735)",
    "Abu Dhabi (2,829)",
    "Ajman (1,522)",
    "Al Ain (244)",
    "Ras Al Khaimah (184)",
    "Fujeirah (37)",
    "Umm Al Qawain (881)",
];

const car = {
    price: "AED 1,200 Monthly",
    title: "Apartment",
    location:"Room With Partition",
    year: "Partition is Available for Professionals in DIP-1",
    mileage: "High Floor | Prime Location | Partitioned Office",
    hand: "Burlington, Business Bay, Dubai",
    specs: "GCC Specs",
    imageUrls: [
        "https://dbz-images.dubizzle.com/images/2025/05/02/a54e8d5ed17d4a1291648e10cb28693a-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/90b3cf0bce7549b491d55f00a7608645-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/400edc3cd5b949cf94db36e5b4188a06-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/7c780cfdcf7f4f0d9bb9440de4f8aa79-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/400edc3cd5b949cf94db36e5b4188a06-.jpeg?impolicy=dpc",
        "https://dbz-images.dubizzle.com/images/2025/05/02/7b4be845c09a418088efea79f8997937-.jpeg?impolicy=dpc",
    ],
};
const RoomsforRent = () => {
    const [open, setOpen] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const visibleBrands = showMore ? carBrands.slice(0, 8) : carBrands.slice(0, 7);

    const [selected, setSelected] = useState("Oldest to Newest");
    const handleSelect = (option) => {
        setSelected(option);
        setOpen(false);
    };
    const [selecte, setSelecte] = useState("All");
    const [enabled, setEnabled] = useState(false);

    const options = ["All", "Furnished", "Unfurnished"];
    return (
        <>
            <section>
                <div className="sticky top-1 " style={{zIndex:"9999"}}>
                    <FiltersRoomsforRent />
                </div>

                <div>
                    <div className="px-5 py-8">
                        {/* Breadcrumb */}
                        <div className="flex items-center text-sm text-gray-500 space-x-1">
                            <Home className="w-4 h-4 text-black" style={{ fontSize: "20px" }} />
                            <ChevronRight className="w-4 h-4" />
                            <a href="#" className="text-blue-600 ">Real Estate for Rent</a>
                            <ChevronRight className="w-4 h-4" />
                            <span>Rooms for rent in UAE</span>
                        </div>
                        <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4 mb-4">

                            <h1 className="mt-2 text-xl font-semibold text-gray-900">
                                <span className="font-bold">Rooms for rent in UAE</span>
                                <span className="font-normal text-gray-600"> • 6,136 Ads</span>
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

                        <p className="text-base text-gray-800">{car.title}</p>
                        <div className="flex items-center gap-1 mt-3 text-gray-600 text-sm md:text-base">
                            <img
                                src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/partitioned_room.svg"
                                alt=""
                                className="mr-1"
                            />
                            {car.location}
                        </div>
                        <p className="text-base text-gray-800 pt-1">{car.year}</p>


                        <div className="gap-4 mt-3 text-gray-700 text-sm md:text-base items-center relative pb-2.5">

                            {/* <div className="flex items-center gap-1" style={{ fontWeight: "600" }}>
                                {car.mileage}
                            </div> */}

                                {/* <div className="inline-flex items-center gap-2 px-3 py-1 border rounded-lg shadow-sm text-sm bg-white pb-4">
                                    <Check className="w-4 h-4 text-green-600" />
                                    <span className="font-semibold">All Bills Included</span>
                                </div> */}

                            <div className="flex items-center gap-1 pb-2.5">
                                <img src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/map.svg" alt="" />
                                {car.hand}
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

                               
                            </div>
                        </div>


                    </div>

                </div>
            </section>
        </>
    )
}
export default RoomsforRent;