import { useState } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import LocationMap from "./LocationMap";


const FeatureGroup = ({ title, features }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b w-8/12 pb-4 mb-4">
            <div className="container m-auto">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <h2 className="text-lg">{title}</h2>
                    <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                        <span className="font-semibold">{features.length}</span>
                        {isOpen ? <ChevronUp className="text-blue-500 w-4 h-4" /> : <ChevronDown className="text-blue-500 w-4 h-4" />}
                    </div>
                </div>
                {isOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-4">
                        {features.map((item, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                                <Check className="text-green-600 w-4 h-4" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const FeaturesSection = () => {
    return (
        <div className="mt-8">
            <div className="container m-auto">
                <h1 className="text-[24px] font-semibold mb-6">Features</h1>
                <FeatureGroup
                    className="font-semibold text-[20px]"
                    title="Drivers Assistance & Safety"
                    features={["Cruise Control", "Dual Exhaust", "Front Airbags", "Tiptronic Gears"]}
                />
                <FeatureGroup
                    title="Others"
                    features={["Heated Seats", "Premium Wheels/Rims"]}
                />
            </div>
        </div>
    );
};

export default FeaturesSection;
