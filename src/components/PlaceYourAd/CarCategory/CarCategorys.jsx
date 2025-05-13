import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSearchParams } from 'react-router-dom';
import { useRef } from 'react';


const extrasList = [
    'Fog Lights',
    'Air Conditioning',
    'Performance Tyres',
    'Premium Sound System',
    'Heat',
    'Sunroof',
    'Leather Seats',
    'Navigation System',
    'Bluetooth',
    'Backup Camera',
    'Heated Steering Wheel',
    'Wireless Charging',
    'Heads-Up Display',
    'Ambient Lighting',
    'Keyless Entry',
];
const CarCategorys = () => {
    const [emirate, setEmirate] = useState("");
    const [selectedModelId, setSelectedModelId] = useState("");
    const [selectedTrimId, setSelectedTrimId] = useState("");
    const [selectedSpecId, setSelectedSpecId] = useState('');
    const [year, setYear] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [carInsured, setCarInsured] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
    const [motorId, setMotorId] = useState(null);
    const [models, setModels] = useState([]);
    const [trims, setTrims] = useState([]);
    const [regionalSpecs, setRegionalSpecs] = useState([]);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [responseData, setResponseData] = useState(null);

    const [searchParams, setSearchParams] = useSearchParams();
    const motorIdFromURL = searchParams.get('_id');
    const fileInputRef = useRef(null);
    const [images, setImages] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [showAl, setShowAl] = useState(false);
    const [extras, setExtras] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]); // Store uploaded URLs

    const visibleExtras = showAl ? extras : extras.slice(0, 5);
    const [colors, setColors] = useState([]);
    const [error, setError] = useState(null);
    const [InteriorColor, setInteriorColor] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [horsepowerList, setHorsepowerList] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);

    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [selectedExtras, setSelectedExtras] = useState([]); // renamed
    const [showAllExtras, setShowAllExtras] = useState(false); // renamed
    const uploadedImageUrlsRef = useRef([]);

    const displayedFeatures = showAll ? features.slice(0, 15) : features.slice(0, 5);
    const displayedExtras = showAllExtras ? extras.slice(0, 15) : extras.slice(0, 5);
    const [formData, setFormData] = useState({
        transmission_type_id: [],
        extras_id: ""
    });

    const token = localStorage.getItem("jwt");
    const [payload, setPayload] = useState({
        images: [],
        title: '',
        tour_360: '',
        description: '',
        fuel_type: '',
        exterior_color_id: '',
        interior_color_id: '',
        warranty: '',
        doors: '',
        seating_capacity: '',
        horsepower_id: '',
        steering_side: '',
        // technical_features_id: [],
        // extras_id: "",
    });

    // Fetch models
    useEffect(() => {
        axios
            .get("https://syrizzle.vyominfotech.in/api/model", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setModels(res.data.data.result))
            .catch((err) => console.error("Model Fetch Error:", err));
    }, [token]);

    // Fetch trims when model is selected
    useEffect(() => {
        if (selectedModelId) {
            axios
                .get(`https://syrizzle.vyominfotech.in/api/trim/${selectedModelId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setTrims(res.data.data.result))
                .catch((err) => console.error("Trim Fetch Error:", err));
        }
    }, [selectedModelId, token]);

    // Fetch regional specs when Emirate is selected
    useEffect(() => {
        axios
            .get("https://syrizzle.vyominfotech.in/api/regional-spec", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setRegionalSpecs(res.data.data.result))
            .catch((err) => console.error("Regional Spec Fetch Error:", err));
    }, [emirate, token]);

    // Fetch body types
    useEffect(() => {
        axios
            .get("https://syrizzle.vyominfotech.in/api/body-type", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setBodyTypes(res.data.data.result))
            .catch((err) => console.error("Failed to fetch body types:", err));
    }, [token]);
    useEffect(() => {

        if (!token) {
            setError("No token found");
            return;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/exterior-color", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setColors(response.data.data.result); // adjust this if data is nested
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch exterior colors.");
            });
    }, [token]);

    if (error) return <p className="text-red-500">Error: {error}</p>;

    useEffect(() => {

        if (!token) {
            setError("JWT token not found in localStorage.");
            return;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/interior-color", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log("Interior color response:", response.data);
                // Adjust below line based on actual structure
                setInteriorColor(response.data.data.result);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch interior colors.");
            });
    }, [token]);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            setError("JWT token not found in localStorage.");
            return;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/transmission-type", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Transmission types:", response.data);
                // Adjust based on the actual response structure
                setTransmissions(response.data.data.result);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch transmission types.");
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            setError("JWT token not found in localStorage.");
            return;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/horsepower", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Horsepower response:", response.data);
                setHorsepowerList(response.data.data.result); // adjust based on actual structure
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch horsepower data.");
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            setError("JWT token not found in localStorage.");
            return;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/extras", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setExtras(response.data.data.result);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch extras.");
            });
    }, []);
    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            return <p className="text-red-500">No token found!</p>;
        }

        axios
            .get("https://syrizzle.vyominfotech.in/api/technical-features", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Technical features:", response.data);
                setFeatures(response.data.data.result); // adjust if structure differs
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Failed to fetch technical features.");
            });
    }, []);


    // Handle model selection
    const handleModelChange = async (e) => {
        const modelId = e.target.value;
        setSelectedModelId(modelId);
        if (!modelId) return;

        try {
            const payload = { emirate, model_id: modelId };
            const res = await axios.post(
                "https://syrizzle.vyominfotech.in/api/add-motor",
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const createdMotorId = res.data.data.result._id;
            setMotorId(createdMotorId);
            setSearchParams({ _id: createdMotorId });
            toast.success("Model selected and data saved successfully!");
        } catch (error) {
            toast.error("Something went wrong while selecting the model.");
        }
    };

    // Submit form
    const handleSubmi = async (e) => {
        e.preventDefault();

        if (!motorId) {
            toast.error("Motor ID not found. Please select a model first.");
            return;
        }



        const payload = {
            images: uploadedImageUrlsRef.current,
            emirate,
            model_id: selectedModelId,
            trim_id: selectedTrimId,
            regional_spec_id: selectedSpecId,
            year,
            kilometer: kilometers,
            body_type_id: bodyType,
            car_insured: carInsured,
            price,
            mobile: phone,
            status: 'draft',
        };

        try {
            const response = await axios.post(
                `https://syrizzle.vyominfotech.in/api/add-motor/${motorId}`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                }
            );
            console.log("Images to send:", uploadedImageUrlsRef.current);

            console.log(response.data.data.result);

            setResponseData(response.data.data.result);
            setFormSubmitted(true); // Switch to next screen
            // Store response data
            toast.success('Data submitted as draft!');

        } catch (err) {
            toast.error('Submission failed');
        }
    };

    // console.log("Payload being sent:", payload);
    const handleChange = (id) => {
        const updated = selectedFeatures.includes(id)
            ? selectedFeatures.filter((item) => item !== id)
            : [...selectedFeatures, id];

        setSelectedFeatures(updated);
        setFormData((prev) => ({
            ...prev,
            transmission_type_id: updated, // 👈 Store as array
        }));
    };

    const handleChangeExtra = (id) => {
        const updated = selectedExtras.includes(id)
            ? selectedExtras.filter((item) => item !== id)
            : [...selectedExtras, id];

        setSelectedExtras(updated);
        setFormData((prev) => ({
            ...prev,
            extras_id: updated, // 👈 Store as array
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!motorId) {
            toast.error("Motor ID not found. Please select a model first.");
            return;
        }


        try {
            const response = await axios.post(
                `https://syrizzle.vyominfotech.in/api/add-motor/${motorId}`,
                payload,
                {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
                }
            );
            console.log("Payload being sent:", payload);
            console.log(payload.transmission_type_id);

            console.log(response.data.data.result);

            setResponseData(response.data.data.result);
            setFormSubmitted(true); // Switch to next screen
            // Store response data
            toast.success('Data submitted as draft!');

        } catch (err) {
            console.log(err.response ? err.response.data : err);
            toast.error('Submission failed');
        }

    };
    const getModelNameById = (id) => {
        const model = models.find((item) => item._id === id);
        return model ? model.name : 'Unknown Model';
    };

    const getTrimNameById = (id) => {
        const trim = trims.find((item) => item._id === id);
        return trim ? trim.name : 'Unknown Trim';
    };

    const getBodyTypeNameById = (id) => {
        const bodyType = bodyTypes.find((item) => item._id === id);
        return bodyType ? bodyType.name : 'Unknown Body Type';
    };

    const getRegionalSpecNameById = (id) => {
        const spec = regionalSpecs.find((item) => item._id === id);
        return spec ? spec.name : 'Unknown Spec';
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    // Handle file selection and upload
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const jwtToken = localStorage.getItem("jwt");

        const newImages = [];

        for (const file of files) {
            const previewUrl = URL.createObjectURL(file);
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch("https://syrizzle.vyominfotech.in/api/upload-image", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                    body: formData,
                });

                if (!response.ok) throw new Error("Upload failed");

                const result = await response.json();
                const uploadedPath = result.data.result;

                newImages.push({
                    file,
                    url: previewUrl,
                    image: uploadedPath,
                });

            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        const imagePaths = newImages.map((img) => img.image);

        // Set preview images
        setImages((prev) => [...prev, ...newImages]);

        // Update payload.images
        setPayload((prev) => ({
            ...prev,
            images: [...(prev.images || []), ...imagePaths],
        }));
    };





    // Remove an image
    const handleRemoveImage = (indexToRemove) => {
        // 1. Remove from `images` preview
        const newImagePreviews = images.filter((_, idx) => idx !== indexToRemove);
        setImages(newImagePreviews);

        // 2. Remove from `payload.images` as well
        setPayload((prev) => {
            const newPaths = (prev.images || []).filter((_, idx) => idx !== indexToRemove);
            return { ...prev, images: newPaths };
        });
    };


    return (
        <div className="min-h-screen bg-white flex justify-center items-center p-4">
            {!formSubmitted ? (
                <div className="w-full max-w-md space-y-4">

                    {/* Centered Logo */}
                    <div className="flex justify-center text-3xl font-bold mb-8">
                        <span className="text-black">dub</span>
                        <span className="text-red-600 relative">
                            izzle
                            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl font-semibold text-center">Tell us about your car</h2>

                    <div className="flex items-center text-sm space-x-1 mb-6">
                        <Link to={"/place-an-ad/taxonomy/motors/"} className="text-blue-600 hover:text-red-700 font-medium">
                            Motors
                        </Link>
                        <FaAngleRight className="text-gray-500 text-xs" />
                        <span className="text-gray-800 font-medium">Cars</span>
                    </div>

                    <div className="bg-gray-100 p-3 text-sm text-gray-700 rounded">
                        <strong>Selling more than one car?</strong>
                        <div>
                            Save with our business packages!{' '}
                            <a href="#" className="text-blue-500 underline">
                                Learn More
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmi} className="space-y-3">
                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={emirate}
                            onChange={(e) => setEmirate(e.target.value)}
                        >
                            <option value="">Emirate*</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Ras ai Khaimah">Ras ai Khaimah</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Fujairah">Fujairah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Umm ai Quwain">Umm ai Quwain</option>
                            <option value="Ai Ain">Ai Ain</option>
                        </select>

                        {/* Model Dropdown */}
                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={selectedModelId}
                            onChange={handleModelChange}  // Call the API when model is selected
                        >
                            <option value="">Make & Model*</option>
                            {models.map((model) => (
                                <option key={model._id} value={model._id}>
                                    {model.name}
                                </option>
                            ))}
                        </select>
                        {/* Trim Dropdown */}
                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={selectedTrimId}
                            onChange={(e) => setSelectedTrimId(e.target.value)}
                        >
                            <option value="">Trim*</option>
                            {trims.map((trim) => (
                                <option key={trim._id} value={trim._id}>
                                    {trim.name}
                                </option>
                            ))}
                        </select>





                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={selectedSpecId}
                            onChange={(e) => setSelectedSpecId(e.target.value)}
                        >
                            <option value="">Select Spec*</option>
                            {regionalSpecs.map((spec) => (
                                <option key={spec._id} value={spec._id}>
                                    {spec.name}
                                </option>
                            ))}
                        </select>


                        <div className="max-w-md mx-auto  bg-white rounded-lg shadow overflow-visible">

                            <select
                                className="w-full border p-2 rounded"
                                required
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            >
                                <option value="">Select Year</option>
                                {/* Add year options */}
                                {Array.from({ length: 25 }, (_, i) => 2001 + i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <input
                            type="number"
                            placeholder="Kilometers*"
                            className="w-full border p-2 rounded"
                            required
                            value={kilometers}
                            onChange={(e) => setKilometers(e.target.value)}
                        />
                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={bodyType}
                            onChange={(e) => {
                                const selectedBodyTypeId = e.target.value;  // Get the ID instead of name
                                setBodyType(selectedBodyTypeId);  // Store the ID in state
                            }}
                        >
                            <option value="">Body Type* - Select</option>
                            {Array.isArray(bodyTypes) &&
                                bodyTypes.map((type) => (
                                    <option key={type._id} value={type._id}>  {/* Set the value to type._id */}
                                        {type.name}  {/* Display the name */}
                                    </option>
                                ))}
                        </select>


                        {/* Insured dropdown */}
                        <select
                            className="w-full border p-2 rounded"
                            required
                            value={carInsured}
                            onChange={(e) => setCarInsured(e.target.value)}
                        >
                            <option>Is your car insured in UAE?</option>
                            <option value="yes"> Yes </option>
                            <option value="no"> No </option>
                        </select>

                        {/* Price input */}
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Price*"
                                className="w-full border p-2 pr-12 rounded"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                                AED
                            </span>
                        </div>

                        {/* Phone input */}
                        <input
                            type="tel"
                            placeholder="Phone number*"
                            className="w-full border p-2 rounded"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                        >
                            Next
                        </button>
                    </form>

                    <div className="text-center text-xs text-gray-600">
                        Questions? Call{' '}
                        <a href="tel:800Dubizzle" className="text-blue-500">
                            800 Dubizzle
                        </a>
                    </div>
                </div>) : (

                <div className="min-h-screen bg-white flex justify-center items-center p-4">
                    <div className="w-full max-w-md space-y-4">
                        <form onSubmit={handleSubmit}>
                            {/* Centered Logo */}
                            <div className="flex justify-center text-3xl font-bold mb-8">
                                <span className="text-black">dub</span>
                                <span className="text-red-600 relative">
                                    izzle
                                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
                                </span>
                            </div>

                            {responseData && (
                                <div className="mt-4 p-4 border rounded-md" style={{ backgroundColor: "rgb(246, 247, 248)" }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl" style={{ color: 'rgb(66, 70, 72)' }}>Listing Summary</h2>
                                        <button style={{ color: "rgb(224, 0, 0)", fontSize: "20px" }}>Edit</button>
                                    </div>

                                    <br />
                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Make & Model</span>
                                        <span className="font-semibold">{getModelNameById(responseData.model_id)}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Trim</span>
                                        <span className="font-semibold">{getTrimNameById(responseData.trim_id)}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Regional Spec</span>
                                        <span className="font-semibold">{getRegionalSpecNameById(responseData.regional_spec_id)}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Year</span>
                                        <span className="font-semibold">{responseData.year}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Kilometers</span>
                                        <span className="font-semibold">{responseData.kilometer}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Body Type</span>
                                        <span className="font-semibold">{getBodyTypeNameById(responseData.body_type_id)}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Price</span>
                                        <span className="font-semibold">₹{responseData.price}</span>
                                    </div>

                                    <div style={{ display: 'flex', gap: '25px', marginBottom: '8px', alignItems: "self-start" }}>
                                        <span style={{ width: "150px" }}>Mobile</span>
                                        <span className="font-semibold">{responseData.mobile}</span>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 max-w-md mx-auto">
                                {/* Image Upload */}
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


                                {/* Title */}
                                <input
                                    type="text"
                                    placeholder="Title *"
                                    className="w-full border border-black rounded-md px-4 py-3 placeholder-gray-500 focus:outline-none"
                                    value={payload.title}
                                    onChange={(e) => setPayload({ ...payload, title: e.target.value })}
                                />

                                {/* 360 Tour URL */}
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="360 Tour URL"
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 pr-24 placeholder-gray-500 focus:outline-none"
                                        value={payload.tour_360}
                                        onChange={(e) => setPayload({ ...payload, tour_360: e.target.value })}
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 italic">*Optional</span>
                                </div>

                                {/* Description */}
                                <div className="relative">
                                    <textarea
                                        placeholder="Describe your car *"
                                        rows="6"
                                        className="w-full border border-gray-300 rounded-md p-4 placeholder-gray-500 resize-none focus:outline-none"
                                        value={payload.description}
                                        onChange={(e) => setPayload({ ...payload, description: e.target.value })}
                                    />
                                    <span className="absolute bottom-2 right-4 text-sm text-gray-500">0/16000</span>
                                </div>

                                {/* Fuel Type */}
                                <div className="w-full">
                                    <label className="block text-sm text-blue-700 font-medium mb-1">
                                        Fuel Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="w-full border border-gray-400 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        value={payload.fuel_type}
                                        onChange={(e) => setPayload({ ...payload, fuel_type: e.target.value })}
                                    >
                                        <option value="" disabled hidden>Select Fuel Type</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="Electric">Electric</option>
                                    </select>
                                </div>

                                {/* Exterior Color */}
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={payload.exterior_color_id}
                                    onChange={(e) => setPayload({ ...payload, exterior_color_id: e.target.value })}
                                >
                                    <option value="" disabled hidden>Exterior Color *</option>
                                    {Array.isArray(colors) && colors.map((color, index) => (
                                        <option key={index} value={color._id} >
                                            {color.name}
                                        </option>
                                    ))}
                                </select>


                                {/* Interior Color */}
                                <div className="w-full max-w-md">
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={payload.interior_color_id}
                                        onChange={(e) => setPayload({ ...payload, interior_color_id: e.target.value })}
                                    >
                                        <option value="" disabled hidden>Interior Color *</option>
                                        {Array.isArray(InteriorColor) && InteriorColor.map((color, index) => (
                                            <option key={index} value={color._id}>
                                                {color.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Warranty */}
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                    value={payload.warranty}
                                    onChange={(e) => setPayload({ ...payload, warranty: e.target.value })}
                                >
                                    <option value="" disabled selected hidden>Warranty *</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                    <option value="Does not apply">Does not apply</option>
                                </select>

                                {/* Doors */}
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                    value={payload.doors}
                                    onChange={(e) => setPayload({ ...payload, doors: e.target.value })}
                                >
                                    <option value="" disabled selected hidden>Doors *</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>

                                {/* Transmission Type */}
                                <div className="w-full max-w-md">
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                        value={payload.transmission_type_id}
                                        onChange={(e) => setPayload({ ...payload, transmission_type_id: e.target.value })}
                                    >
                                        <option value="" disabled hidden>Transmission Type *</option>
                                        {Array.isArray(transmissions) && transmissions.map((item, index) => (
                                            <option key={index} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Seating Capacity */}
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                    value={payload.seating_capacity}
                                    onChange={(e) => setPayload({ ...payload, seating_capacity: e.target.value })}
                                >
                                    <option value="" disabled selected hidden>Seating Capacity (Optional)</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="7">7</option>
                                </select>

                                {/* Horsepower */}
                                <div className="w-full max-w-md">
                                    <select
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                        value={payload.horsepower_id}
                                        onChange={(e) => setPayload({ ...payload, horsepower_id: e.target.value })}
                                    >
                                        <option value="" disabled hidden>Horsepower *</option>
                                        {Array.isArray(horsepowerList) && horsepowerList.map((item, index) => (
                                            <option key={index} value={item._id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Steering Side */}
                                <select
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:outline-none"
                                    value={payload.steering_side}
                                    onChange={(e) => setPayload({ ...payload, steering_side: e.target.value })}
                                >
                                    <option value="" disabled selected hidden>Steering Side *</option>
                                    <option value="Left Hand">Left Hand</option>
                                    <option value="Right Hand">Right Hand</option>
                                </select>


                                <div className="border rounded-md p-4 w-full max-w-md shadow-sm">
                                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                                        <h2 className="font-medium text-gray-800">Technical Features</h2>
                                        {features.length > 5 && (
                                            <button
                                                onClick={() => setShowAll((prev) => !prev)}
                                                className="text-red-600 text-sm font-semibold"
                                            >
                                                {showAll ? "Show Less ▲" : "Show All ▼"}
                                            </button>
                                        )}
                                    </div>

                                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                                    {/* <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {displayedFeatures.map((feature) => (
                                            <label key={feature._id} className="inline-flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={feature._id}
                                                    checked={selectedFeatures.includes(feature._id)} // Use selectedFeatures for checkbox state
                                                    onChange={(e) => {
                                                        const updated = e.target.checked
                                                            ? [...selectedFeatures, feature._id]
                                                            : selectedFeatures.filter((id) => id !== feature._id);

                                                        setSelectedFeatures(updated);

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            transmission_type_id: updated, // Store as array
                                                        }));

                                                        setPayload((prev) => ({
                                                            ...prev,
                                                            transmission_type_id: updated, // ✅ Fix: this was incorrectly set to `features` earlier
                                                        }));

                                                        if (updated.length > 0) {
                                                            setError('');
                                                        }
                                                    }}

                                                    className="form-checkbox h-4 w-4 text-red-600"
                                                />
                                                <span className="text-gray-700 text-sm">{feature.name}</span>
                                            </label>
                                        ))}
                                    </div> */}

                                </div>


                                {/* <div className="border rounded-md p-4 w-full max-w-md shadow-sm">
                                    <div className="flex justify-between items-center border-b pb-2 mb-2">
                                        <h2 className="font-medium text-gray-800">Technical Features</h2>
                                        {extras.length > 5 && (
                                            <button
                                                onClick={() => setShowAllExtras((prev) => !prev)}
                                                className="text-red-600 text-sm font-semibold"
                                            >
                                                {showAllExtras ? "Show Less ▲" : "Show All ▼"}
                                            </button>
                                        )}
                                    </div>

                                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {displayedExtras.map((extra) => (
                                            <label key={extra._id} className="inline-flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    value={extra._id}
                                                    checked={selectedExtras.includes(extra._id)}
                                                    onChange={() => handleChangeExtra(extra._id)}
                                                    className="form-checkbox h-4 w-4 text-red-600"
                                                />
                                                <span className="text-gray-700 text-sm">{extra.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div> */}
                                {/* Submit Button */}
                                <button type="submit" className="w-full py-3 mt-8 text-white bg-red-600 rounded-md">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                </div>

            )}
            <ToastContainer position="top-right" autoClose={2000} />

        </div>

    );
};

export default CarCategorys;


