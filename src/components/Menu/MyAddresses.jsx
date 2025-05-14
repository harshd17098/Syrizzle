import MyProfile from "./MyProfile";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoLocation } from "react-icons/io5";
import API_BASE_URL from '../../api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const MyAddresses = () => {
    const [showForm, setShowForm] = useState(false);
    const [addressData, setAddressData] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

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

    const handleEdit = (address) => {
        setSelectedAddressId(address._id);
        setFormData({
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

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) return alert('User not authenticated');

            const endpoint = selectedAddressId
                ? `https://syrizzle.vyominfotech.in/api/address/update/${selectedAddressId}`
                : 'https://syrizzle.vyominfotech.in/api/address/add';

            const method = selectedAddressId ? 'post' : 'post';

            const response = await axios[method](endpoint, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success(`Address ${selectedAddressId ? 'updated' : 'saved'} successfully!`);
            setShowForm(false);
            setSelectedAddressId(null);
            fetchAddresses(); // Refresh list
        } catch (error) {
            console.error('Failed to save address:', error);
            toast.error('Failed to save address');
        }
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
            } else {
                console.warn("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    };

    const handleDelete = async (addressId) => {
        const token = localStorage.getItem("jwt");
        if (!token) return alert("User not authenticated");

        try {
            const endpoint = `https://syrizzle.vyominfotech.in/api/address/delete/${addressId}`;
            const response = await axios.delete(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const status = response.data?.status;
            console.log("Full delete response:", response.data);

            if (status === true) {
                toast.success("Address deleted successfully!");
                await fetchAddresses(); // Re-fetch to update UI
            } else {
                toast.warn("Delete failed - Unexpected response");
            }
        } catch (error) {
            console.error("Failed to delete address:", error);
            const errorMsg = error.response?.data?.message || error.message;
            toast.error(`Delete failed: ${errorMsg}`);
        }
    };

    useEffect(() => {
        fetchAddresses();
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
                    {/* <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                        + Add A Location
                    </button> */}
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

                    <div className="max-w-md mx-auto space-y-4" >
                        {addressData.length > 0 ? (
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        setFormData({
                                            neighbourhood: '',
                                            building: '',
                                            apartment: '',
                                            custom_label: 'work',
                                            address_type: 1,
                                            isDefault: 0,
                                            latitude: '',
                                            longitude: '',
                                        });
                                        setSelectedAddressId(null);
                                        setShowForm(true);
                                    }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Add New Address
                                </button>

                                <div className="p-4">
                                    {addressData.map((addr) => (
                                        <div
                                            key={addr._id}
                                            className="border p-4 rounded shadow-sm flex justify-between items-start mb-4"
                                        >
                                            <div>
                                                <div className="flex items-center font-semibold">
                                                    <IoLocation className="mr-1" />
                                                    {addr.custom_label}
                                                </div>

                                                <p className="text-sm text-gray-600">
                                                    {[addr.apartment, addr.building, addr.neighbourhood].filter(Boolean).join(", ")}
                                                </p>

                                                <div className="mt-2">
                                                    <button
                                                        className="border border-blue-600 text-blue-600 text-sm px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-105 mr-2"
                                                        onClick={() => handleEdit(addr)} // assuming handleEdit exists
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="border border-red-600 text-red-600 text-sm px-3 py-1 rounded transition-all duration-300 hover:bg-red-600 hover:text-white hover:scale-105"
                                                        onClick={() => handleDelete(addr._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            {addr.isDefault === 1 && (
                                                <span className="text-xs px-2 py-1 bg-black text-white rounded">
                                                    Default
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {showForm && (
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
                                            onClick={(e) => e.stopPropagation()} // ⛔ Stop click from bubbling out
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
                                                value={formData.neighbourhood}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="building"
                                                placeholder="Building"
                                                value={formData.building}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="apartment"
                                                placeholder="Apartment"
                                                value={formData.apartment}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />
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
                                                {[
                                                    { label: 'Other', type: 3 },
                                                    { label: 'Home', type: 2 },
                                                    { label: 'Work', type: 1 }
                                                ].map(({ label, type }) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleLabel(label.toLowerCase(), type)}
                                                        className={`px-3 py-1 border rounded ${formData.address_type === type ? 'bg-blue-100' : ''}`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>

                                            <label className="inline-flex items-center mb-4">
                                                <input
                                                    type="checkbox"
                                                    name="isDefault"
                                                    checked={formData.isDefault === 1}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                Set as default
                                            </label>

                                            <button
                                                onClick={handleSubmit}
                                                className="bg-blue-600 text-white w-full py-2 rounded"
                                            >
                                                {selectedAddressId ? 'Update Address' : 'Save Address'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>
                        ) : (
                            <div className="border rounded px-4 py-2 flex justify-between items-center">
                                <div
                                    className=" rounded px-4 py-2 flex justify-between items-center cursor-pointer"
                                    onClick={() => setShowForm(true)}
                                >
                                    <span className="font-medium text-black-600">+ Home Address</span>

                                </div>


                            </div>
                        )}


                        <div className="border rounded px-4 py-2 flex justify-between items-center">
                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        setFormData({
                                            neighbourhood: '',
                                            building: '',
                                            apartment: '',
                                            custom_label: 'work',
                                            address_type: 1,
                                            isDefault: 0,
                                            latitude: '',
                                            longitude: '',
                                        });
                                        setSelectedAddressId(null);
                                        setShowForm(true);
                                    }}
                                    className="px-4 py-2 text-black rounded"
                                >
                                    + Work Address
                                </button>

                                {showForm && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style={{ marginTop: "0px" }}
                                        onClick={() => {
                                            setShowForm(false);
                                            setSelectedAddressId(null);
                                        }}
                                    >
                                        <div
                                            className="bg-white p-6 rounded-lg w-full max-w-md relative"
                                            onClick={(e) => e.stopPropagation()} // 🛑 Stop clicks from closing modal
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
                                                value={formData.neighbourhood}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="building"
                                                placeholder="Building"
                                                value={formData.building}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-2"
                                            />
                                            <input
                                                type="text"
                                                name="apartment"
                                                placeholder="Apartment"
                                                value={formData.apartment}
                                                onChange={handleChange}
                                                className="border w-full p-2 rounded mb-4"
                                            />
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
                                                {[
                                                    { label: 'Other', type: 3 },
                                                    { label: 'Home', type: 2 },
                                                    { label: 'Work', type: 1 }
                                                ].map(({ label, type }) => (
                                                    <button
                                                        key={type}
                                                        onClick={() => handleLabel(label.toLowerCase(), type)}
                                                        className={`px-3 py-1 border rounded ${formData.address_type === type ? 'bg-blue-100' : ''}`}
                                                    >
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>

                                            <label className="inline-flex items-center mb-4">
                                                <input
                                                    type="checkbox"
                                                    name="isDefault"
                                                    checked={formData.isDefault === 1}
                                                    onChange={handleChange}
                                                    className="mr-2"
                                                />
                                                Set as default
                                            </label>

                                            <button
                                                onClick={handleSubmit}
                                                className="bg-blue-600 text-white w-full py-2 rounded"
                                            >
                                                {selectedAddressId ? 'Update Address' : 'Save Address'}
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
