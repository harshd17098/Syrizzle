import React, { useEffect, useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from '../../../../../api/api';


const HyperSportsForm = () => {
    const [showInputs, setShowInputs] = useState(true);
    const mapContainer = useRef(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const { categoryId, subCategoryId } = useParams(); // Extract categoryId and subCategoryId from the URL
    const [motorId, setMotorId] = useState(null);
    const [selectedModelId, setSelectedModelId] = useState("");
    const isValidObjectId = (id) => /^[a-f\d]{4}$/i.test(id);
    const [title, setTitle] = useState(""); // State for the title input
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false); // To handle loading state
    const [contactNumber, setContactNumber] = useState(""); // New state for contact number
    const [price, setPrice] = useState(""); // New state for price
    const [description, setDescription] = useState(""); // New state for description
    const [selectedUsage, setSelectedUsage] = useState(""); // Selected value for usage
    const [usageOptions, setUsageOptions] = useState([]); // State for usage options
    const [kilometers, setKilometers] = useState("");
    const [year, setYear] = useState("");
    const [sellerType, setSellerType] = useState("");
    const [warranty, setWarranty] = useState("");
    const [finalDriveSystem, setFinalDriveSystem] = useState("");
    const [wheels, setWheels] = useState("");
    const [manufacturers, setManufacturers] = useState([]);
    const [engineSizes, setEngineSizes] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [selectedEngineSize, setSelectedEngineSize] = useState("");

    const [images, setImages] = useState([]);
    const [payload, setPayload] = useState({
        images: [],
    });

    const markerRef = useRef(null);

    // Handle Image Change for uploading and preview
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imagePreviews = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...imagePreviews]);
    };

    // Remove image from preview and payload
    const handleRemoveImage = (indexToRemove) => {
        setImages((prev) => prev.filter((_, index) => index !== indexToRemove));

        setPayload((prev) => {
            const newPaths = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
            return { ...prev, images: newPaths };
        });
    };

    // Handle file upload logic and push to images state and payload
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            console.error("JWT token is missing");
            return;
        }

        const newImages = [];

        for (const file of files) {
            const previewUrl = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append("image", file);

            try {
                console.log("Uploading file:", file.name);
                const response = await fetch("https://syrizzle.vyominfotech.in/api/upload-image", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    console.error("Error: Upload failed with status", response.status);
                    throw new Error("Upload failed");
                }

                const result = await response.json();
                const uploadedPath = result.data.result;

                newImages.push({
                    file,
                    url: previewUrl,
                    image: uploadedPath,
                });
                // console.log("Uploaded image:", newImages);

            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        const imagePaths = newImages.map((img) => img.image);

        setImages((prev) => [...prev, ...newImages]);
        setPayload((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...imagePaths],
        }));
    };


    // Trigger file input click
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !contactNumber || !price || !description) {
            toast.error("Please fill all required fields.");
            return;
        }

        const token = localStorage.getItem("jwt");
        if (!token) return console.error("JWT token is missing");

        const finalPayload = {
            sub_category_id: subCategoryId,
            motor_type: 2,
            title,
            contact_number: contactNumber,
            price,
            description,
            images: payload.images,
            kilometers,
            year,
            seller_type: sellerType,
            warranty,
            final_drive_system: finalDriveSystem,
            wheels,
            usage_id: selectedUsage, // ✅ include this
            manufacturer_id: selectedManufacturer, // ✅ send ID to backend
            engine_size_id: selectedEngineSize, // ✅ Add this
        };

        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/add-motor`, finalPayload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Listing submitted successfully!");
            console.log("API Response:", response.data);
            // navigate("/success-or-next-step"); // Redirect after success
        } catch (error) {
            console.error("Error submitting form:", error.response?.data || error.message);
            setError("Failed to submit data");
            toast.error("Submission failed.");
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        // Fetch JWT from localStorage
        const token = localStorage.getItem("jwt");

        if (!token) {
            console.error("JWT token is missing");
            setError("JWT token is required");
            return;
        }

        // Fetch usage options from the API
        const fetchUsageOptions = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/usage/motorcycles`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass JWT in Authorization header
                        }
                    }
                );
                console.log("API Response:", response.data.data.result);

                // Assuming the API returns an array of usage options
                setUsageOptions(response.data.data.result); // Set the response to usageOptions state
            } catch (error) {
                console.error("Error fetching usage options:", error);
                setError("Failed to fetch usage options");
            }
        };

        fetchUsageOptions();
    }, []); // Runs only once when the component mounts

    useEffect(() => {
        const fetchManufacturers = async () => {
            const token = localStorage.getItem("jwt");

            if (!token) {
                console.error("JWT token is missing");
                return;
            }

            try {
                const response = await axios.get(
                    `${API_BASE_URL}/manufacturer`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setManufacturers(response.data.data.result); // Assuming response.data is an array of manufacturers
            } catch (err) {
                console.error("Error fetching manufacturers:", err.response ? err.response.data : err.message);
                setError("Failed to load manufacturers");
            }
        };

        fetchManufacturers();
    }, []);

    useEffect(() => {
        const fetchEngineSizes = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                console.error("JWT token is missing");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/engine-size`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Engine size data:", response.data);

                // Adjust based on actual structure
                setEngineSizes(response.data.data.result); // if it's an array
            } catch (err) {
                console.error("Error fetching engine sizes:", err.message);
            }
        };

        fetchEngineSizes();
    }, []);

    // Handle selection change
    const handleUsageChange = (e) => {
        const selectedId = e.target.value;
        const selectedOption = usageOptions.find(opt => opt._id === selectedId);
        // console.log("Selected Usage ID:", selectedId);
        // console.log("Selected Option:", selectedOption);
        setSelectedUsage(selectedId); // only store the ID if that's what your API needs
    };



    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleKilometersChange = (e) => {
        setKilometers(e.target.value);
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

            <form
                className="w-full max-w-md space-y-4"
                onSubmit={handleSubmit}
            >
                <p className="text-xs text-blue-600">
                    <a href="#" className="hover:underline">
                        Motorcycles
                    </a>{" "}
                    &gt; Adventure / Touring
                </p>

                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                        value={title}
                        onChange={handleTitleChange} // Capture input value
                    />
                </div>

                {/* Image Upload Section */}
                <div className="space-y-4">
                    {images.length > 0 && (
                        <div className="space-y-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative inline-block">
                                    <img
                                        src={img.url}
                                        alt={`Preview ${index}`}
                                        className="w-40 h-40 object-contain border rounded"
                                    />
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 text-white bg-black/50 rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        ✕
                                    </button>
                                    {index === 0 && (
                                        <div className="text-sm text-center mt-2">
                                            <span className="border px-2 py-1 rounded text-sm">Main photo</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Upload Button */}
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="w-full border border-red-600 text-red-600 py-3 rounded-md flex items-center justify-center gap-2 font-semibold"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h4l1-2h8l1 2h4v13H3V7z" />
                            <circle cx="12" cy="13" r="3" />
                        </svg>
                        Add Pictures
                    </button>
                </div>



                {/* Contact Number */}
                <div>
                    <input
                        type="text"
                        placeholder="Contact number"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)} // Capture contact number
                    />
                </div>

                {/* Price */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Price *"
                        className="w-full border border-gray-300 px-3 py-2 rounded pr-12 focus:outline-none focus:ring"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} // Capture price
                    />
                    <span className="absolute right-3 top-2.5 text-gray-500 text-sm">AED</span>
                </div>

                {/* Description */}
                <div className="relative">
                    <textarea
                        placeholder="Describe your motorcycle *"
                        className="w-full border border-gray-300 px-3 py-2 rounded h-32 resize-none focus:outline-none focus:ring"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Capture description
                        maxLength={16000}
                    ></textarea>
                    <div className="text-xs text-gray-400 text-right pr-1">{description.length}/16000</div>
                </div>

                {/* Usage Dropdown */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={selectedUsage}
                    onChange={handleUsageChange}
                    required
                >
                    <option value="" disabled>Usage *</option>
                    {Array.isArray(usageOptions) &&
                        usageOptions.map((option) => (
                            <option key={option._id} value={option._id}>
                                {option.name}
                            </option>

                        ))}
                </select>


                {/* Kilometers */}
                <input
                    type="text"
                    placeholder="Kilometers"
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={kilometers}
                    onChange={(e) => setKilometers(e.target.value)}
                />

                {/* Year */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                >
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

                {/* Seller Type */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={sellerType}
                    onChange={(e) => setSellerType(e.target.value)}
                    required
                >
                    <option value="">Seller Type *</option>
                    <option value="Owner">Owner</option>
                    <option value="Dealer">Dealer</option>
                    <option value="Dealership">Dealership/Certified Pre-Owned</option>
                </select>

                {/* Warranty */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    required
                >
                    <option value="">Warranty *</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                {/* Final Drive System */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={finalDriveSystem}
                    onChange={(e) => setFinalDriveSystem(e.target.value)}
                    required
                >
                    <option value="">Final Drive System *</option>
                    <option value="Belt">Belt</option>
                    <option value="Chain">Chain</option>
                    <option value="Shaft">Shaft</option>
                    <option value="Does not apply">Does not apply</option>
                </select>

                {/* Wheels */}
                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={wheels}
                    onChange={(e) => setWheels(e.target.value)}
                    required
                >
                    <option value="">Wheels *</option>
                    <option value="2 wheels">2 wheels</option>
                    <option value="3 wheels">3 wheels</option>
                    <option value="4 wheels">4 wheels</option>
                </select>

                {/* Manufactures */}
                <select
                    className="w-full h-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    value={selectedManufacturer}
                    onChange={(e) => setSelectedManufacturer(e.target.value)}
                >
                    <option value="" disabled>Manufacturer *</option>
                    {Array.isArray(manufacturers) &&
                        manufacturers.map((manufacturer) => (
                            <option key={manufacturer._id} value={manufacturer._id}>
                                {manufacturer.name}
                            </option>
                        ))}
                </select>




                <select
                    className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring"
                    required
                    value={selectedEngineSize}
                    onChange={(e) => setSelectedEngineSize(e.target.value)}
                >
                    <option value="" disabled>Engine Size *</option>
                    {Array.isArray(engineSizes) &&
                        engineSizes.map((size) => (
                            <option key={size._id || size.name} value={size._id}>
                                {size.name}
                            </option>
                        ))}
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
