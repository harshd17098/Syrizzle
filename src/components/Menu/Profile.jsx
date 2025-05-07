import MyProfile from "./MyProfile";
import React, { useEffect, useState } from "react";
import axios from 'axios';


const Profile = () => {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        country: "",
        date_of_birth: "",
        image: ""
    });

    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const formatDateToInput = (isoDate) => {
        if (!isoDate) return "";
        return new Date(isoDate).toISOString().split("T")[0];
    };

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            console.warn("No JWT token in localStorage.");
            return;
        }

        setToken(jwtToken);

        // Fetch profile data
        axios
            .get("https://syrizzle.vyominfotech.in/api/profile", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                const data = response.data?.data?.result;
                if (data) {
                    setProfile({
                        ...data,
                        date_of_birth: formatDateToInput(data.date_of_birth),
                    });
                }
                console.log(data);

            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });

        // Fetch profile image
        axios
            .post("https://syrizzle.vyominfotech.in/api/profile-image", {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                if (response.data?.imageUrl) {
                    setProfileImage(response.data.imageUrl);
                } else {
                    console.warn("No imageUrl found in response.");
                }
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    console.warn("Profile image not found (404).");
                } else {
                    console.error("Error fetching profile image:", error);
                }
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        const jwtToken = localStorage.getItem("jwt");

        if (!jwtToken) {
            console.warn("No JWT token in localStorage.");
            return;
        }
        try {
            // Submit profile info
            await axios.post(
                "https://syrizzle.vyominfotech.in/api/profile",
                profile,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Submit image if selected
            if (selectedFile) {
                const formData = new FormData();
                formData.append("image", selectedFile);

                await axios.post(
                    "https://syrizzle.vyominfotech.in/api/profile-image",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <>
            <div className="flex w-full">
                {/* Sidebar - 25% */}
                <div style={{ width: "25%" }}>
                    <MyProfile />
                </div>

                {/* Main Content - 75% */}
                <div className="w-[55%] p-6">
                    <h1 className="text-2xl font-bold mb-1">My Profile</h1>
                    <p className="text-gray-500 mb-6">Update your profile details here</p>

                    {/* Profile Card */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex items-center space-x-4">
                            <input
                                type="file"
                                onChange={handleFileChange} // Handle file selection
                                className="hidden" // Hide the default file input
                                id="file-input"
                            />
                            <label htmlFor="file-input" className="cursor-pointer">
                                <img
                                    src={
                                        profile.image
                                            ? `https://syrizzle.vyominfotech.in${profile.image}`
                                            : "https://via.placeholder.com/100"
                                    } alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                /> </label>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    {profile.first_name} {profile.last_name}
                                </h2>
                                <p className="text-gray-500">
                                    Joined on{" "}
                                    {new Date(profile.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Verified Badge */}
                        <div className="bg-blue-50 p-4 mt-6 rounded-lg flex items-center justify-between">
                            {/* Left side: image + text */}
                            <div className="flex items-center gap-4">
                                <img
                                    src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/verified-badge-new-blue.svg"
                                    alt=""
                                    className="w-12 h-12"
                                />
                                <div>
                                    <p className="font-medium mb-1">Got a verified badge yet?</p>
                                    <div className="text-sm text-gray-600">
                                        Get more visibility & enhance your credibility
                                    </div>
                                </div>
                            </div>

                            {/* Right side: button */}
                            <button className="bg-white border px-4 py-2 rounded hover:bg-gray-100">
                                Get Started
                            </button>
                        </div>

                    </div>

                    {/* Form Fields */}
                    <div className="mt-6">
                        <div className="flex items-start gap-6 mb-6">
                            {/* Label section */}
                            <div className="w-1/4">
                                <div className="text-sm font-semibold mb-1">Profile Name</div>
                                <p className="text-sm text-gray-500">This is displayed on your profile</p>
                            </div>

                            {/* Input fields section */}
                            <div className="w-3/4 flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={profile.first_name}
                                        className="w-full border rounded px-3 py-2"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={profile.last_name}
                                        className="w-full border rounded px-3 py-2"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Account Details Section */}
                        <div className="border-t my-6"></div>

                        <div className="mb-2 text-sm font-semibold">Account details</div>
                        <p className="text-sm text-gray-500 mb-6">This is not visible to other users</p>

                        {/* Date of Birth */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="w-1/4 text-sm font-medium flex items-center gap-2">
                                <span>📅</span> Date of birth
                            </label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={profile.date_of_birth ? profile.date_of_birth.split('T')[0] : ""}
                                onChange={handleInputChange}
                                className="border rounded px-3 py-2"
                            />
                        </div>


                        {/* Nationality */}
                        <div className="flex items-start gap-4 mb-4">
                            <label className="w-1/4 text-sm font-medium flex items-center gap-2">
                                <span>🌐</span> Nationality
                            </label>
                            <div className="w-3/4">
                                <select
                                    name="country"
                                    value={profile.country}
                                    onChange={handleInputChange}
                                    className="w-full border rounded px-3 py-2 text-black"
                                >
                                    <option value="India">India</option>
                                    {/* Add more countries dynamically if needed */}
                                </select>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="flex items-start gap-4 mb-6">
                            <label className="w-1/4 text-sm font-medium flex items-center gap-2">
                                <span>👤</span> Gender
                            </label>
                            <div className="w-3/4 flex flex-col gap-2">
                                <div className="flex items-center gap-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={profile.gender === "male"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Male
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={profile.gender === "female"}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Female
                                    </label>
                                </div>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="prefer_not_to_say"
                                        checked={profile.gender === "prefer_not_to_say"}
                                        onChange={handleInputChange}
                                        className="mr-2"
                                    />
                                    Prefer not to say
                                </label>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="text-right">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </>
    )
}
export default Profile;