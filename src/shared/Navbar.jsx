import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-for-dark.svg";
import notification from "../assets/notificaion.svg";
import search from "../assets/search.svg";
import favorite from "../assets/favorite.svg";
import chat from "../assets/chat.svg";
import MyAds from "../assets/myads.svg"
import home from "../assets/icons/home.svg";
import homeSearch from "../assets/icons/home-search.svg";
import pluse from "../assets/icons/pluse.svg";
import message from "../assets/icons/message.svg";
import profile from "../assets/icons/profile.svg";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import JoinUs from "../components/JoinUS/JoinUs";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SignUp from "../components/SignUp/SignUp";
import axios from 'axios';
import {
	LoginSocialGoogle,
	LoginSocialFacebook,
	LoginSocialApple,
} from 'reactjs-social-login';
import {
	GoogleLoginButton,
	FacebookLoginButton,
	AppleLoginButton,
} from 'react-social-login-buttons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md"; // Red email icon
import ForgotPasswordModal from "../components/ForgotPassword/ForgotPasswordModal"
import AdPostCity from "../components/PlaceYourAd/City/AdPostCity";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLocation } from 'react-router-dom';



const CITIES = [
	"All Cities (UAE)",
	"Dubai",
	"Abu Dhabi",
	"Ras al Khaimah",
	"Sharjah",
	"Fujairah",
	"Ajman",
	"Umm al Quwain",
	"Al Ain",
];
const images = [
	"https://static.dubizzle.com/static_assets/call.svg",
	"https://static.dubizzle.com/static_assets/favoritead.svg",
	"https://static.dubizzle.com/static_assets/paa.svg",
];
const titles = [
	"Log in to call the seller",
	"Log in to favorite an ad",
	"Log in to post an ad",
];

export default function Navbar({ onClose }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedCity, setSelectedCity] = useState(CITIES[0]);
	const [openModal, setOpenModal] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [user, setUser] = useState(null);
	const [showSignUp, setShowSignUp] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [profile, setProfile] = useState({
		first_name: "",
		last_name: "",
		gender: "",
		country: "",
		date_of_birth: "",
		image: ""
	});
	const [openStaticModal, setOpenStaticModal] = useState(false);
	const navigate = useNavigate();
	const [image, setImage] = useState(null);
	const dropdownRef = useRef(null);
	const [emailLoginVisible, setEmailLoginVisible] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginTriggered, setLoginTriggered] = useState(false);
	const [isAdPostVisible, setIsAdPostVisible] = useState(false);
	const users = JSON.parse(localStorage.getItem("user"));
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false); // Add this at the top of your component
	const location = useLocation();

	const isActive = location.pathname === '/mylistings/';

	useEffect(() => {
		const fetchProfileImage = async () => {
			const token = localStorage.getItem("jwt");
			if (!token) return;

			try {
				const res = await axios.get("https://syrizzle.vyominfotech.in/api/profile", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				setImage(res.data.data.result);


			} catch (err) {
				console.error("Failed to fetch profile image", err);
			}
		};

		fetchProfileImage();
	}, [image]);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}

	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);


	const handleSocialLogin = async (googleData) => {
		try {
			console.log("Google Data:", googleData);

			const payload = {
				login_type: "google",
				idToken: googleData.credential, // This is the ID Token from Google One Tap
				device_name: "web"
			};

			const response = await axios.post("https://syrizzle.vyominfotech.in/api/login", payload);
			console.log("Login success", response.data);
		} catch (error) {
			console.error("Google login failed:", error.response?.data || error.message);
		}
	};





	const handleEmailLogin = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading before API call

		try {
			const response = await axios.post(
				'https://syrizzle.vyominfotech.in/api/login',
				{
					email,
					password,
					login_type: 'email',
					device_name: 'web',
				}
			);

			const result = response.data?.data?.token;
			console.log(response.data.data.token);


			// Optional null check
			if (!result || !result) {
				toast.warn('Login successful but no token found.', {
					position: 'top-center',
				});
				setLoading(false);
				return;
			}

			const jwt = result;
			localStorage.setItem('jwt', jwt);
			// console.log(jwt);

			const res = response.data.data.result
			const userData = {
				first_name: res.first_name,
				last_name: res.last_name,
				email: res.email,
			};

			localStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);

			// Clear form & close modal
			setEmail('');
			setPassword('');
			setEmailLoginVisible(false); // ✅ Close the email login modal
			toast.success("Loging success fully")
		} catch (error) {
			console.error('Email login failed:', error?.response || error);
			toast.error('Email login failed. Please check your credentials.', {
				position: 'top-center',
			});
		} finally {
			setLoading(false); // Always stop loading
		}
	};


	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	// Close dropdown on outside click


	const handleClick = () => {
		setIsAdPostVisible(true); // Show the AdPostCity when clicked
	};

	const handleCloseAdPost = () => {
		setIsAdPostVisible(false); // Hide the AdPostCity
	};
	const handleLogout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('jwt');
		setUser(null);
		navigate('/');
		toast.info('Logged out successfully', { position: 'top-center' });
	};


	function onCloseModal() {
		setOpenModal(false);
		setEmail("");
		setOpenStaticModal(false)
	}



	if (showSignUp) return <SignUp onClose={() => setShowSignUp(false)} />;


	return (
		<header >
			<JoinUs />
			<div className="lg:border-b lg:border-b-gray-500/10 dark:lg:border-b-gray-300/10">
				<nav className="flex justify-center lg:justify-between lg:items-center container ">
					<div className="group flex items-center bg-white px-4 py-1 rounded cursor-pointer min-w-[165px] relative">
						<div className="flex items-center space-x-3 py-3">
							{/* Logo or Site Name */}
							<div>
								<div style={{ border: "1px solid black", borderRadius: "25px" }}>
									<Link to={"/"}>
										<span style={{ width: "111px", height: "36px", color: "black", padding: "25px" }}>Syrizzle</span>
									</Link>
								</div>

							</div>

							{/* Theme Switcher */}
							{/* <div className="lg:hidden">
								<ThemeSwitcher />
							</div> */}

							{/* City Name Display */}
							<div className="text-sm hidden lg:flex items-center text-gray-900 dark:text-gray-200">
								<div className="flex items-center group cursor-pointer">
									<span className="mr-2 font-semibold text-[15px] text-[#000000] group-hover:text-[#e60000]">
										{selectedCity}
									</span>
									<span className="text-xs text-[#000000] group-hover:text-[#e60000]">
										<IoIosArrowDown className="text-[10px]" />
									</span>
								</div>
							</div>
						</div>


						{/* Dropdown on hover */}
						<div className="hidden group-hover:block absolute left-[90px] top-[48px] min-w-[190px] bg-white border border-gray-200 shadow-[0_4px_18px_0_#00000013] rounded-md z-10">
							{CITIES.map((city) => (
								<div
									
									className={`px-5 py-2.5 flex justify-between items-center text-[15px] cursor-pointer transition-colors duration-150 ${city === selectedCity
										? "bg-[#efefef] text-[#000000] font-semibold"
										: "text-[#222] hover:bg-[#f8f8f8]"
										}`}
									onClick={() => setSelectedCity(city)} // Update selected city
								>
									{city}
									{city === selectedCity && (
										<span className="text-[#e60000] text-base ml-2">✔</span>
									)}
								</div>
							))}
						</div>
					</div>





					<ul className="hidden lg:flex space-x-8 items-center ">
						{/* <ThemeSwitcher /> */}
						<li>
							<a className="flex flex-col items-center py-2 decoration-primary-500 " href="#">
								<img src={notification} style={{ fontSize: "18px" }} alt="" />
								<span className="text-gray-700" style={{ fontSize: "13px" }}>Notificaions</span>
							</a>
						</li>
						<li>
							<a className="flex flex-col items-center py-3 decoration-primary-500 " href="#">
								<img src={search} alt="" />
								<span className="text-gray-700" style={{ fontSize: "13px" }}>My Searches</span>
							</a>
						</li>
						<li>
							<a className="flex flex-col items-center py-3 decoration-primary-500 " href="#">
								<img src={favorite} alt="" />
								<span className="text-gray-700" style={{ fontSize: "13px" }}>Favorites</span>
							</a>
						</li>
						<li>
							<a className="flex flex-col items-center py-3 decoration-primary-500 " href="#">
								<img src={chat} alt="" />
								<span className="text-gray-700" style={{ fontSize: "13px" }}>Chats</span>
							</a>
						</li>
						<li>
							<a
								className={`flex flex-col items-center py-3 ${isActive ? 'text-black font-bold' : 'text-gray-700 font-normal'}`}

								href="/mylistings/"
							>
								<img
									src={MyAds}
									alt=""
									className={`${isActive ? 'text-black' : 'text-gray-700'} w-6 h-6`}
								/>
								<span style={{ fontSize: '13px' }}>My Ads</span>
							</a>
						</li>
						<li>
							<div className="relative px-2 py-6 text-[#2B2D2E] dark:text-gray-200 text-[14px]">
								<button
									onClick={toggleDropdown}
									className="flex items-center justify-between w-full"
								>
									{user ? (
										<>
											<div className="px-2 text-[#2B2D2E] dark:text-gray-200 text-[14px] flex items-center gap-2">
												{image ? (
													<img
														src={`https://syrizzle.vyominfotech.in${image.image}`}
														alt="Profile"
														height={20}
														width={20}
														style={{ backgroundColor: "gray", borderRadius: "50%" }}
													/>
												) : (
													<div
														style={{
															width: 40,
															height: 40,
															backgroundColor: "gray",
															borderRadius: "50%",
														}}
													/>
												)}
												<span>Hello, {user.first_name}</span>
											</div>

											<div className="relative inline-block text-left" ref={dropdownRef}>
												<svg
													onClick={toggleDropdown}
													className={`w-4 h-4 ml-2 transition-transform`}
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 9l-7 7-7-7"
													/>
												</svg>

												{isDropdownOpen && (
													<ul className="absolute left-[-125px] top-[25px] mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-10">
														<Link to="/settings/profile">
															<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
																My Profile
															</li>
														</Link>
														<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
															Option 2
														</li>
														<li>
															<button
																className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
																onClick={handleLogout}
																style={{ fontSize: "14px", backgroundColor: "white", color: "black" }}
															>
																Logout
															</button>
														</li>
													</ul>
												)}
											</div>
										</>
									) : (
										<div
											role="button"
											onClick={() => setOpenModal(true)}
											className="cursor-pointer px-2 py-6 text-[#2B2D2E] border-x border-transparent hover:border-[#EEF0F1] dark:text-gray-200 text-[14px] transition-colors duration-200"
										>
											Log in or sign up
										</div>
									)}
								</button>



							</div>

							<Modal show={openModal} onClose={onCloseModal} popup>
								<div
									className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]"
									onClick={onCloseModal} // Close when clicking backdrop
								>									<div
									className="relative bg-white rounded-lg shadow-lg p-4"
									style={{ width: "466px" }}
									onClick={(e) => e.stopPropagation()} // <-- prevents modal content clicks from closing it
								>										<ModalHeader
											style={{ position: "absolute", top: "5px", left: "390px", color: "gray" }}
										/>

										<ModalBody className="p-6 md:p-8">
											{/* Carousel */}
											<div className="relative mb-6 flex justify-center items-center">
												<button
													className="absolute left-0 text-white p-1 rounded-full"
													onClick={() =>
														setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
													}
												>
													<FaArrowLeft className="bg-white text-gray-400 rounded-full" />
												</button>

												<div className="flex flex-col items-center gap-4">
													<img
														src={images[activeIndex]}
														alt={`Slide ${activeIndex + 1}`}
														className="rounded-md h-[120px] w-[100px] object-contain"
													/>
													<div className="text-lg md:text-xl font-bold text-center">
														{titles[activeIndex]}
													</div>
												</div>

												<button
													className="absolute right-0 text-white p-1 rounded-full"
													onClick={() =>
														setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
													}
												>
													<FaArrowRight className="bg-white text-gray-400 rounded-full" />
												</button>
											</div>





											{/* Social Buttons */}
											<div className="flex flex-col items-center justify-center space-y-3  max-w-sm mx-auto">
												{/* Facebook */}
												<LoginSocialFacebook
													appId="YOUR_FACEBOOK_APP_ID"
													onResolve={({ data }) => handleSocialLogin('facebook', data)}
													onReject={(err) => console.log('Facebook login error', err)}
												>
													<button className="flex items-center w-full justify-center border rounded px-4 py-2 hover:bg-gray-100 transition">
														<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5 mr-2" />
														Continue with Facebook
													</button>
												</LoginSocialFacebook>

												{/* Google */}
												<LoginSocialGoogle
													client_id="YOUR_GOOGLE_CLIENT_ID"
													onResolve={({ data }) => handleSocialLogin('google', data)}
													onReject={(err) => console.log('Google login error', err)}
												>
													<button className="flex items-center w-full justify-center border rounded px-4 py-2 hover:bg-gray-100 transition">
														<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5 mr-2" />
														Continue with Google
													</button>
												</LoginSocialGoogle>

												{/* Apple */}
												<LoginSocialApple
													client_id="YOUR_APPLE_CLIENT_ID"
													scope="name email"
													redirect_uri="https://yourdomain.com"
													onResolve={({ data }) => handleSocialLogin('apple', data)}
													onReject={(err) => console.log('Apple login error', err)}
												>
													<button className="flex items-center w-full justify-center border rounded px-4 py-2 hover:bg-gray-100 transition">
														<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple" className="w-5 h-5 mr-2" />
														Continue with Apple
													</button>
												</LoginSocialApple>

												{/* Email */}
												<button
													type="button"
													onClick={() => {
														onCloseModal(); // Close main modal
														setEmailLoginVisible(true); // Open email login modal
													}}
													className="flex items-center  justify-center border rounded px-4 py-2 hover:bg-gray-100 transition"
												>
													<img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Mail_%28iOS%29.svg" alt="Email" className="w-5 h-5 mr-2" />
													Continue with Email
												</button>
											</div>



											{/* Create Account Prompt */}
											<div
												className="mt-6 p-3 rounded-md bg-red-50 hover:bg-red-100 transition cursor-pointer"
												onClick={() => setShowSignUp(true)}
											>
												<button className="text-red-600 font-semibold text-sm md:text-base w-full text-center">
													Don’t have an account? Create one
												</button>
											</div>

											{/* Terms and Privacy */}
											<p className="text-center text-xs text-gray-400 px-6 mt-3">
												By signing up I agree to the{' '}
												<a
													href="https://www.dubizzle.com/legalhub/terms/"
													className="text-blue-600"
													target="_blank"
													rel="noopener noreferrer"
												>
													Terms and Conditions
												</a>{' '}
												and{' '}
												<a
													href="https://www.dubizzle.com/legalhub/privacy/"
													className="text-blue-600"
													target="_blank"
													rel="noopener noreferrer"
												>
													Privacy Policy
												</a>
												.
											</p>
										</ModalBody>
									</div>
								</div>
							</Modal>
							<ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
							<Modal show={emailLoginVisible} onClose={() => setEmailLoginVisible(false)} popup>
								<div
									className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]"
									onClick={() => setEmailLoginVisible(false)} // ✅ Comment is now outside JSX, valid
								>
									<div
										className="relative bg-white rounded-lg shadow-lg p-4"
										style={{ width: "466px" }}
										onClick={(e) => e.stopPropagation()}
									>										<ModalHeader
											style={{ position: "absolute", top: "5px", left: "390px", color: "gray" }}
										/> <br />
										<h2 style={{ display: "flex", justifyContent: "center", fontSize: "25px" }}>Log in with your email</h2>
										<ModalBody className="p-6 md:p-8">
											<form onSubmit={handleEmailLogin} className="space-y-4 mb-4 w-full">
												<input
													type="email"
													placeholder="Email"
													className="border p-2 w-full rounded"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													required
												/>
												<div className="relative w-full">
													<input
														type={showPassword ? "text" : "password"}
														placeholder="Password"
														className="border p-2 w-full rounded pr-10"
														value={password}
														onChange={(e) => setPassword(e.target.value)}
														required
													/>
													<span
														className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-500"
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
													</span>
												</div>
												<button
													type="submit"
													className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
												>
													Login{loading && (
														<div className="text-center text-gray-600 mt-2">Please wait, logging in...</div>
													)}

												</button>
											</form>
											<div className="mt-6 p-3 rounded-md bg-red-50 hover:bg-red-100 transition cursor-pointer">
												<button
													onClick={() => {
														setEmailLoginVisible(false); // ✅ Close email login modal
														setIsModalOpen(true);        // ✅ Open forgot password modal
													}}
													className="text-red-600 font-semibold text-sm md:text-base w-full text-center"
												>
													Forgot Password?
												</button>

											</div>
										</ModalBody>
									</div>
								</div>
							</Modal>

						</li>

						<li>

							<div>
								{user ? (
									<Link to="/place-an-ad/pick-a-city/">
										<button className="btn text-sm">Place Your Ad</button>
									</Link>
								) : (

									<button className="btn text-sm" onClick={() => setOpenModal(true)}>
										Place Your Ad
									</button>
								)}

								{/* Conditionally render AdPostCity based on the isAdPostVisible state */}

							</div>

							<Modal show={openStaticModal} onClose={onCloseModal} popup>
								<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]">
									<div className="relative bg-white rounded-lg shadow-lg p-4" style={{ width: "466px" }}>
										<ModalHeader
											style={{ position: "absolute", top: "5px", left: "390px", color: "gray" }}
										/>

										<ModalBody style={{ padding: "30px", paddingTop: "28px" }}>
											{/* Static Image Section */}
											<div className="mb-6 flex flex-col items-center gap-4">
												<img
													src="https://static.dubizzle.com/static_assets/paa.svg"
													alt="Static Display"
													className="rounded-md h-[160px] w-[100px] object-cover"
												/>
												<div className="text-xl font-bold">Log in to post an ad</div>
											</div>

											{/* Buttons (same as before) */}
											<div className="flex flex-col items-center justify-center space-y-4">
												{[
													{
														id: "facebook",
														text: "Continue with Facebook",
														img: "https://static.dubizzle.com/frontend-web/static-resources/assets/auth-icons/fb-logo.png",
														className: "border-gray-600 text-blue-600",
													},
													{
														id: "google",
														text: "Continue with Google",
														img: "https://static.dubizzle.com/frontend-web/static-resources/assets/auth-icons/google-logo.png",
														className: "border-gray-400 text-gray-700",
													},
													{
														id: "apple",
														text: "Continue with Apple",
														img: "https://static.dubizzle.com/frontend-web/static-resources/assets/auth-icons/apple-logo.png",
														className: "border-gray-400 text-gray-700",
													},
													{
														id: "email",
														text: "Continue with Email",
														img: "https://static.dubizzle.com/frontend-web/static-resources/assets/auth-icons/email-logo.png",
														className: "border-gray-400 text-gray-700",
													},
												].map(({ id, text, img, className }) => (
													<button
														
														id={`popup_${id}_login_btn`}
														type="button"
														className={`w-72 flex border ${className} px-4 py-2 rounded-md transition duration-200 hover:border-gray-300`}
													>
														<img src={img} alt={`${id} logo`} className="w-6 h-6 mr-2" />
														{text}
													</button>
												))}

												<div
													className="mt-2 p-2 rounded-md"
													style={{ backgroundColor: "rgba(245, 89, 89, 0.06)", cursor: "pointer" }}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = "#fee2e2")
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = "rgba(245, 89, 89, 0.06)")
													}
												>
													<a
														type="button"
														id="popup_create_account_link"
														className="text-red-600 font-semibold text-sm md:text-base focus:outline-none"
													>
														Don’t have an account? Create one
													</a>
												</div>

												<p className="text-center text-xs text-gray-400 px-6">
													By signing up I agree to the{" "}
													<a
														href="https://www.dubizzle.com/legalhub/terms/"
														target="_blank"
														className="text-blue-600 hover:text-blue-400"
													>
														Terms and Conditions
													</a>{" "}
													and{" "}
													<a
														href="https://www.dubizzle.com/legalhub/privacy/"
														target="_blank"
														className="text-blue-600 hover:text-blue-400"
													>
														Privacy Policy
													</a>
												</p>
											</div>
										</ModalBody>
									</div>
								</div>
							</Modal>

						</li>

					</ul>
				</nav>
			</div>


			<div className="fixed w-full bottom-0 z-50">
				<div className="lg:hidden absolute bottom-0 left-0 flex border-t border-t-gray-300/40 dark:border-t-gray-200/20 text-gray-500 w-full justify-between bg-white dark:bg-[#202124]">
					<a className="p-3 space-y-1 dark:text-gray-200 flex flex-col items-center text-xs" href="#">
						<img src={home} alt="home-icon" />
						<span>Home</span>
					</a>
					<a className="p-3 space-y-1 dark:text-gray-200 flex flex-col items-center text-xs" href="#">
						<img src={homeSearch} alt="home-search-icon" />
						<span>Searech</span>
					</a>
					<a className="p-3 space-y-1 dark:text-gray-200 flex flex-col items-center text-xs" href="#">
						<img src={pluse} alt="ad-place-icon" />
						<span>Place an Ad</span>
					</a>
					<a className="p-3 space-y-1 dark:text-gray-200 flex flex-col items-center text-xs" href="#">
						<img src={message} alt="message-icon" />
						<span>Message</span>
					</a>
					<a className="p-3 space-y-1 dark:text-gray-200 flex flex-col items-center text-xs" href="#">
						<img src={profile} alt="profile-icon" />
						<span>Profile</span>
					</a>
				</div>
			</div>

			<div className="lg:border-b lg:border-b-gray-500/10 dark:lg:border-b-gray-300/10">
				<div className="container hidden lg:flex">
					<ul className="flex justify-around lg:w-full space-x-8">
						{/* MOTORS menu items*/}
						<li className="relative group">
							<a
								className="font-medium text-gray-800 py-3 px-2 inline-block border-b-4 border-transparent"
								href="/motors/"
							>
								Motors{" "}
								<span className="ml-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded">
									NEW
								</span>
							</a>

							{/* MOTORS DROPDOWN */}
							<div className="absolute left-0 mt-2 w-[700px] rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-1/3 border-r p-4">
									<h3 className="font-bold text-gray-700 mb-3">Cars</h3>
									<ul className="space-y-2">
										<li className="flex justify-between items-center">
											Rental Cars{" "}
											<span className="bg-red-600 text-white text-[10px] px-1 rounded">
												NEW
											</span>
										</li>
										<li>New Cars</li>
										<li>Export Cars</li>
										<li>Motorcycles</li>
										<li>Auto Accessories & Parts</li>
										<li>Heavy Vehicles</li>
										<li>Boats</li>
										<li>Number Plates</li>
									</ul>

									<div className="mt-4 pt-4 border-t">
										<h4 className="font-semibold mb-2 flex items-center gap-1">
											Services by{" "}
											<img
												src="https://www.dubizzle.com/frontend-assets/logos/dubizzle_cars.svg"
												alt="dubizzle"
												className="h-4"
											/>
										</h4>
										<ul className="space-y-2">
											<li className="flex items-center gap-2">
												🚗 Sell My Car
											</li>
											<li className="flex items-center gap-2">
												🔍 Car Inspection
											</li>
										</ul>
									</div>
								</div>

								{/* Right Panel */}
								<div className="w-2/3 p-4">
									<div className="flex justify-between items-center mb-3">
										<h3 className="font-bold text-gray-700">Cars</h3>
										<a
											href="#"
											className="text-red-600 text-sm font-semibold hover:underline"
										>
											View All →
										</a>
									</div>
									<div className="grid grid-cols-3 gap-y-2 gap-x-6">
										{[
											"Toyota",
											"Mercedes-Benz",
											"Nissan",
											"BMW",
											"Ford",
											"Lexus",
											"Chevrolet",
											"Land Rover",
											"Hyundai",
											"Audi",
											"Volkswagen",
											"Honda",
											"Kia",
											"Mitsubishi",
											"Porsche",
											"Jeep",
											"Dodge",
											"GMC",
											"Infiniti",
											"Cadillac",
										].map((brand) => (
											<div
												
												className="hover:underline cursor-pointer text-gray-700"
											>
												{brand}
											</div>
										))}
									</div>
								</div>
							</div>
						</li>

						{/* Property menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Property{" "}
								<span className="ml-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded">
									NEW
								</span>
							</a>
							{/* Property DROPDOWN */}
							<div className="absolute left-0 mt-2 w-[250px] rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-full border-r p-4">
									<ul className="space-y-2">
										<li>
											<h3 className="font-bold text-gray-700 mb-3">For Rent</h3>
										</li>
										<li>Residential</li>
										<li>Commercial</li>
										<li>Rooms For Rent</li>
										<li>Monthly Short Term</li>
										<li>Daily Short Term</li>

										<li>
											<h3 className="font-bold text-gray-700 mb-3">For Sale</h3>
										</li>
										<li>New Projects</li>
										<li>Residential</li>
										<li>Commercial</li>
										<li>Off-Plan</li>
										<li>Land</li>
										<li>Multiple Units</li>

										<li className="flex justify-between items-center">
											<h3 className="font-bold text-gray-700 mb-1">Agent & Agency Search</h3>
											<span className="bg-red-600 text-white text-[10px] px-1 rounded items-center ml-2">
												NEW
											</span>
										</li>
									</ul>

								</div>
							</div>
						</li>


						{/* Jobs menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Jobs
							</a>

							{/* JOBS DROPDOWN */}
							<div className="absolute left-0 mt-2 w-[700px] h-96 rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-1/3 border-r p-4">
									<h3 className="font-bold text-gray-700 mb-3">Jobs Seekers</h3>
									<ul className="space-y-2">
										<li> Jobs by Categories </li>
										<li> Jobs by Types </li>
										<li> Jobs by Qualifications</li>
										<h3 className="font-bold text-gray-700 pt-6 mb-3"> Recruiters </h3>
										<li> Jobs Seeker by Categories </li>
										<li> Jobs Seeker by Types </li>
										<li> Jobs Seeker by Qualifications </li>
										<h3 className="font-bold text-gray-700 mb-3">Hire with Us</h3>
									</ul>
								</div>

								{/* Right Panel */}
								<div className="w-2/3 p-4">
									<div className="flex justify-between items-center mb-4">
										<h3 className="font-bold text-gray-700"> Jobs by Categories </h3>
										<a
											href="#"
											className="text-red-600 text-sm font-semibold hover:underline"
										>
											View All →
										</a>
									</div>
									<div className="grid grid-cols-2 gap-y-2 gap-x-6">
										{[
											"Accounting / Finance",
											"Automobile",
											"Beauty / Saloon",
											"Cleaner / Housekeeper",
											"Construction",
											"Cook / Chief",
											"Customer Services / Call Center",
											"Data Management & Analysis",
											"Design",
											"Driver / Delivery",
											"Education",
											"Engineering",
											"Event Management & Operations",
											"HR / Admin",
											"Handyman / Technician",
											"Information Technology",
											"Legal Services",
											"Logistics & Distribution",
											"Manufacturing / Warehouse",
											"Marine Caption / Crew",
										].map((brand) => (
											<div
												
												className="hover:underline cursor-pointer text-gray-700"
											>
												{brand}
											</div>
										))}
									</div>
								</div>
							</div>
						</li>

						{/* ClassFields menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								ClassFields
							</a>
							{/* ClASSFIELDS DROPDOWN */}
							<div className="absolute left-0 mt-2 w-[700px] h-96 rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-1/3 border-r p-4 overflow-y-auto">
									<h3 className="font-bold text-gray-700 mb-3">Electronics</h3>
									<ul className="space-y-2">
										<li> Computer & Networking </li>
										<li> Business & Industrial </li>
										<li> Home Appliances </li>
										<li> Sports Equipment </li>
										<li> Clothings & Accessories </li>
										<li> Cameras & Imaging </li>
										<li> Jewelry & Watches </li>
										<li> Pets </li>
										<li> Musical Instruments </li>
										<li> Gaming </li>
										<li> Baby Items </li>
										<li> Toys </li>
										<li> Tickets & Vouchers </li>
										<li> Collectibles </li>
										<li> Books </li>
										<li> Music </li>
										<li> Free Stuff </li>
										<li> Lost / Found </li>
										<li> DVDs & Movies </li>
										<li> Furniture,Home & Garden </li>
										<li> Mobile Phones & Tables </li>
									</ul>
								</div>

								{/* Right Panel */}
								<div className="w-2/3 p-4">
									<div className="flex justify-between items-center mb-4">
										<h3 className="font-bold text-gray-700"> Electronics </h3>
										<a
											href="#"
											className="text-red-600 text-sm font-semibold hover:underline"
										>
											View All →
										</a>
									</div>
									<div className="grid grid-cols-2 gap-y-2 gap-x-6">
										{[
											"Home Audio & Turntables",
											"Televisions",
											"DVD & Home Theater",
											"Electronic Accessories",
											"Gadgets",
											"Car Electronics",
											"Projectors",
											"Mp3 Players and Portable Audio",
											"Satellite & Cable TV",
											"Health Electronics",
											"Smart Home",
											"Wearable Technology",
											"Other",
										].map((brand) => (
											<div
												
												className="hover:underline cursor-pointer text-gray-700"
											>
												{brand}
											</div>
										))}
									</div>
								</div>
							</div>
						</li>

						{/* Furniture & Garden menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Furniture & Garden
							</a>

							{/* Furniture & Garden DROPDOWN */}
							<div className="absolute left-[-170px] mt-2 w-[700px] h-96 rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-1/3 border-r p-4">
									<h3 className="font-bold text-gray-700 mb-3">Furniture</h3>
									<ul className="space-y-2">
										<li> Home Accessories </li>
										<li> Garden & Outdoor </li>
										<li> Lighting & Fans </li>
										<li> Rugs & Carpets </li>
										<li> Curtains & Blinds </li>
										<li> Tools & Home Improvement </li>
									</ul>
								</div>

								{/* Right Panel */}
								<div className="w-2/3 p-4 mr-8w-2/3 p-4 mr-auto">
									<div className="flex justify-between items-center mb-4">
										<h3 className="font-bold text-gray-700"> Furniture </h3>
										<a
											href="#"
											className="text-red-600 text-sm font-semibold hover:underline"
										>
											View All →
										</a>
									</div>
									<div className="grid grid-cols-2 gap-y-2 gap-x-6">
										{[
											"Armoires & Wardrobes",
											"Bar Tables",
											"Beds & Bed Sets",
											"Bookcases",
											"Cabinets & Cupboards",
											"Chairs, Benches & Stools",
											"Children's Furniture",
											"Dining Sets",
											"Dressers & Vanities",
											"Entertainment Centers",
											"Kitchen Islands & Carts",
											"Nightstands",
											"Other",
											"Office Furniture",
											"Sofas, Futons & Lounges",
											"Study Tables & Computer",
											"Tables",
											"Tables",
											"Other",
										].map((brand) => (
											<div
												
												className="hover:underline cursor-pointer text-gray-700"
											>
												{brand}
											</div>
										))}
									</div>
								</div>
							</div>
						</li>

						{/* Mobiles & Tablets menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Mobiles & Tablets
							</a>

							{/* Community DROPDOWN */}
							<div className="absolute left-[-383px] mt-2 w-[700px] h-96 rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-1/3 border-r p-4">
									<h3 className="font-bold text-gray-700 mb-3">Mobile Phones</h3>
									<ul className="space-y-2">
										<li> Mobile Phones & Tablet Accessories </li>
										<li> Tablets </li>
										<li> Other Mobile Phones & Tablets </li>

									</ul>
								</div>

								{/* Right Panel */}
								<div className="w-2/3 p-4 mr-8w-2/3 p-4 mr-auto">
									<div className="flex justify-between items-center mb-4">
										<h3 className="font-bold text-gray-700"> Mobile Phones </h3>
										<a
											href="#"
											className="text-red-600 text-sm font-semibold hover:underline"
										>
											View All →
										</a>
									</div>
									<div className="grid grid-cols-2 gap-y-2 gap-x-6">
										{[
											"Apple",
											"Samsung",
											"Google",
											"Huawei",
											"Xiaomi",
											"Oppo",
											"OnePlus",
											"Honor",
											"Nokia",
											"Vivo",
											"Motorola",
											"Realme",
											"Sony Ericsson",
											"ZTE Phones",
											"Vertu",
											"Asus",
											"Infinix",
											"Blackberry",
											"Nothing Phone",
											"Aquos",


										].map((brand) => (
											<div
												
												className="hover:underline cursor-pointer text-gray-700"
											>
												{brand}
											</div>
										))}
									</div>
								</div>
							</div>
						</li>


						{/* Mobiles & Tablets menu items */}
						<li className="relative group">
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Community
							</a>

							{/* Community DROPDOWN */}
							<div className="absolute left-[-130px] mt-2 w-[250px] rounded-md shadow-xl bg-white z-50 border p-0 flex text-sm opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
								{/* Left Panel */}
								<div className="w-full border-r p-4">
									<ul className="space-y-2">
										<li>Auto Services </li>
										<li>Consultancy Services</li>
										<li>Domestic</li>
										<li>Event & Entertainment</li>
										<li>Freelancers</li>
										<li>Health & Wellbeing Services </li>
										<li>Home Maintenance</li>
										<li>Movers & Removals</li>
										<li>Other Services</li>
										<li>Restoration & Repairs </li>
										<li>Tutors & Classes </li>
										<li>Web & Computer Services </li>
									</ul>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<ToastContainer />

		</header>

	);
}
