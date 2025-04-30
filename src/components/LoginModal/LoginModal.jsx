import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import SignUp from "../SignUp/SignUp";

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
const LoginModal = ({ show, onClose }) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);


    if (showSignUp) return <SignUp onClose={() => setShowSignUp(false)} />;

    return (
        <Modal show={show} onClose={onClose} popup>
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[9999]">
                <div className="relative container m-auto bg-white rounded-lg shadow-lg p-4" style={{ width: "466px" }}>
                    <ModalHeader
                        style={{ position: "absolute", top: "5px", left: "390px", color: "gray" }}
                    />
                    <ModalBody style={{ padding: "30px", paddingTop: "28px" }}>
                        {/* Carousel */}
                        <div className="relative mb-4 flex justify-center items-center">
                            <button
                                style={{ left: "35px" }}
                                className="absolute left-0 text-white bg-opacity-40 p-1 rounded-full"
                                onClick={() =>
                                    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
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
                                    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                                }
                            >
                                <FaArrowRight style={{ backgroundColor: "white", color: "#E0E0E0" }} />
                            </button>
                        </div>

                        {/* Social Buttons */}
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
                                    className={`w-72 flex border ${className} px-4 py-2 rounded-md hover:border-gray-300`}
                                >
                                    <img src={img} alt={`${id} logo`} className="w-6 h-6 mr-2" />
                                    {text}
                                </button>
                            ))}

                            {/* Create Account */}
                            <div
                                className="mt-2 p-2 rounded-md"
                                style={{
                                    backgroundColor: "rgba(245, 89, 89, 0.06)",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fee2e2")}
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "rgba(245, 89, 89, 0.06)")
                                }
                            >
                                <button
                                    type="button"
                                    onClick={() => setShowSignUp(true)}
                                    className="text-red-600 font-semibold text-sm md:text-base"
                                >
                                    Don’t have an account? Create one
                                </button>
                            </div>

                            <p className="text-center text-xs text-gray-400 px-6">
                                By signing up I agree to the{" "}
                                <a href="https://www.dubizzle.com/legalhub/terms/" className="text-blue-600">Terms and Conditions</a>{" "}
                                and{" "}
                                <a href="https://www.dubizzle.com/legalhub/privacy/" className="text-blue-600">Privacy Policy</a>.
                            </p>
                        </div>
                    </ModalBody>
                </div>
            </div>
        </Modal>
    );
};

export default LoginModal;
