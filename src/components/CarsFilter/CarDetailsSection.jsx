import { useRef, useEffect, useState } from "react";
import { Heart, Share2, Calendar, Gauge, CircleDot, Globe, CheckCircle, Phone } from "lucide-react";
import { Button } from "flowbite-react";
import CarAdDescription from "./CarAdDescription"; // Adjust path if needed

export default function CarDetails() {
    const sentinelRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => {
            if (sentinelRef.current) {
                observer.unobserve(sentinelRef.current);
            }
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-4">
            {/* Sentinel for sticky logic */}
            <div ref={sentinelRef} className="h-1" />

            {/* Sticky Header */}
            <div
                className={`sticky top-0 z-30 bg-white pl-0 rounded-md transition-all duration-500 shadow-md ${
                    isSticky ? "animate-slide-in" : ""
                }`}
            >
                <div className="space-y-2 p-4">
                    <div className="flex justify-between">
                        <h2 className="text-xl text-gray-800 font-semibold">
                            AED <span className="font-bold text-2xl">114,990</span>
                        </h2>
                        <div className="flex gap-2 mt-1">
                            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">
                                <Heart size={16} /> Favorite
                            </button>
                            <button className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm">
                                <Share2 size={16} /> Share
                            </button>
                        </div>
                    </div>

                    <p className="text-xl font-medium text-gray-900">Volvo S90 Momentum</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-800 mt-1 items-center">
                        <span className="flex items-center gap-1">
                            <Calendar size={16} /> 2023
                        </span>
                        <span className="flex items-center gap-1">
                            <Gauge size={16} /> 35,806 km
                        </span>
                        <span className="flex items-center gap-1">
                            <CircleDot size={16} /> Left Hand
                        </span>
                        <span className="flex items-center gap-1">
                            <Globe size={16} /> GCC Specs
                        </span>
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2">
                        {["Dealer Warranty", "Original Paint", "Service History"].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-1 px-4 py-1 border border-gray-300 text-sm font-semibold rounded-md text-gray-800"
                            >
                                <CheckCircle size={16} className="text-green-600" />
                                {item}
                            </div>
                        ))}
                    </div>

                    {isSticky && (
                        <div className="flex gap-4 mt-4">
                            <Button
                                variant="outline"
                                className="flex-1 flex gap-2 items-center hover:bg-red-200 bg-red-100 text-red-600 border-red-300"
                            >
                                <Phone size={16} /> Call
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1 flex gap-2 items-center bg-green-100 hover:bg-green-200 text-green-600 border-green-600"
                            >
                                <img
                                    src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/whatsapp2.svg"
                                    alt="WhatsApp"
                                    className="w-4 h-4"
                                />
                                WhatsApp
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Rest of the content */}
            <div className="border-t pt-4 mt-6 relative">
                <h2 className="text-[24px] font-semibold mb-6">Car Overview</h2>
                {/* Overview grid here... */}
                {/* Right section, Dealer card etc... */}
            </div>

            <CarAdDescription />

            <style>{`
                @keyframes slide-in {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
}
