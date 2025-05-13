import React, { useEffect, useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';




const HyperSportsForm = () => {
    const [images, setImages] = useState([]);
    const [showInputs, setShowInputs] = useState(true);
    const mapContainer = useRef(null);
    // hh
    const [modelInput, setModelInput] = useState("");
    const [selectedModelId, setSelectedModelId] = useState("");



    const markerRef = useRef(null);



    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imagePreviews = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...imagePreviews]);
    };

    const removeImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const manufacturers = [
        "Access Motor",
        "Aprillia",
        "Asiawing",
        "BMW",
        "Bajaj",
        "Benelli",
        "Buell",
        "Can-am",
        "Ducati",
        "Fantic",
        "Gas Gas",
        "Harley Davidson",
        "Hero",
        "Honda",
        "Husaberg",
        "Husqvarna",
        "indian",
        "KTM",
        "Kawasaki",
        "MV Agusta",
        "Moto Guzzi",
        "Norton",
        "Polaris",
        "Royal Enfied",
        "Sharmax",
        "Suzuki",
        "Triumph",
        "Vespa",
        "Victory",
        "Yamaha",
        "Other",
    ];
    const handleModelSelect = async () => {
        if (!modelInput || modelInput.trim() === "") {
            toast.error("Please enter a valid model ID.");
            return;
        }

        const token = localStorage.getItem("jwt");
        if (!token) {
            toast.error("Authentication token not found. Please log in again.");
            return;
        }

        try {
            const modelId = modelInput.trim();
            setSelectedModelId(modelId);

            const payload = {
                model_id: modelInput.trim(),
                emirate: "dubai", // <-- required?

                // Add more if needed
            };


            const res = await axios.post(
                "https://syrizzle.vyominfotech.in/api/add-motor",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("API response:", res.data); // log the full response to debug

            const createdMotorId = res.data?.data?.result?._id;
            if (createdMotorId) {
                setMotorId(createdMotorId);
                setSearchParams({ _id: createdMotorId });
                toast.success("Model selected and data saved successfully!");
            } else {
                toast.error("Failed to get motor ID from response.");
            }
        } catch (error) {
    console.error("Model selection error:", error);
    if (error.response) {
        console.log("Error Response Data:", error.response.data);
        toast.error(error.response.data?.message || "Something went wrong on the server.");
    } else {
        toast.error("No response from the server.");
    }
}

    };



    return (
        <div className="flex flex-col items-center bg-white min-h-screen p-4">
            <img src="/logo.svg" alt="dubizzle logo" className="h-10 my-4" />

            <h2 className="text-lg font-bold text-center text-red-700">
                You’re almost there!
            </h2>
            <p className="text-center text-sm mb-4 text-gray-600">
                Include as much details and pictures as possible!
            </p>

            <form className="w-full max-w-md space-y-4">
                <p className="text-xs text-blue-600">
                    <a href="#" className="hover:underline">
                        Motorcycles
                    </a>{" "}
                    &gt; Adventure / Touring
                </p>

                <input
                    type="text"
                    value={modelInput}
                    onChange={(e) => setModelInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault(); // prevent form submission
                            handleModelSelect();
                        }
                    }}
                    placeholder="Enter Model ID"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                />




                {/* Image Upload */}
                <label className="w-full border border-red-500 text-red-600 py-2 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-red-50 transition">
                    <span className="text-lg">
                        <FaCameraRetro />
                    </span>{" "}
                    Add Pictures
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>

                {/* Image Preview */}
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {images.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={img.preview}
                                    alt={`preview-${index}`}
                                    className="h-20 w-20 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Contact number"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                />

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Price *"
                        className="w-full border border-gray-300 px-3 py-2 rounded pr-12 focus:outline-none focus:ring"
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500 text-sm">
                        AED
                    </span>
                </div>

                <div className="relative">
                    <textarea
                        placeholder="Describe your motorcycle *"
                        className="w-full border border-gray-300 px-3 py-2 rounded h-32 resize-none focus:outline-none focus:ring"
                        maxLength={16000}
                    ></textarea>
                    <div className="text-xs text-gray-400 text-right pr-1">0/16000</div>
                </div>

                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">Usage *</option>
                    <option value="used-once">
                        Only used once since it was purchased new
                    </option>
                    <option value="rarely-used">
                        Used very rarely since it was purchased
                    </option>
                    <option value="weekly-use">
                        Used once or twice a week since purchased
                    </option>
                    <option value="daily-use">
                        Used as primary mode of transportation
                    </option>
                </select>

                <input
                    type="text"
                    placeholder="Kilometers"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                />

                <select className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring">
                    <option value="">Year *</option>
                    {Array.from({ length: 2025 - 1921 + 1 }, (_, i) => {
                        const year = 2025 - i;
                        return (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        );
                    })}
                </select>

                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">Seller Type *</option>
                    <option value="Owner">Owner</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Dealership">Dealership/Certified Pre-Owned</option>
                </select>

                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">Warranty *</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    {/* <option value="Does not apply">Does not apply</option> */}
                </select>

                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">Final Drive System *</option>
                    <option value="Belt">Belt</option>
                    <option value="Chain">Chain</option>
                    <option value="Shaft">Shaft</option>
                    <option value="Does not apply">Does not apply</option>
                </select>

                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">wheels *</option>
                    <option value="2 wheels">2 wheels</option>
                    <option value="3 wheels">3 wheels</option>
                    <option value="4 wheels">4 wheels</option>
                </select>

                <select className="w-full h-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring">
                    <option value="">Manufacturer *</option>
                    {manufacturers.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>



                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                >
                    <option value="">Engine Size *</option>
                    <option value="">Less than 250cc</option>
                    <option value="">250cc - 499cc</option>
                    <option value="">500cc- 599cc</option>
                    <option value="">600cc-749cc</option>
                    <option value="">750cc-999cc</option>
                    <option value="">1000cc or more</option>
                    <option value="">Does not apply</option>
                </select>

                <div className="max-w-md mx-auto p-4 border rounded shadow bg-white">
                    <h2 className="font-semibold text-lg mb-4 flex justify-between items-center">
                        Select Location
                        {showInputs && (
                            <button
                                onClick={() => setShowInputs(false)}
                                className="text-gray-500 hover:text-black text-xl font-bold"
                                aria-label="Close"
                            >
                                ×
                            </button>
                        )}
                    </h2>

                    {showInputs && (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="Locate your motorcycle"
                                className="w-full border border-gray-300 rounded p-2"
                            />
                            <input
                                type="text"
                                placeholder="Building or Street name"
                                className="w-full border border-gray-300 rounded p-2"
                            />
                        </div>
                    )}

                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Is the pin in the right location?
                        </h3>
                        <p className="text-xs text-gray-500 mb-2">
                            Click and drag the pin to the exact spot. Users are more likely to respond to ads that are correctly shown on the map.
                        </p>
                        <div ref={mapContainer} className="h-64 w-full rounded overflow-hidden border" />
                        <button className="mt-2 bg-white text-black text-sm border border-gray-300 px-3 py-1 rounded shadow hover:bg-gray-100">
                            📍 Locate Me
                        </button>
                    </div>

                    <div className="mt-4">
                        <p className="text-sm font-semibold mb-1">
                            Choose how you want to label your location <span className="text-gray-400">(Optional)</span>
                        </p>
                        <div className="flex gap-2">
                            <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">+ New Location</button>
                            <button
                                className="bg-gray-200 px-4 py-1 rounded text-sm"
                                onClick={() => setShowInputs(!showInputs)}
                            >
                                Home
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-xs text-gray-500 border-t pt-3 space-y-2">
                        <p>
                            Your ad will be rejected if it does not comply with our{" "}
                            <a href="#" className="text-blue-600 underline">posting guidelines</a>. Got questions? <a href="#" className="text-blue-600 underline">email us</a>.
                        </p>
                        <p>
                            By proceeding, I confirm that I have reviewed the information provided above and confirm that such information is complete and accurate. <a href="#" className="text-blue-600 underline">Terms & conditions</a>.
                        </p>
                    </div>
                </div>


                <button
                    type="submit"
                    className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
                >
                    Next
                </button>
            </form>
            <ToastContainer />

        </div>
    );
};

export default HyperSportsForm;
