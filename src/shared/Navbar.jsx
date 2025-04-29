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

export default function Navbar() {

	const [selectedCity, setSelectedCity] = useState(CITIES[0]);
	const [openModal, setOpenModal] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const [openStaticModal, setOpenStaticModal] = useState(false);

	const [email, setEmail] = useState(""); useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((prevIndex) =>
				prevIndex === images.length - 1 ? 0 : prevIndex + 1
			);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	function onCloseModal() {
		setOpenModal(false);
		setEmail("");
		setOpenStaticModal(false)
	}


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
									<div style={{border:"1px solid black",borderRadius:"25px"}}>
									<span style={{ width: "111px", height: "36px", color: "black" ,padding:"25px"}}>Syrizzle</span>
									</div>
								</a>
							</div>

							{/* Theme Switcher */}
							<div className="lg:hidden">
								<ThemeSwitcher />
							</div>

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
						<ThemeSwitcher />
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
							<button
								onClick={() => setOpenModal(true)}
								className="cursor-pointer px-2 py-6 text-[#2B2D2E] border-x border-transparent hover:border-[#EEF0F1] dark:text-gray-200 text-[14px] transition-colors duration-200"
							>
								Log in or sign up
							</button>

							<Modal show={openModal} onClose={onCloseModal} popup>
								<div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]">
									<div className="relative bg-white rounded-lg shadow-lg p-4" style={{ width: "466px" }}>
										<ModalHeader
											style={{ position: "absolute", top: "5px", left: "390px", color: "gray" }}
										/>

										<ModalBody style={{ padding: "30px", paddingTop: "28px" }}>
											<div className="relative mb-4 flex justify-center items-center">
												<button
													style={{ left: "35px" }}
													className="absolute left-0 text-white bg-opacity-40 p-1 rounded-full"
													onClick={() =>
														setActiveIndex((prev) =>
															prev === 0 ? images.length - 1 : prev - 1
														)
													}
												>
													<FaArrowLeft style={{ backgroundColor: "white", color: "#E0E0E0" }} />
												</button>

												<div className="flex flex-col items-center gap-4">
													<img
														src={images[activeIndex]}
														alt={`Slide ${activeIndex + 1}`}
														className="rounded-md h-[160px] w-[100px] object-cover transition duration-500"
													/>
													<div className="text-xl font-bold">{titles[activeIndex]}</div>
												</div>

												<button
													style={{ right: "35px" }}
													className="absolute right-0 text-white bg-opacity-40 p-1 rounded-full"
													onClick={() =>
														setActiveIndex((prev) =>
															prev === images.length - 1 ? 0 : prev + 1
														)
													}
												>
													<FaArrowRight style={{ backgroundColor: "white", color: "#E0E0E0" }} />
												</button>
											</div>

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
													style={{
														backgroundColor: "rgba(245, 89, 89, 0.06)",
														cursor: "pointer",
													}}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = "#fee2e2")
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = "rgba(245, 89, 89, 0.06)")
													}
												>
													<button
														type="button"
														id="popup_create_account_link"
														onClick={() => setShowModal(true)}
														className="text-red-600 font-semibold text-sm md:text-base focus:outline-none"
													>
														Don’t have an account? Create one
													</button>

													{showModal && <SignUp onClose={() => setShowModal(false)} />}
												</div>

												<p
													className="text-center text-xs text-gray-400 px-6"
												>
													By signing up I agree to the{" "}
													<a
														href="https://www.dubizzle.com/legalhub/terms/"
														target="_blank"
														id="terms-and-conditions-link"
														className="text-blue-600 hover:text-blue-400"
													>
														Terms and Conditions
													</a>{" "}
													and{" "}
													<a
														href="https://www.dubizzle.com/legalhub/privacy/"
														target="_blank"
														id="privacy-policy-link"
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

						<li>
							<button className="btn" href="#" onClick={() => setOpenStaticModal(true)} style={{ fontSize: "14px" }}>
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
		</header>
	);
}
