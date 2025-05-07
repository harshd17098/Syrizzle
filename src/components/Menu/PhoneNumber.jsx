import React, { useState } from "react";
import MyProfile from "./MyProfile";
import axios from 'axios';
const PhoneNumber = () => {
    const [countryCode, setCountryCode] = useState("+971");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState(null);

    const isValid = phone.length >= 10;
    const handleSubmit = async () => {
        const token = localStorage.getItem('jwt');  // Retrieve JWT from localStorage

        if (!token) {
            setError('User not authenticated. Please log in.');
            return;
        }

        // Prepare request headers with Authorization header
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const data = {
            mobile: phone,  // Mobile number to be updated
        };

        try {
            const response = await axios.post('https://syrizzle.vyominfotech.in/api/change-mobile', data, { headers });
            // console.log(response);
            

            if (response.status === 200) {
                alert('Mobile number updated successfully!');
            } else {
                setError('Failed to update mobile number.');
            }
        } catch (error) {
            setError('An error occurred while updating the mobile number.');
            console.error('Error:', error);
        }
    };
    return (
        <>
            <div className="flex w-full">

                <div style={{ width: "25%" }}>
                    <MyProfile />
                </div>
                <div className=" mt-10 w-[55%] p-6">
                    <h2 className="text-xl font-bold mb-2">Phone numbers</h2>
                    <p className="text-gray-600 mb-4">
                        To ensure safety, it is beneficial to have your number added. You will
                        receive an SMS with the authentication code on your phone to be able to
                        link your phone with your account.
                    </p>

                    <div className="bg-gray-100 p-4 rounded-md relative">
                        <div className="text-sm font-medium mb-1">Primary phone</div>

                        {/* Input Wrapper */}
                        <div className="flex items-center justify-center w-full">
                            <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden w-full max-w-md">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="bg-white px-3 py-2 text-sm focus:outline-none border-r border-gray-300 h-full"
                                >
                                    <option value="+971">+971</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+91">+91</option>
                                </select>
                                <input
                                    type="tel"
                                    placeholder="9XXXXXXXXX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 px-3 py-2 text-sm focus:outline-none"
                                />
                            </div>
                        </div>


                        {/* Add Number Button */}
                        <button
                            disabled={!isValid}
                            onClick={handleSubmit}

                            className={`mt-4 w-full px-4 py-2 rounded text-sm ${isValid
                                ? "bg-black text-white"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Add Number
                        </button>

                        {/* Close Icon */}
                        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                            ✕
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
};

export default PhoneNumber;
