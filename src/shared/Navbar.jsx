import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-for-dark.svg";
import notification from "../assets/notificaion.svg";
import search from "../assets/search.svg";
import favorite from "../assets/favorite.svg";
import chat from "../assets/chat.svg";
import home from "../assets/icons/home.svg";
import homeSearch from "../assets/icons/home-search.svg";
import pluse from "../assets/icons/pluse.svg";
import message from "../assets/icons/message.svg";
import profile from "../assets/icons/profile.svg";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import JoinUs from "../components/JoinUS/JoinUs";
import React, { useState, useEffect } from "react";
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


const menuItems = [
	"My Job Applications",
	"My Profile",
	"My Job Profile",
	"My Public Profile",
	"My Ads",
	"Get Verified ✅",
	"Chats",
	"Favorites",
	"My Searches",
	"Car Appointments 🆕",
	"Car Inspections 🆕",
	"My Bookmarks",
	"Account Settings",
	"Sign out",
];

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

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginTriggered, setLoginTriggered] = useState(false);

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
	}, []);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			setUser(JSON.parse(userData));
		}
	}, []);

	const handleEmailLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post(
				'https://syrizzle.vyominfotech.in/api/login',
				{
					email,
					password,
					login_type: 'email',
					device_name: 'web',
					image: ""
				}
			);

			const result = response.data?.data?.result;

			if (!result || !result.login_devices?.length) {
				toast.warn('Login successful but no token found.', {
					position: 'top-center',
				});
				return;
			}

			// Store JWT
			const jwt = result.login_devices[0].token;
			localStorage.setItem('jwt', jwt);

			// Prepare and store user data
			const userData = {
				first_name: result.first_name,
				last_name: result.last_name,
				email: result.email,
				image: result.image,
			};

			localStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);

			// Notify success and navigate
			toast.success('Email login successful!', {
				position: 'top-center',
			});

			// Clear form & close modal
			setEmail('');
			setPassword('');
			setOpenModal(false);
			navigate('/');
		} catch (error) {
			console.error('Email login failed:', error?.response || error);
			toast.error(
				error?.response?.data?.message || 'Email login failed. Please check your credentials.',
				{ position: 'top-center' }
			);
		}
	};




	const handleLogout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('jwt');
		setUser(null);
		toast.info('Logged out successfully', { position: 'top-center' });
	};


	function onCloseModal() {
		setOpenModal(false);
		setEmail("");
		setOpenStaticModal(false)
	}
	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);


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
								<a href="#">
									{/* Replace with your image if needed */}
									<div style={{ border: "1px solid black", borderRadius: "25px" }}>
										<span style={{ width: "111px", height: "36px", color: "black", padding: "25px" }}>Syrizzle</span>
									</div>
								</a>
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
									key={city}
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
							<div className="relative px-2 py-6 text-[#2B2D2E] dark:text-gray-200 text-[14px]">
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="flex items-center justify-between w-full"
								>
									{user ? (

										<div className="px-2  text-[#2B2D2E] dark:text-gray-200 text-[14px] flex items-center gap-2">
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

									) : (
										<button
											onClick={() => setOpenModal(true)}
											className="cursor-pointer px-2 py-6 text-[#2B2D2E] border-x border-transparent hover:border-[#EEF0F1] dark:text-gray-200 text-[14px] transition-colors duration-200"
										>
											Log in or sign up
										</button>
									)}
									<svg
										className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''
											}`}
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>

								{isDropdownOpen && (
									<ul className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-10">
										<Link to={"/settings/profile"}>	<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
											My Profile
										</li></Link>
										<li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
											Option 2
										</li>
										<li>
											<button
												className="btn w-full"
												onClick={handleLogout}
												style={{ fontSize: "14px", backgroundColor: "white", color: "black" }}
											>
												Logout
											</button>
										</li>
									</ul>
								)}
							</div>

							<Modal show={openModal} onClose={onCloseModal} popup>
								<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]">
									<div className="relative bg-white rounded-lg shadow-lg p-4" style={{ width: "466px" }}>
										<ModalHeader
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

											{/* Email Login */}
											<form onSubmit={handleEmailLogin} className="space-y-4 mb-4 w-full">
												<input
													type="email"
													placeholder="Email"
													className="border p-2 w-full rounded"
													value={email}
													onChange={(e) => setEmail(e.target.value)}
													required
												/>
												<input
													type="password"
													placeholder="Password"
													className="border p-2 w-full rounded"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													required
												/>
												<button
													type="submit"
													className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
												>
													Login with Email
												</button>
											</form>

											<div className="my-4 text-center text-gray-500">OR</div>

											{/* Social Buttons */}
											<div className="flex flex-col items-center justify-center space-y-3">
												<LoginSocialGoogle
													client_id=""
													onResolve={({ data }) => handleSocialLogin(data)}
													onReject={(err) => console.log('Google login error', err)}
												>
													<GoogleLoginButton />
												</LoginSocialGoogle>

												<LoginSocialFacebook
													appId="YOUR_FACEBOOK_APP_ID"
													onResolve={({ data }) => handleSocialLogin('facebook', data)}
													onReject={(err) => console.log('Facebook login error', err)}
												>
													<FacebookLoginButton />
												</LoginSocialFacebook>

												<LoginSocialApple
													client_id="YOUR_APPLE_CLIENT_ID"
													scope="name email"
													redirect_uri="https://yourdomain.com"
													onResolve={({ data }) => handleSocialLogin('apple', data)}
													onReject={(err) => console.log('Apple login error', err)}
												>
													<AppleLoginButton />
												</LoginSocialApple>
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
						</li>

						<li>

							<button
								className="btn"
								onClick={() => setOpenStaticModal(true)}
								style={{ fontSize: "14px" }}
							>
								Place Your Ad
							</button>


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
														key={id}
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
			<div className="lg:border-b lg:border-b-gray-500/10 dark:lg:border-b-gray-300/10">
				<div className="container hidden lg:flex">
					<ul className="flex justify-center lg:w-full space-x-8">
						<li class="relative group">
							<a
								className="font-medium text-gray-800 py-3 px-2 inline-block "
								href="#"
							>
								Motors

							</a>

							<div class="absolute left-0 hidden group-hover:block  bg-white dark:bg-gray-800 shadow-lg mt-2 rounded-md " style={{ zIndex: "999", width: "190px" }}>
								<a class="block px-7 py-4 text-gray-800 hover:bg-gray-200" href="#">
									Car
								</a>
								<a class="block px-7  py-4 text-gray-800 hover:bg-gray-200" href="#">
									<p>	Rental Cars</p>
								</a>
								<a class="block px-7 py-4 text-gray-800 hover:bg-gray-200" href="#">
									New Cars
								</a>
							</div>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Property for Rent
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Property for Sale
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								ClassFields
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Furniture & Garden
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Mobiles & Tablets
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Jobs
							</a>
						</li>
						<li>
							<a
								className="font-medium dark:text-gray-200 py-3 px-2 inline-block border-b-4 hover:border-b-4 border-transparent hover:border-b-black dark:hover:border-b-primary-500 duration-200"
								href="#"
							>
								Community
							</a>
						</li>
					</ul>
				</div>
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
			<ToastContainer />

		</header>

	);
}
