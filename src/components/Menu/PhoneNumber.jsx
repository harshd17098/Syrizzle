import { useState, useEffect } from "react";
import axios from "axios";
import MyProfile from "./MyProfile";

function PhoneNumber() {
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);

    // Validate phone number
    useEffect(() => {
        const phoneValid = phone.length === 10; // Adjust validation criteria if needed
        setIsValid(phoneValid);
    }, [phone]);

    // Handle phone number submission to request OTP
    const handleSubmit = async () => {
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            alert("User not logged in");
            return;
        }

        try {
            const response = await axios.post(
                "https://syrizzle.vyominfotech.in/api/change-mobile",
                { mobile: phone },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            console.log("OTP Sent", response.data);
            setShowOtpInput(true); // Show OTP input form
        } catch (error) {
            console.error("Failed to send OTP", error);
            alert("Failed to send OTP");
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const jwtToken = localStorage.getItem("jwt");

        try {
            const response = await axios.post(
                "https://syrizzle.vyominfotech.in/api/verify-mobile",
                {
                    mobile: phone,
                    otp: otp,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            console.log("OTP Verification Success", response.data);
            alert("Phone number verified!");
            setShowOtpInput(false); // Hide OTP input after successful verification
        } catch (error) {
            console.error("OTP verification failed", error);
            alert("Incorrect OTP");
        }
    };

    return (
        <div className="flex w-full">
            <div style={{ width: "25%" }}>
                <MyProfile />
            </div>
        <div className="bg-gray-100 p-4 rounded-md relative w-[55%]">
            <div className="text-sm font-medium mb-1">Primary phone</div>

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

            <button
                disabled={!isValid}
                onClick={handleSubmit}
                className={`mt-4 w-full px-4 py-2 rounded text-sm ${isValid ? "bg-black text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
            >
                Add Number
            </button>

            {/* Show OTP Input */}
            {showOtpInput && (
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm mb-2"
                    />
                    <button
                        onClick={handleVerifyOtp}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded text-sm"
                    >
                        Verify OTP
                    </button>
                </div>
            )}

            {/* Close Icon */}
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                ✕
            </button>
        </div>
        </div>
    );
}

export default PhoneNumber;
