import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import { AiOutlineTag } from "react-icons/ai";
import { HiOutlineArrowNarrowUp } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";

const CarProducts = () => {
    const [selectedAd, setSelectedAd] = useState("standard");
    const basePrice = 49;
    const VAT_RATE = 0.05;

    const adOptions = {
        standard: { name: "Standard Ad", price: 0 },
        premium: { name: "Premium Ad", price: 159 },
        featured7: { name: "Featured Ad (7 days)", price: 49 },
        featured14: { name: "Featured Ad (14 days)", price: 79 }
    };

    const getAddonName = () => {
        if (selectedAd === "premium") return adOptions.premium.name;
        if (selectedAd === "featured7") return adOptions.featured7.name;
        if (selectedAd === "featured14") return adOptions.featured14.name;
        return null;
    };

    const getAddonPrice = () => {
        return adOptions[selectedAd]?.price || 0;
    };

    const subtotal = basePrice + getAddonPrice();
    const vat = subtotal * VAT_RATE;
    const total = (subtotal + vat).toFixed(2);

    return (
        <>
            <div className="container bg-gray-100">
                <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-screen  ">
                    {/* LEFT: Package Options */}
                    <div className="w-full md:w-2/3 bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">Select a package that works for you</h2>

                        <div className="border p-4 rounded mb-4 bg-blue-50 flex items-start gap-2">
                            <IoDiamondOutline className="text-blue-600 text-lg mt-1" />
                            <div>
                                <p className="text-sm font-semibold text-blue-700">
                                    You're posting in a paid only category
                                </p>
                                <p className="text-sm text-gray-700">
                                    This will help you get quality buyers for a small fee
                                </p>
                            </div>
                        </div>

                        {/* Standard Ad */}
                        <div className="border p-4 rounded mb-4 flex items-center">
                            <label className="flex items-center space-x-3 w-full cursor-pointer">
                                <input
                                    type="radio"
                                    name="adType"
                                    value="standard"
                                    checked={selectedAd === "standard"}
                                    onChange={() => setSelectedAd("standard")}
                                />
                                <div className="flex items-center gap-2">
                                    <AiOutlineTag className="text-gray-700 text-xl" />
                                    <div>
                                        <p className="font-semibold">Standard</p>
                                        <p className="text-sm text-gray-600">Ad will be live for 30 days</p>
                                    </div>
                                </div>
                                <span className="ml-auto font-semibold text-red-600">AED 49</span>
                            </label>
                        </div>


                        {/* Premium Ad */}
                        <div className="border p-4 rounded mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <HiOutlineArrowNarrowUp className="text-yellow-500 text-xl" />
                                <p className="font-semibold">Premium Ad</p>
                                <span className="ml-2 text-green-600 text-xs font-bold">NEW</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Premium ads are placed on top of all ads. Get up to 25X more offers.
                            </p>
                            <label className="flex items-center space-x-3 w-full cursor-pointer">
                                <input
                                    type="radio"
                                    name="adType"
                                    value="premium"
                                    checked={selectedAd === "premium"}
                                    onChange={() => setSelectedAd("premium")}
                                />
                                <span>Premium Ad for 7 days</span>
                                <span className="ml-auto">+AED 159</span>
                            </label>
                        </div>

                        {/* Featured Ads */}
                        <div className="border p-4 rounded">
                            <div className="flex items-center gap-2 mb-2">
                                <MdNewReleases className="text-blue-500 text-xl" />
                                <p className="font-semibold">Featured Ad</p>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                                Featured ads appear above the standard ads, and after the Premium Ads
                            </p>
                            <label className="flex items-center space-x-3 mb-2 w-full cursor-pointer">
                                <input
                                    type="radio"
                                    name="adType"
                                    value="featured7"
                                    checked={selectedAd === "featured7"}
                                    onChange={() => setSelectedAd("featured7")}
                                />
                                <span>Feature your ad for 7 days</span>
                                <span className="ml-auto">+AED 49</span>
                            </label>
                            <label className="flex items-center space-x-3 w-full cursor-pointer">
                                <input
                                    type="radio"
                                    name="adType"
                                    value="featured14"
                                    checked={selectedAd === "featured14"}
                                    onChange={() => setSelectedAd("featured14")}
                                />
                                <span>Feature your ad for 14 days</span>
                                <span className="ml-auto">+AED 79</span>
                            </label>
                        </div>

                        <p className="text-xs text-gray-600 mt-4">
                            Prices are exclusive of VAT. The applicable products have been automatically selected based on the products applied on the previous listing.
                        </p>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="w-full md:w-1/3 bg-white p-6 rounded shadow " style={{height:"400px"}}>
                        <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                        <div className="flex justify-between mb-2">
                            <span>Basic Ad</span>
                            <span>AED {basePrice.toFixed(2)}</span>
                        </div>

                        {/* Addon breakdown */}
                        {selectedAd !== "standard" && (
                            <div className="flex justify-between mb-2">
                                <span>{getAddonName()}</span>
                                <span>+AED {getAddonPrice().toFixed(2)}</span>
                            </div>
                        )}

                        {/* Discount (placeholder) */}
                        <input
                            type="text"
                            placeholder="Discount Code"
                            className="border p-2 w-full mb-2"
                        />
                        <button className="bg-gray-300 px-4 py-2 rounded mb-4 w-full">Apply</button>

                        {/* Totals */}
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>AED {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>VAT 5%</span>
                            <span>AED {vat.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold mt-2">
                            <span>Total</span>
                            <span>AED {total}</span>
                        </div>
                        <button className="bg-red-600 text-white w-full py-2 rounded mt-4">
                            Pay AED {total}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarProducts;
