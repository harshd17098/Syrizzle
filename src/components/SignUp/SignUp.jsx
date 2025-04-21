import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";


const SignUp = ({ onClose }) => {

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const validations = {
		length: formData.password.length >= 7,
		case: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password),
		number: /\d/.test(formData.password),
		special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
		noName: !formData.password.toLowerCase().includes(formData.name.toLowerCase()),
	};

	const allValid = Object.values(validations).every(Boolean);

	return (
		<div className="fixed inset-0 z-50 flex justify-center items-center ">
			<div className="bg-white w-[466px] p-6 rounded-lg shadow-lg relative" style={{height:"650px",padding:"60px"}}>
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
				>
					<IoArrowBackSharp style={{position:"absolute",right:"414px",top:"14px"}} />

				</button>

				<h2 className="text-xl font-semibold mb-6 text-center">Create an account</h2>

				<input
					type="text"
					placeholder="First Name"
					className="w-full border px-4 py-2 mb-3 rounded"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
				/>
				<input
					type="email"
					placeholder="Email"
					className="w-full border px-4 py-2 mb-3 rounded"
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<div className="relative mb-3">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="Password"
						className="w-full border px-4 py-2 pr-10 rounded"
						value={formData.password}
						onChange={(e) => setFormData({ ...formData, password: e.target.value })}
					/>
					<span
						className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? "🙈" : "👁️"}
					</span>
				</div>

				{/* Password validation checklist */}
				<div className="bg-gray-50 p-4 rounded mb-4 text-sm">
					<ul className="space-y-1">
						<li className={validations.length ? "text-green-600" : "text-red-600"}>
							{validations.length ? "✓" : "✗"} At least 7 characters long
						</li>
						<li className={validations.case ? "text-green-600" : "text-red-600"}>
							{validations.case ? "✓" : "✗"} One upper and one lower case letter
						</li>
						<li className={validations.number ? "text-green-600" : "text-red-600"}>
							{validations.number ? "✓" : "✗"} Must contain a number
						</li>
						<li className={validations.special ? "text-green-600" : "text-red-600"}>
							{validations.special ? "✓" : "✗"} At least one special character
						</li>
						<li className={validations.noName ? "text-green-600" : "text-red-600"}>
							{validations.noName ? "✓" : "✗"} Must not include your name
						</li>
					</ul>
				</div>

				<button
					className={`w-full py-2 rounded text-white ${
						allValid ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
					}`}
					disabled={!allValid}
				>
					Sign Up
				</button>

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
		</div>
	);
};

export default SignUp;
