import { useState, useEffect, useRef } from "react";
import axios from "axios";
import MyProfile from "./MyProfile";
import API_BASE_URL from "../../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Plus, X } from "lucide-react";

function PhoneNumber() {
    const [countryCode, setCountryCode] = useState("+91");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [showPhoneBox, setShowPhoneBox] = useState(false); // toggle form
    const phoneBoxRef = useRef(null);

    useEffect(() => {
        const phoneValid = phone.length === 10;
        setIsValid(phoneValid);
    }, [phone]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (showPhoneBox && phoneBoxRef.current && !phoneBoxRef.current.contains(event.target)) {
                setShowPhoneBox(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPhoneBox]);

    const handleSubmit = async () => {
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            toast.error("User not logged in");
            return;
        }

        try {
            const response = await axios.post(
                `${API_BASE_URL}/change-mobile`,
                { mobile: phone },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            console.log("OTP Sent", response.data);
            toast.success("OTP sent successfully");
            setShowOtpInput(true);
        } catch (error) {
            console.error("Failed to send OTP", error);
            toast.error("Failed to send OTP");
        }
    };

    const handleVerifyOtp = async () => {
        const jwtToken = localStorage.getItem("jwt");

        try {
            const response = await axios.post(
                `${API_BASE_URL}/verify-mobile`,
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
            toast.success(`Phone number ${countryCode}${phone} has been successfully verified`);
            setShowOtpInput(false);
            setPhone("");
            setOtp("");
            setShowPhoneBox(false); // Close the phone box after verification
        } catch (error) {
            console.error("OTP verification failed", error);
            toast.error("Incorrect OTP");
        }
    };

    return (
        <div className="flex w-full">
            <div style={{ width: "25%" }}>
                <MyProfile />
            </div>

            <div className="flex flex-col items-start w-[75%] p-4" style={{marginTop:'70px'}}>
                <div>
                    <h2 style={{fontWeight:"700",fontSize:"24px"}}>Phone numbers</h2>
                    <p style={{width:"570px"}}>To ensure safety, it is beneficial to have your number added. You will receive an SMS with the authentication code on your phone to be able to link your phone with your account.</p>
                </div>
                <br />
                {!showPhoneBox ? (
                    <button
                        onClick={() => setShowPhoneBox(true)}
                        className="flex items-center gap-2 text-black text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                    >
                        <Plus size={16} /> Add Primary Phone
                    </button>
                ) : (
                    <div ref={phoneBoxRef} className="bg-gray-100 p-4 rounded-md relative w-[55%] m-[20px]">
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
                            className={`mt-4 w-full px-4 py-2 rounded text-sm ${isValid
                                    ? "bg-black text-white"
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                }`}
                        >
                            Add Number
                        </button>

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

                        <button
                            onClick={() => setShowPhoneBox(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}
            </div>


            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
}

export default PhoneNumber;
