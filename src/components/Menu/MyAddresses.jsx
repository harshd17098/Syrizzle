import MyProfile from "./MyProfile";
import { useEffect, useState } from "react";
import axios from "axios";
const MyAddresses = () => {
    const [showForm, setShowForm] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [showFor, setShowFor] = useState(false);
    
    const [formData, setFormData] = useState({
        neighbourhood: '',
        building: '',
        apartment: '',
        custom_label: 'work',
        address_type: 1,
        isDefault: 0,
        latitude: '',
        longitude: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const handleLabel = (label, type) => {
        setFormData((prev) => ({
            ...prev,
            custom_label: label,
            address_type: type,
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) return alert('User not authenticated');

            const response = await axios.post(
                'https://syrizzle.vyominfotech.in/api/address/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert('Address saved successfully!');
            setShowForm(false);
        } catch (error) {
            console.error('Failed to save address:', error);
            alert('Failed to save address');
        }
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");

        if (jwtToken) {
            axios
                .get("https://syrizzle.vyominfotech.in/api/address", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then((response) => {
                    console.log("Address response:", response.data);

                    if (response.data.success && Array.isArray(response.data.data.result)) {
                        setAddressData(response.data.data.result);
                    } else {
                        console.warn("Unexpected response format:", response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching address:", error);
                });
        } else {
            console.log("No JWT token found in localStorage.");
        }
    }, []);
    return (
        <div className="flex w-full">
            <div style={{ width: "25%" }}>
                <MyProfile />
            </div>
            <main className="flex-1 p-10 w-[55%] ">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold">Addresses</h2>
                        <p className="text-gray-500 text-sm">Manage your saved addresses</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        + Add A Location
                    </button>
                </div>

                {/* Empty State */}
                <div className="text-center mt-10">
                    <p className="text-lg font-medium">You have no saved addresses</p>
                    <p className="text-gray-500 mt-1 mb-6">
                        Saved addresses helps us improve your selling and buying experience
                    </p>
                    <div className="flex justify-center mb-8">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                            alt="map icon"
                            className="w-24 h-24"
                        />
                    </div>

                    <div className="max-w-md mx-auto space-y-4">
                        {addressData.length > 0 ? (
                            <div className="space-y-4">
                                {addressData.map((addr, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gray-50 border rounded-lg p-4 shadow-sm flex justify-between items-start"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2 mb-1 font-semibold text-gray-800">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-gray-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17.657 16.657L13.414 12.414a4 4 0 10-5.656 0l-4.243 4.243a6 6 0 108.485 8.485l4.243-4.243z"
                                                    />
                                                </svg>
                                                {addr.custom_label || "Address"}
                                            </div>
                                            <p className="text-gray-600 mb-4">
                                                {[addr.apartment, addr.building, addr.neighbourhood].filter(Boolean).join(", ")}
                                            </p>
                                            <div className="flex gap-2">
                                                <button className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100" onClick={() => setShowFor(true)}>
                                                    Edit
                                                </button>
                                                {showFor && (
                                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                                                            <button
                                                                className="absolute top-2 right-2 text-gray-500"
                                                                onClick={() => setShowFor(false)}
                                                            >
                                                                ✕
                                                            </button>

                                                            <h2 className="text-xl font-semibold mb-4">Edit Default Address</h2>

                                                            <input
                                                                type="text"
                                                                name="neighbourhood"
                                                                placeholder="Neighbourhood"
                                                                value={formData.neighbourhood}
                                                                onChange={handleChange}
                                                                className="border w-full p-2 rounded mb-2"
                                                                required
                                                            />
                                                            <input
                                                                type="text"
                                                                name="building"
                                                                placeholder="Building or Street name"
                                                                value={formData.building}
                                                                onChange={handleChange}
                                                                className="border w-full p-2 rounded mb-2"
                                                            />
                                                            <input
                                                                type="text"
                                                                name="apartment"
                                                                placeholder="Apartment or Villa number"
                                                                value={formData.apartment}
                                                                onChange={handleChange}
                                                                className="border w-full p-2 rounded mb-4"
                                                            />

                                                            {/* Map Placeholder */}
                                                            <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center">
                                                                <span className="text-gray-500">Map Placeholder</span>
                                                            </div>

                                                            <input
                                                                type="number"
                                                                name="latitude"
                                                                placeholder="Latitude"
                                                                value={formData.latitude}
                                                                onChange={handleChange}
                                                                className="border w-full p-2 rounded mb-2"
                                                            />
                                                            <input
                                                                type="number"
                                                                name="longitude"
                                                                placeholder="Longitude"
                                                                value={formData.longitude}
                                                                onChange={handleChange}
                                                                className="border w-full p-2 rounded mb-4"
                                                            />

                                                            <div className="mb-2 font-medium">Label this address:</div>
                                                            <div className="flex space-x-2 mb-4">
                                                                <button
                                                                    onClick={() => handleLabel('other', 3)}
                                                                    className={`px-3 py-1 border rounded ${formData.address_type === 3 ? 'bg-blue-100' : ''}`}
                                                                >
                                                                    Other
                                                                </button>
                                                                <button
                                                                    onClick={() => handleLabel('home', 2)}
                                                                    className={`px-3 py-1 border rounded ${formData.address_type === 2 ? 'bg-blue-100' : ''}`}
                                                                >
                                                                    Home
                                                                </button>
                                                                <button
                                                                    onClick={() => handleLabel('work', 1)}
                                                                    className={`px-3 py-1 border rounded ${formData.address_type === 1 ? 'bg-blue-100' : ''}`}
                                                                >
                                                                    Work
                                                                </button>
                                                            </div>

                                                            <div className="mb-4">
                                                                <label className="inline-flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="isDefault"
                                                                        checked={formData.isDefault === 1}
                                                                        onChange={handleChange}
                                                                        className="form-checkbox mr-2"
                                                                    />
                                                                    Set as default
                                                                </label>
                                                            </div>

                                                            <button
                                                                onClick={handleSubmit}
                                                                className="bg-blue-600 text-white w-full py-2 rounded"
                                                            >
                                                                Save Address
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    className="px-4 py-1 border border-gray-300 rounded text-gray-400 cursor-not-allowed"
                                                    disabled
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {addr.isDefault === 1 && (
                                            <span className="bg-black text-white text-xs px-2 py-1 rounded-full self-start">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border rounded px-4 py-2 flex justify-between items-center">
                                <div
                                    className="border rounded px-4 py-2 flex justify-between items-center cursor-pointer"
                                    onClick={() => setShowForm(true)}
                                >
                                    <span className="font-medium text-blue-600">+ Home Address</span>

                                </div>

                                {/* Overlay Form Modal */}
                                {showForm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                                            <button
                                                className="absolute top-2 right-2 text-gray-500"
                                                onClick={() => setShowForm(false)}
                                            >
                                                ✕
                                            </button>

                                            <h2 className="text-xl font-semibold mb-4">Location Details</h2>

                                            <input
                                                type="text"
                                                name="neighbourhood"
                                                placeholder="Neighbourhood"
                                                value={formData.neighbourhood}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="building"
                                                placeholder="Building or Street name"
                                                value={formData.building}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="apartment"
                                                placeholder="Apartment or Villa number"
                                                value={formData.apartment}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />

                                            {/* Map Placeholder */}
                                            <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center">
                                                <span className="text-gray-500">Map Placeholder</span>
                                            </div>

                                            <input
                                                type="number"
                                                name="latitude"
                                                placeholder="Latitude"
                                                value={formData.latitude}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="number"
                                                name="longitude"
                                                placeholder="Longitude"
                                                value={formData.longitude}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />

                                            <div className="mb-2 font-medium">Label this address:</div>
                                            <div className="flex space-x-2 mb-4">
                                                <button
                                                    onClick={() => handleLabel('other', 3)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 3 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Other
                                                </button>
                                                <button
                                                    onClick={() => handleLabel('home', 2)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 2 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Home
                                                </button>
                                                <button
                                                    onClick={() => handleLabel('work', 1)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 1 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Work
                                                </button>
                                            </div>

                                            <div className="mb-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="isDefault"
                                                        checked={formData.isDefault === 1}
                                                        onChange={handleChange}
                                                        className="form-checkbox mr-2"
                                                    />
                                                    Set as default
                                                </label>
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                className="bg-blue-600 text-white w-full py-2 rounded"
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}


                        <div className="border rounded px-4 py-2 flex justify-between items-center">
                            <div className="border rounded px-4 py-2 flex justify-between items-center">
                                <div
                                    className="border rounded px-4 py-2 flex justify-between items-center cursor-pointer"
                                    onClick={() => setShowForm(true)}
                                >
                                    <span className="font-medium text-blue-600">+ Work Address</span>

                                </div>

                                {/* Overlay Form Modal */}
                                {showForm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                        <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                                            <button
                                                className="absolute top-2 right-2 text-gray-500"
                                                onClick={() => setShowForm(false)}
                                            >
                                                ✕
                                            </button>

                                            <h2 className="text-xl font-semibold mb-4">Location Details</h2>

                                            <input
                                                type="text"
                                                name="neighbourhood"
                                                placeholder="Neighbourhood"
                                                value={formData.neighbourhood}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="building"
                                                placeholder="Building or Street name"
                                                value={formData.building}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="apartment"
                                                placeholder="Apartment or Villa number"
                                                value={formData.apartment}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />

                                            {/* Map Placeholder */}
                                            <div className="bg-gray-100 h-40 rounded mb-4 flex items-center justify-center">
                                                <span className="text-gray-500">Map Placeholder</span>
                                            </div>

                                            <input
                                                type="number"
                                                name="latitude"
                                                placeholder="Latitude"
                                                value={formData.latitude}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="number"
                                                name="longitude"
                                                placeholder="Longitude"
                                                value={formData.longitude}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />

                                            <div className="mb-2 font-medium">Label this address:</div>
                                            <div className="flex space-x-2 mb-4">
                                                <button
                                                    onClick={() => handleLabel('other', 3)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 3 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Other
                                                </button>
                                                <button
                                                    onClick={() => handleLabel('home', 2)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 2 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Home
                                                </button>
                                                <button
                                                    onClick={() => handleLabel('work', 1)}
                                                    className={`px-3 py-1 border rounded ${formData.address_type === 1 ? 'bg-blue-100' : ''}`}
                                                >
                                                    Work
                                                </button>
                                            </div>

                                            <div className="mb-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        name="isDefault"
                                                        checked={formData.isDefault === 1}
                                                        onChange={handleChange}
                                                        className="form-checkbox mr-2"
                                                    />
                                                    Set as default
                                                </label>
                                            </div>

                                            <button
                                                onClick={handleSubmit}
                                                className="bg-blue-600 text-white w-full py-2 rounded"
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Trigger Button */}

        </div>
    );
};

export default MyAddresses;
