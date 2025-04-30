import React, { useState } from "react";
import FeaturesSection from "./FeaturesSection";
import LocationMap from "./LocationMap";

const CarAdDescription = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="border-t border-b py-6 mt-6">
            <div className="container m-auto">
                <h2 className="text-gray-900 text-[24px] font-semibold mb-4">
                    SPRING SPECIALS | 0% DP | AGENCY WARRANTY
                </h2>

                <p className="text-gray-800 mb-4">DS</p>

                <div className="mb-4">
                    <span className="text-gray-700">Description : </span>
                    <span className="text-gray-900">
                        Volvo S90 B5 Core 2023
                        {!showMore && <span className="ml-1">...</span>}
                    </span>
                </div>

                {showMore && (
                    <div className="text-gray-900 space-y-3 mb-4">
                        <p>Kilometer : 35,806 KM’S</p>
                        <p>Warranty : Agency Warranty Available Until 2027</p>
                        <p>Cash Price: 144,990 /-AED</p>
                        <p className="text-gray-400">------------------------------------------</p>
                        <p>20 % Downpayment - 1,808/-AED</p>
                        <p>0 % Downpayment - 2,394/-AED</p>
                        <p className="pt-2 font-semibold">EMI Bundle includes</p>
                        <ul className="pl-4 space-y-1">
                            <li>- Window Tint</li>
                            <li>- Full Ceramic Coating</li>
                            <li>- Registration</li>
                            <li>- 5,000 AED Cashback</li>
                        </ul>

                        <p className="text-gray-400">------------------------------------------</p>
                        <p className="font-semibold">Features</p>
                        <p>CORE Package</p>
                        <p>Mild Hybrid Technology (Average 900 Km's Range)</p>
                        <p>19 Inch Diamond Cut Alloy Wheels</p>
                        <p>Adaptive Head Lights</p>
                        <p>Leather Seats</p>
                        <p>Electric Seats With Lumbar Support</p>
                        <p>Memory Seats</p>
                        <p>Interior Wooden Trim Finishing</p>
                        <p>Smart Key System With Keyless Entry & Start</p>
                        <p>Adaptive Cruise Control</p>
                        <p>Blind Spot Assist</p>
                        <p>Digital Instrument Display</p>
                        <p>360 Cameras</p>
                        <p>Apple CarPlay</p>
                        <p>Android Auto [Youtube/Maps/Google assistance]</p>
                        <p>Dual Zone Climate Control</p>
                        <p>Isofix</p>
                        <p>Electric Tailgate</p>

                        <p className="text-gray-400">------------------------------------------</p>

                        <p className="font-semibold">SELLING YOUR CAR?</p>
                        <p className="font-semibold pt-2">Let Us Buy Your Car!</p>
                        <ul className="pl-4 space-y-1">
                            <li>• FREE Inspection and Evaluation</li>
                            <li>• Guaranteed Exceptional Price</li>
                            <li>• Auto-loan Clearance</li>
                            <li>• Instant Cash Payment</li>
                        </ul>

                        <p className="font-semibold pt-2">Let Us Sell Your Car! (Consignment)</p>
                        <ul className="pl-4 space-y-1">
                            <li>• FREE Listing Online</li>
                            <li>• Showroom Condition Detailing</li>
                            <li>• Handling Viewings</li>
                            <li>• Bank Loan Clearance</li>
                            <li>• Instant Cash Payment Upon Sale</li>
                        </ul>

                        <p className="pt-4">
                            Website: www.parklanemotorcars.com
                            <br />
                            Instagram: @Parklanemotors
                            <br />
                            Tiktok: @Parklanemotorcars
                        </p>

                        <p className="pt-2 font-semibold">Contact Us Today!</p>
                        <p>
                            Unleash the power of driving with Park Lane Motors. Call us or visit our
                            showroom at Dubai Investment Park 1.
                        </p>
                        <p>
                            Map Link{" "}
                            <a
                                href="#"
                                className="cursor-auto"
                                rel="noopener noreferrer"
                            >
                                https://maps.app.goo.gl/qrQmxnyevKHXD9Y19
                            </a>
                        </p>
                    </div>
                )}

                <div className="mb-4 text-center">
                    <button
                        className="text-blue-600 center font-semibold"
                        onClick={() => setShowMore((prev) => !prev)}
                    >
                        {showMore ? "Read Less" : "Read More"}
                    </button>
                </div>

                <div className="text-gray-700">
                    <span className="font-medium text-black">Posted on:</span>{" "}
                    <span className="text-gray-900">11th April 2025</span>
                </div>
                <FeaturesSection />
                <LocationMap />
            </div>
        </div>
    ); ``
};

export default CarAdDescription;
