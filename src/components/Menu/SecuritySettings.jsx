import React, { useEffect, useState } from 'react';
import MyProfile from "./MyProfile";
import { BiSolidPencil } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
import ChangePassword from './ChangePassword';
import { XIcon } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";
import { FiShield } from "react-icons/fi"; // Feather Icons
import { HiShieldExclamation } from "react-icons/hi"; // Heroicons (bold)
import { IoIosLaptop } from "react-icons/io";
import API_BASE_URL from '../../api/api';

const SecuritySettings = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Only if returned by API
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);
    const [isSending, setIsSending] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [createdAt, setCreatedAt] = useState(null);
    const [isCurrentDevice, setIsCurrentDevice] = useState(false);
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [country, setCountry] = useState(''); // New state for country

    const handleClose = () => {
        setIsModalVisible(false); // Close the modal
    };
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("jwt");
            if (!token) {
                console.error("JWT not found.");
                return;
            }

            try {
                const res = await fetch(`${API_BASE_URL}/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                console.log(data.data.result);

                if (data.data.result) {
                    setEmail(data.data.result.email || '');
                    setPassword('********'); // No need to show real password
                    setCreatedAt(data.data.result.createdAt);
                    setCountry(data.data.result.country || ''); // Set country if available

                } else {
                    console.error("Failed to load profile:", data.message || data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const formattedDate = createdAt
        ? new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
        : "";
    const handleAccountDeactivate = async () => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            toast.error("User not authenticated.", { position: "top-center" });
            return;
        }

        try {
            // Include the 'deleted' field in the request payload
            const response = await axios.post(
                `${API_BASE_URL}/account-deactive`,
                { deleted: true }, // Send deleted: true to the backend
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.deleted);

            if (response.data.success) {
                toast.success("Account deactivated successfully.", { position: "top-center" });

                // Get the deactivation time from the response
                const deactivatedAt = response.data.deletedAt;
                console.log("Account deactivated at:", deactivatedAt);

                // Remove the token and redirect the user (if needed)
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
                window.location.href = "/";
            } else {
                const errorMsg = response.data.error?.error_message || "Failed to deactivate account.";
                toast.error(errorMsg, { position: "top-center" });
            }
        } catch (error) {
            console.error("Deactivation error:", error);
            const errorMsg =
                error.response?.data?.error?.error_message ||
                "An unexpected error occurred. Please try again later.";
            toast.error(errorMsg, { position: "top-center" });
        }
    };
    const handleResendEmail = async () => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            toast.error("User not authenticated.", { position: "top-center" });
            return;
        }

        if (cooldownTime > 0) {
            toast.warn("Please wait before requesting again.", {
                position: "top-center",
            });
            return;
        }

        setIsSending(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/change-password`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("✅ Response:", response.data);

            toast.success("Password reset email sent successfully!", {
                position: "top-center",
            });

            // 🔒 Close the popup after success
            closePopup();
        } catch (error) {
            console.error("❌ Email send error:", error);

            const errorMessage =
                error.response?.data?.error?.error_message ||
                error.response?.data?.message ||
                "Something went wrong.";

            if (
                errorMessage.toLowerCase().includes("exceeded the number of tries") ||
                errorMessage.toLowerCase().includes("try again")
            ) {
                setCooldownTime(900); // 15 minutes
            }

            toast.error(errorMessage, { position: "top-center" });
        } finally {
            setIsSending(false);
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        axios
            .get(`${API_BASE_URL}/login-device`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const devices = res?.data?.data?.result || [];

                // Find the device whose token matches the local token
                const currentDevice = devices.find((device) => device.token === token);


                if (res.data?.success === true && currentDevice) {
                    setDeviceInfo(currentDevice);
                }
            })
            .catch((err) => {
                console.error("Device check error:", err?.response || err.message);
            });
    }, []);

    useEffect(() => {
        if (cooldownTime > 0) {
            const timer = setInterval(() => {
                setCooldownTime((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [cooldownTime])

    return (
        <div className="flex w-full">
            {/* Sidebar - 25% */}
            <div style={{ width: "25%" }}>
                <MyProfile />
            </div>
            <div className="max-w-xl p-6 w-[55%]">
                <h2 className="text-2xl font-bold mb-6">Security</h2>
                <hr />
                <br />
                <br />
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password || '********'}
                                disabled
                                className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 pr-10"
                            />
                            <span
                                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                onClick={openPopup}
                            >
                                <BiSolidPencil style={{ fontSize: "20px" }} />
                            </span>
                            {isPopupOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 text-center relative">
                                        <button
                                            onClick={closePopup}
                                            className="absolute top-4 right-4 text-gray-500 text-xl hover:text-black"
                                        >
                                            &times;
                                        </button>

                                        <div className="flex justify-center mb-4">
                                            <div className="bg-blue-100 p-3 " style={{ borderRadius: "20px" }}>
                                                <div className="rounded-full  flex items-center justify-center" style={{ width: "40px", height: "40px", backgroundColor: "transparent" }}>
                                                    <MdEmail className="text-blue-600" style={{ fontSize: "28px" }} />
                                                </div>

                                            </div>
                                        </div>

                                        <h2 className="text-xl font-semibold mb-3">An email is on the way</h2>

                                        <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
                                            It seems that you have exceeded the number of tries. Try again in 15 minutes.
                                        </div>

                                        <div className="text-sm text-gray-700 mb-2">14:45 seconds</div>

                                        <p className="text-sm text-gray-700 mb-4">
                                            To change your password, please confirm your identity by clicking the verification link we've sent to your email.
                                        </p>

                                        <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mb-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 6a9 9 0 100 18 9 9 0 000-18z" />
                                            </svg>
                                            Please note that the link expires after 1 hour
                                        </p>

                                        <p className="text-sm text-gray-700 mb-2">
                                            Didn’t receive? Check your spam/junk.
                                            <br />
                                            Otherwise click below.
                                        </p>
                                        <div>

                                            <button
                                                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                                onClick={handleResendEmail}
                                                disabled={isSending || cooldownTime > 0}
                                            >
                                                {isSending ? "Sending..." : "Resend Email"}
                                            </button>
                                            {cooldownTime > 0 && (
                                                <p className="text-sm text-red-500 mt-2">
                                                    Please wait {Math.floor(cooldownTime / 60)}:
                                                    {(cooldownTime % 60).toString().padStart(2, "0")} before retrying.
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-4">
                                            <a
                                                href="/hc/en-us/requests/new"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 font-medium hover:underline"
                                            >
                                                Contact Customer Support.
                                            </a>

                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

                    <div>
                        <button onClick={() => window.confirm("Are you sure you want to delete your account? This action cannot be undone.") && handleAccountDeactivate()} className="flex items-center gap-2 bg-white-600 text-graye px-4 py-2 rounded hover:bg-gray-700 hover:text-white">
                            <MdOutlineDelete />
                            <span>Deactivate Your Account</span>
                        </button>

                    </div>





                    <div className="">


                        {showModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                                    {/* Close Icon */}
                                    <button
                                        className="absolute top-4 right-4 text-gray-500 hover:text-black"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <XIcon size={20} />
                                    </button>

                                    <h2 className="text-xl mb-4 flex items-center gap-2" style={{ color: "rgba(0, 0, 0, 0.87)" }}>
                                        <HiShieldExclamation size={20} />  Secure your account
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-6">
                                        If you don’t recognize your device, protect your account by resetting your password.
                                        This will log you out of all other devices for added security.
                                    </p>
                                    <hr />
                                    <br />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        >
                                            Close
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                openPopup();
                                            }}
                                            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 flex items-center gap-1"
                                        >
                                            Update Password <IoIosArrowForward />
                                        </button>


                                    </div>
                                </div>
                            </div>
                        )}
                    </div>





                    <hr className="my-6" />

                    <div>
                        <div>
                            <h3 className="font-medium mb-2">Your devices</h3>

                        </div>
                        <div className="flex items-center justify-between gap-4 mb-5">
                            <p className="text-sm text-gray-600 mb-0">If you don’t recognize any devices below</p>
                            <button className="px-4 py-2 text-sm bg-gray-100 border rounded hover:bg-gray-200" onClick={() => setShowModal(true)}>
                                Secure your account
                            </button>
                        </div>

                        <div className="flex items-center justify-between  ">
                            <div>
                                <div>
                                    {deviceInfo && (
                                        <p className="font-medium text-sm flex gap-2">
                                            <IoIosLaptop style={{ fontSize: "20px" }} />
                                            {`${deviceInfo.user_agent.split("(")[0].trim()} from ${deviceInfo.device_name} (This Device)`}
                                        </p>
                                    )}
                                </div>

                                <p className="text-xs text-gray-500" style={{ marginLeft: "28px" }}>
                                    {country || "Country not available"}
                                </p>

                            </div>
                            <div>
                                {createdAt && (
                                    <div className="text-xs text-gray-500">Added on {formattedDate}</div>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecuritySettings;
