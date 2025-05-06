import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SignUp = ({ onClose }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(false);

	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
	const emailRegex =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	const handleEmailChange = (e) => {
		const emailInput = e.target.value;
		setEmail(emailInput);
		setIsEmailValid(emailRegex.test(emailInput));
	};

	const handlePasswordChange = (e) => {
		const passwordInput = e.target.value;
		setPassword(passwordInput);
		setIsPasswordValid(passwordRegex.test(passwordInput));
	};

	const handleRegister = async (e) => {
		e.preventDefault();

		if (!name || !email || !password) {
			toast.warn("All fields are required.", { position: "top-center" });
			return;
		}

		if (!isEmailValid) {
			toast.warn("Please enter a valid email address.", { position: "top-center" });
			return;
		}

		if (!isPasswordValid) {
			toast.warn(
				"Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.",
				{ position: "top-center" }
			);
			return;
		}

		try {
			const response = await axios.post(
				"https://syrizzle.vyominfotech.in/api/register",
				{
					first_name: name,
					email: email,
					password: password,
				}
			);

			if (response.data.success) {
				toast.success("Account created successfully!", { position: "top-center" });
				setName("");
				setEmail("");
				setPassword("");
				onClose();
			}
		} catch (error) {
			console.error("Registration error:", error);
			toast.error("Something went wrong during registration.", { position: "top-center" });
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center">
			<div className="bg-white w-[466px] p-6 rounded-lg shadow-lg relative" style={{ height: "650px", padding: "60px" }}>
				<button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl">
					<IoArrowBackSharp />
				</button>

				<h2 className="text-xl font-semibold mb-6 text-center">Create an account</h2>

				<form onSubmit={handleRegister} className="space-y-4">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Full Name"
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<input
						type="email"
						value={email}
						onChange={handleEmailChange}
						placeholder="Email"
						className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isEmailValid ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
					/>
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						placeholder="Password"
						className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${isPasswordValid ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
					/>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
					>
						Sign Up
					</button>
				</form>

				<div className="mt-4 text-center text-sm text-blue-600 cursor-pointer" onClick={onClose}>
					Already have an account? Log in
				</div>

				<p className="text-xs text-gray-500 text-center mt-4">
					By signing up I agree to the{" "}
					<a href="#" className="text-blue-600 hover:underline">
						Terms and Conditions
					</a>{" "}
					and{" "}
					<a href="#" className="text-blue-600 hover:underline">
						Privacy Policy
					</a>
				</p>
			</div>
			<ToastContainer />
		</div>
	);
};

export default SignUp;
