import MyProfile from "./MyProfile";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import API_BASE_URL from '../../api/api';
import { toast } from "react-toastify";


const Profile = () => {
    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        gender: "",
        country: "",
        date_of_birth: "",
        image: ""
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [avatarUrls, setAvatarUrls] = useState([]);

    const [token, setToken] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);




    const [activeTab, setActiveTab] = useState("computer")
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
            .get(`${API_BASE_URL}/profile`, {
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
                // console.log(data);

            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }, []);

    useEffect(() => {
        const updateProfileImage = async () => {
            if (profile && profile.image || avatarUrls.image) {
                try {
                    console.log("Profile image updated: ", profile.image);

                } catch (error) {
                    console.error("Error handling updated profile image:", error);
                }
            }
        };

        updateProfileImage();
        setIsModalVisible(false);

    }, [profile.image, avatarUrls.image]); // This will trigger the effect whenever the profile image changes




    useEffect(() => {
        const fetchAvatars = async () => {
            const jwtToken = localStorage.getItem("jwt");
            if (!jwtToken) return;

            try {
                const response = await axios.get("https://syrizzle.vyominfotech.in/api/avatar", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                console.log("avatar respones", response);


                // Map image path to full URL

                const avatars = response.data.data.result.map((item) => ({
                    image: item.image,
                }));
                console.log("avatars", avatars);
                // console.log("hhhh");
                setAvatarUrls(avatars);

            } catch (err) {
                console.error("Failed to fetch avatars:", err);
            }
        };

        if (activeTab === "avatar") {
            fetchAvatars();
        }
    }, [activeTab]);

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
            const updatedProfile = {
                ...profile,
                image: selectedAvatar || profile.image, // Ensure selectedAvatar is part of the profile
                country: profile.country || '' // Include the country in the updated profile
            };
            console.log(updatedProfile); // Check the updated profile object before sending it to the backend

            // Submit updated profile info (including avatar) first
            await axios.post(
                `${API_BASE_URL}/profile`,
                updatedProfile,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );

            // If a new image is selected, upload it to the profile-image API
            if (selectedFile) {
                const formData = new FormData();
                formData.append("image", selectedFile);

                const response = await axios.post(
                    `${API_BASE_URL}/profile-image`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                            "Content-Type": "multipart/form-data", // necessary for file upload
                        },
                    }
                );

                // Get the actual image URL from the backend response
                console.log("hyy");

                const uploadedImageUrl = response.data.data.result.image; // Assuming the backend returns the image URL like { imageUrl: 'https://.../image.jpg' }
                console.log("hhhh", response.data.data.result.image);

                // Update the profile with the new image URL
                setProfile((prev) => ({
                    ...prev,
                    image: uploadedImageUrl || selectedAvatar, // Update profile image with new image URL
                }));

                useEffect(() => {
                    setSelectedAvatar(uploadedImageUrl || selectedAvatar);
                    setIsModalVisible(false);
                }, [])
            }

            setIsModalVisible(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.response) {
                toast.error(`Failed to update profile "Please try again."}`);
            } 
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
                            <div className="relative inline-block">
                                <div className="relative p-10">
                                    {/* Profile Image + Edit Button */}
                                    <div className="relative inline-block">
                                        <img
                                            src={
                                                selectedAvatar
                                                    ? selectedAvatar
                                                    : profile.image
                                                        ? `https://syrizzle.vyominfotech.in${profile.image}`
                                                        : 'https://via.placeholder.com/100'
                                            }
                                            alt="Profile"
                                            className="w-20 h-20 rounded-full object-cover relative"
                                        />
                                        <div
                                            onClick={() => setIsModalVisible(true)}
                                            className="w-7 h-7 rounded-full absolute bg-gray-700 flex items-center justify-center shadow-md hover:bg-gray-800 cursor-pointer"
                                            style={{ left: '60px', top: '45px', zIndex: '22' }}
                                        >
                                            <FaPen className="text-white text-sm" />
                                        </div>
                                    </div>

                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-input"
                                    />

                                    {/* Modal */}
                                    {isModalVisible && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
                                                {/* Modal Header */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <h2 className="text-lg font-semibold">Update profile picture</h2>
                                                    <button onClick={() => setIsModalVisible(false)} className="text-gray-500 hover:text-gray-700">
                                                        &times;
                                                    </button>
                                                </div>

                                                {/* Preview Image */}
                                                <div className="flex justify-center items-center">
                                                    <img
                                                        src={
                                                            selectedAvatar
                                                                ? selectedAvatar
                                                                : profile.image
                                                                    ? `https://syrizzle.vyominfotech.in${profile.image}`
                                                                    : 'https://via.placeholder.com/100'
                                                        }
                                                        alt="Profile"
                                                        className="w-20 h-20 rounded-full object-cover"
                                                    />
                                                </div>

                                                {/* Tabs */}
                                                <div className="flex border-b mb-4 mt-4">
                                                    <div
                                                        onClick={() => setActiveTab("computer")}
                                                        className={`w-1/2 text-center py-2 border-b-2 font-semibold cursor-pointer ${activeTab === "computer" ? "border-red-600 text-black" : "border-transparent text-gray-400"}`}
                                                    >
                                                        From Computer
                                                    </div>
                                                    <div
                                                        onClick={() => setActiveTab("avatar")}
                                                        className={`w-1/2 text-center py-2 border-b-2 font-semibold cursor-pointer ${activeTab === "avatar" ? "border-red-600 text-black" : "border-transparent text-gray-400"}`}
                                                    >
                                                        Avatars
                                                    </div>
                                                </div>

                                                {/* Tab Content */}
                                                {activeTab === "computer" && (
                                                    <div className="flex flex-col items-center border border-dashed border-gray-300 p-6 text-center rounded-md">
                                                        <div className="bg-red-100 p-3 rounded-full mb-2">
                                                            <FaUpload className="text-red-500 text-xl" />
                                                        </div>
                                                        <p className="mb-2">Drag and drop</p>
                                                        <p className="text-gray-500 mb-4">— OR —</p>

                                                        <label htmlFor="file-input" className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer">
                                                            Upload
                                                        </label>
                                                        <input id="file-input" type="file" className="hidden" />
                                                        <p className="text-gray-400 text-xs mt-2">Image will be resized to 140 x 140</p>
                                                    </div>
                                                )}

                                                {activeTab === "avatar" && (
                                                    <div className="grid grid-cols-4 gap-4 mt-4">

                                                        {
                                                            avatarUrls.map((avatar) => {
                                                                console.log("av", avatar);

                                                                return (
                                                                    <div
                                                                        key={avatar.id}
                                                                        onClick={() => setSelectedAvatar(avatar.image)}
                                                                        className={`border rounded-md p-1 cursor-pointer transition-all ${selectedAvatar === avatar.image
                                                                            ? "border-black ring-2 ring-red-500"
                                                                            : "hover:border-black"
                                                                            }`}
                                                                    >
                                                                        <img
                                                                            src={`https://syrizzle.vyominfotech.in${avatar.image}`}
                                                                            alt="Avatar"
                                                                            className="w-full h-auto rounded"
                                                                        />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        {/* <img
                                                            src={avatar}
                                                            alt="Avatar"
                                                            className="w-full h-auto rounded"
                                                        /> */}
                                                    </div>
                                                )}

                                                {/* Submit Button */}
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={!selectedFile && !selectedAvatar}
                                                    className={`mt-4 w-full py-2 rounded text-white ${selectedFile || selectedAvatar ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                                >
                                                    Save Profile Picture
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* <label htmlFor="file-input" className="cursor-pointer">
                                <img
                                    src={
                                        profile.image
                                            ? `https://syrizzle.vyominfotech.in${profile.image}`
                                            : "https://via.placeholder.com/100"
                                    } alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover relative"
                                /> </label> */}
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
                                    <option value="">---Selected one</option>
                                    <option value="India">India</option>
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