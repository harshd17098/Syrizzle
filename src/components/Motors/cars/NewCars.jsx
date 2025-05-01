import FiltersNewCars from "../../Filters/cars/FiltersNewCars";

const NewCars = () => {
    return (
        <>
            <FiltersNewCars />

            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                {/* Top Image with Overlays */}
                <div className="relative h-64 w-full">
                    <img
                        src="https://dbz-images.dubizzle.com/images/2025/04/12/72ec2f888ed346878f998be5b65492f0-.jpeg?impolicy=lpv"
                        alt="Hyundai Palisade"
                        className="w-full h-full object-cover"
                    />

                    {/* Original & Discounted Price */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm font-medium px-3 py-1 rounded">
                        <div className="line-through text-red-300 text-xs">AED 164,990</div>
                        <div className="text-lg font-bold">AED 158,990</div>
                        <div className="text-xs text-green-300">AED 2,397 off</div>
                    </div>

                    {/* Badges and Icons */}
                    <div className="absolute top-2 right-2 flex flex-col items-end space-y-2">
                        <div className="bg-teal-500 text-white text-[10px] px-2 py-1 rounded font-bold shadow">CAR OF THE WEEK</div>
                        <div className="flex space-x-2">
                            <button className="bg-white rounded-full p-2 shadow-md">
                                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M15 8a3 3 0 00-2.83 2H7.83A3 3 0 005 8a3 3 0 100 6 3 3 0 002.83-2h4.34A3 3 0 0015 14a3 3 0 100-6z" />
                                </svg>
                            </button>
                            <button className="bg-white rounded-full p-2 shadow-md">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Footer Label */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/50 to-transparent text-white px-4 py-2 text-xs">
                        <p>Free Comprehensive Insurance</p>
                        <p>Free 2 Years or 50K Service Contract</p>
                    </div>
                </div>

                {/* Car Info */}
                <div className="p-4 space-y-2">
                    <h2 className="text-lg font-bold text-gray-800">Hyundai • Palisade • 3.8 V6 4WD</h2>
                    <p className="text-sm font-medium text-gray-700">BRAND-NEW PALISADE SMART + • OFFICIAL 5 YEAR HYUNDAI WARRANTY</p>

                    {/* Specs */}
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-4">
                        <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l9 4-3 10H6L3 6l9-4z" /></svg>
                            <span>2025</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 12h16" /></svg>
                            <span>0 km</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h8" /></svg>
                            <span>Left Hand</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v20" /></svg>
                            <span>GCC Specs</span>
                        </span>
                    </div>

                    {/* Location & Dealer */}
                    <div className="text-sm text-gray-600 mt-2">
                        <p>📍 Dubai Investment Park (DIP), Dubai</p>
                        <p className="mt-1">Listed by <span className="font-semibold text-gray-800">Park Lane Motors</span></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewCars;
