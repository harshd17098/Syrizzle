import React, { useEffect, useState } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CarCategorys = () => {
    const [emirate, setEmirate] = useState("");
    const [emirat, setEmirat] = useState("");

    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState("");
    const [trims, setTrims] = useState([]);
    const [selectedTrimId, setSelectedTrimId] = useState("");
    const [regionalSpecs, setRegionalSpecs] = useState([]); // Store the regional specs here
    const [specData, setSpecData] = useState([]); // Store fetched spec data
    const [selectedSpecId, setSelectedSpecId] = useState('');
    const [bodyTypes, setBodyTypes] = useState([]);
    const [year, setYear] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [carInsured, setCarInsured] = useState('');
    const [price, setPrice] = useState('');
    const [phone, setPhone] = useState('');
const [motorId, setMotorId] = useState(null);

    const token = localStorage.getItem("jwt");

    // Fetch all models
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


        console.log("hhyyy");

        axios
            .get("https://syrizzle.vyominfotech.in/api/regional-spec", {
                headers: { Authorization: `Bearer ${token}` },
            })

            .then((res) => {
                // console.log("Regional Spec Response:",); // ✅ Now res is defined
                setRegionalSpecs(res.data.data.result);
            })
            .catch((err) => console.error("Regional Spec Fetch Error:", err));

    }, [emirat, token]); // ✅ Correct dependencies

    useEffect(() => {
        const fetchBodyTypes = async () => {
            const token = localStorage.getItem("jwt");

            try {
                const response = await axios.get("https://syrizzle.vyominfotech.in/api/body-type", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // ✅ Correctly access the result array
                const result = response.data?.data?.result;

                if (Array.isArray(result)) {
                    setBodyTypes(result);
                } else {
                    // console.error("Unexpected response format", response.data);
                }
            } catch (error) {
                console.error("Failed to fetch body types:", error);
            }
        };

        fetchBodyTypes();
    }, []);


    useEffect(() => {
        const savedMotorId = localStorage.getItem("motorId");
        if (savedMotorId) {
            setMotorId(savedMotorId);
        }
    }, []);

    // Model change handler
    const handleModelChange = async (e) => {
    const modelId = e.target.value;
    setSelectedModelId(modelId);

    if (!modelId) return;

    try {
        const payload = {
            emirate,
            model_id: modelId,
        };

        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error("Token missing. Please log in again.");
            return;
        }

        const res = await axios.post(
            "https://syrizzle.vyominfotech.in/api/add-motor",
            payload,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const createdMotorId = res.data.data.result._id;
        console.log(createdMotorId);
        
        if (createdMotorId) {
            setMotorId(createdMotorId); // only use React state
        }

        toast.success("Model selected and data saved successfully!");
    } catch (error) {
        console.error("Model Selection API Error:", error);
        toast.error("Something went wrong while selecting the model.");
    }
};


    // Submit handler
    const handleSubmi = async (e) => {
    e.preventDefault();

    if (!motorId) {
        toast.error("Motor ID not found. Please select a model first.");
        return;
    }

    const payload = {
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
        const token = localStorage.getItem('jwt');
        if (!token) {
            toast.error("Token missing. Please log in again.");
            return;
        }

        const apiUrl = `https://syrizzle.vyominfotech.in/api/add-motor/${motorId}`;

        console.log("API URL: ", apiUrl);
        console.log("Payload: ", payload);

        const response = await axios.post(apiUrl, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("API Response:", response);
        toast.success('Data submitted as draft!');

        // Optional: reset state after submit
        setMotorId(null);
    } catch (err) {
        toast.error('Submission failed');
        console.error("Error:", err);
    }
};


    return (
        <div className="min-h-screen bg-white flex justify-center items-center p-4">
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
            </div>
            <ToastContainer position="top-right" autoClose={2000} />

        </div>

    );
};

export default CarCategorys;
