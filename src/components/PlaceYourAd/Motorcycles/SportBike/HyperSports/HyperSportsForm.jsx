import React, { useEffect, useRef, useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from '../../../../../api/api';
import { IoLocation } from "react-icons/io5";


const HyperSportsForm = () => {
     const location = useLocation();
      const dataReceived = location.state;
      console.log("dataReceived++++++++++++++++++++++++", dataReceived);
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
    const [addressData, setAddressData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [addressId, setAddressId] = useState(null);

    const [images, setImages] = useState([]);
    const [payload, setPayload] = useState({
        images: [],
    });
    const [formDat, setFormDat] = useState({
        neighbourhood: '',
        building: '',
        apartment: '',
        custom_label: 'work',
        address_type: 1,
        isDefault: 0,
        latitude: '',
        longitude: '',
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


    const fetchAddresses = async () => {
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            console.log("No JWT token found in localStorage.");
            return;
        }

        try {
            const response = await axios.get("https://syrizzle.vyominfotech.in/api/address", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const result = response.data.data.result;

            if (response.data.success && Array.isArray(result)) {
                setAddressData(result);

                const defaultAddr = result.find(addr => addr.isDefault === 1) || result[0];

                if (defaultAddr?._id) {
                    setAddressId(defaultAddr._id);

                    setPayload(prev => ({
                        ...prev,
                        address_id: defaultAddr._id

                    }));

                    // ✅ Set latitude and longitude in formDat
                    setFormDat(prev => ({
                        ...prev,
                        latitude: defaultAddr.latitude || '',
                        longitude: defaultAddr.longitude || ''

                    }));


                } else {
                    console.warn("No address_id found in fetched addresses.");
                }
            } else {
                console.warn("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };


    useEffect(() => {
        fetchAddresses();
    }, []);
    const handleChang = (e) => {

        const { name, value, type, checked } = e.target;
        setFormDat((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const handleLabel = (label, type) => {
        setFormDat((prev) => ({
            ...prev,
            custom_label: label,
            address_type: type,
        }));
    };

    const handleEdit = (address) => {
        setSelectedAddressId(address._id);
        setFormDat({
            neighbourhood: address.neighbourhood || '',
            building: address.building || '',
            apartment: address.apartment || '',
            custom_label: address.custom_label || 'work',
            address_type: address.address_type || 1,
            isDefault: address.isDefault || 0,
            latitude: address.latitude || '',
            longitude: address.longitude || '',
        });
        setShowForm(true);
    };

    const handleSubmitt = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) return alert('User not authenticated');

            const endpoint = selectedAddressId
                ? `https://syrizzle.vyominfotech.in/api/address/update/${selectedAddressId}`
                : 'https://syrizzle.vyominfotech.in/api/address/add';

            const method = selectedAddressId ? 'post' : 'post';

            const response = await axios[method](endpoint, formDat, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert(`Address ${selectedAddressId ? 'updated' : 'saved'} successfully!`);
            setShowForm(false);
            setSelectedAddressId(null);
            fetchAddresses(); // Refresh list
        } catch (error) {
            console.error('Failed to save address:', error);
            alert('Failed to save address');
        }
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

    // ✅ Get category_id from localStorage
    const categoryId = localStorage.getItem("category_id");

    if (!categoryId) {
        toast.error("Category ID is missing.");
        return;
    }

    const finalPayload = {
        category_id: categoryId, // ✅ Add category_id to payload
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
        usage_id: selectedUsage,
        manufacturer_id: selectedManufacturer,
        engine_size_id: selectedEngineSize,
        address_id: addressId,
        latitude: formDat.latitude,
        longitude: formDat.longitude
    };
// console.log(finalPayload);

    setIsLoading(true);
    try {
        const response = await axios.post(`${API_BASE_URL}/add-motor`, finalPayload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        toast.success("Listing submitted successfully!");
        console.log("API Response:", response.data);

        // ✅ Remove category_id from localStorage after success
        localStorage.removeItem("category_id");

        // navigate("/success-or-next-step");
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
            <div className="flex justify-center text-3xl font-bold mb-8">
              <a href="/">   <span className="text-black">Syr</span>
                <span className="text-red-600 relative">
                    izzle
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
                </span></a>
            </div>
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





                {addressData.map((addr) => (
                    <div
                        key={addr._id}
                        className="border p-4 rounded shadow-sm flex justify-between items-start"
                    >
                        <div>
                            <div className="flex items-center font-semibold">
                                <IoLocation className="mr-1" />
                                {addr.custom_label}
                            </div>

                            <p className="text-sm text-gray-600">
                                {[addr.apartment, addr.building, addr.neighbourhood].filter(Boolean).join(", ")}
                            </p>
                            <div >
                                <button
                                    className="mt-2 border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105"
                                    onClick={() => handleEdit(addr)}
                                    style={{ marginRight: "10px" }}
                                >
                                    Edit
                                </button>



                            </div>
                        </div>
                        {addr.isDefault === 1 && (
                            <span className="text-xs px-2 py-1 bg-black text-white rounded">
                                Default
                            </span>
                        )}
                    </div>
                ))}{showForm && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                        style={{ marginTop: "0px" }}
                        onClick={() => {
                            setShowForm(false);
                            setSelectedAddressId(null);
                        }}
                    >
                        <div
                            className="bg-white p-6 rounded-lg w-full max-w-md relative"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setSelectedAddressId(null);
                                }}
                                className="absolute top-2 right-2 text-gray-500 text-xl"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-semibold mb-4">
                                {selectedAddressId ? 'Edit Address' : 'Location Details '}
                            </h2>

                            <input
                                type="text"
                                name="neighbourhood"
                                placeholder="Neighbourhood"
                                value={formDat.neighbourhood}
                                onChange={handleChang}
                                className="border w-full p-2 rounded mb-2"
                                required
                            />
                            <input
                                type="text"
                                name="building"
                                placeholder="Building"
                                value={formDat.building}
                                onChange={handleChang}
                                className="border w-full p-2 rounded mb-2"
                            />
                            <input
                                type="text"
                                name="apartment"
                                placeholder="Apartment"
                                value={formDat.apartment}
                                onChange={handleChang}
                                className="border w-full p-2 rounded mb-4"
                            />

                            <input
                                type="number"
                                name="latitude"
                                placeholder="Latitude"
                                value={formDat.latitude}
                                onChange={handleChang}
                                className="border w-full p-2 rounded mb-2"
                            />
                            <input
                                type="number"
                                name="longitude"
                                placeholder="Longitude"
                                value={formDat.longitude}
                                onChange={handleChang}
                                className="border w-full p-2 rounded mb-4"
                            />

                            <div className="mb-2 font-medium">Label this address:</div>
                            <div className="flex space-x-2 mb-4">
                                {[
                                    { label: 'Other', type: 3 },
                                    { label: 'Home', type: 2 },
                                    { label: 'Work', type: 1 }
                                ].map(({ label, type }) => (
                                    <button
                                        key={type}
                                        onClick={() => handleLabel(label.toLowerCase(), type)}
                                        className={`px-3 py-1 border rounded ${formDat.address_type === type ? 'bg-blue-100' : ''}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <label className="inline-flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    name="isDefault"
                                    checked={formDat.isDefault === 1}
                                    onChange={handleChang}
                                    className="mr-2"
                                />
                                Set as default
                            </label>

                            <button
                                onClick={handleSubmitt}
                                className="bg-blue-600 text-white w-full py-2 rounded"
                            >
                                {selectedAddressId ? 'Update Address' : 'Save Address'}
                            </button>
                        </div>
                    </div>
                )}


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
