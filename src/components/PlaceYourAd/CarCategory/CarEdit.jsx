import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const CarEdit = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const motorId = queryParams.get('_id');
    const token = localStorage.getItem('jwt');
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

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        emirate: '',
        selectedModelId: '',
        selectedTrimId: '',
        selectedSpecId: '',
        year: '',
        kilometers: '',
        bodyType: '',
        carInsured: '',
        price: '',
        phone: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt'); // Get JWT from localStorage
        if (!token) {
            console.error('No JWT found');
            return;
        }

        if (motorId) {
            axios.post(
                `https://syrizzle.vyominfotech.in/api/add-motor/${motorId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
                .then(response => {
                    const carData = response.data.data.result;
                    setEmirate(carData.emirate || '');
                    setSelectedModelId(carData.model_id || '');
                    setSelectedTrimId(carData.trim_id || '');
                    setSelectedSpecId(carData.regional_spec_id || '');
                    setYear(carData.year || '');
                    setKilometers(carData.kilometer || '');
                    setBodyType(carData.body_type_id || '');
                    setCarInsured(carData.car_insured || '');
                    setPrice(carData.price || '');
                    setPhone(carData.mobile || '');
                })
                .catch(err => console.error("Error fetching car data:", err));
        }
    }, [motorId]);

    const handleModelChange = (e) => {
        const modelId = e.target.value;
        setSelectedModelId(modelId);
        // Fetch trims or specs based on modelId
        // Example: fetch trims for selected model
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('jwt');
        if (!token) {
            console.error('No JWT found');
            return;
        }

        axios.put(
            `https://syrizzle.vyominfotech.in/api/update-motor/${motorId}`,
            {
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
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then(response => {
                console.log('Car data updated:', response.data);
                // Handle success (e.g., redirect to another page)
            })
            .catch(err => console.error('Error updating car data:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
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

            console.log("ok", response.data.data.result);

            setResponseData(response.data.data.result);
            setFormSubmitted(true); // Switch to next screen
            // Store response data
            toast.success('Data submitted as draft!');

        } catch (err) {
            toast.error('Submission failed');
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="w-full max-w-md space-y-4">
                <div className="flex justify-center text-3xl font-bold mb-8">
                    <span className="text-black">dub</span>
                    <span className="text-red-600 relative">
                        izzle
                        <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
                    </span>
                </div>

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

                    <select
                        className="w-full border p-2 rounded"
                        required
                        value={selectedModelId}
                        onChange={handleModelChange}
                    >
                        <option value="">Make & Model*</option>
                        {models.map((model) => (
                            <option key={model._id} value={model._id}>
                                {model.name}
                            </option>
                        ))}
                    </select>

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

                    <select
                        className="w-full border p-2 rounded"
                        required
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="">Select Year</option>
                        {Array.from({ length: 25 }, (_, i) => 2001 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

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
                        onChange={(e) => setBodyType(e.target.value)}
                    >
                        <option value="">Body Type*</option>
                        {bodyTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                                {type.name}
                            </option>
                        ))}
                    </select>

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

                    <input
                        type="number"
                        placeholder="Price*"
                        className="w-full border p-2 pr-12 rounded"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

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
                        <ToastContainer position="top-right" autoClose={3000} />

        </div>
    );
};

export default CarEdit;
