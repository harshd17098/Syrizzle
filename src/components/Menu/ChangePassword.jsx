import { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";

const ChangePassword = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(""); // State to store token

  const isDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;



  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); // Clear error if passwords match

    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      setIsLoading(true); // Start loading state

      // Log the data being sent to the backend (for debugging purposes)
      console.log({
        token,
        new_password: newPassword
      });

      // Make the POST request to change the password
      const response = await axios.post("https://syrizzle.vyominfotech.in/api/reset-password", {
        token,
        new_password: newPassword,
      });

      // Handle success response
      alert("Password successfully changed!");
      onClose(); // Close the modal after successful password change
    } catch (error) {
      console.error("Error changing password:", error);

      // Check if it's a 422 error and display a specific message
      if (error.response && error.response.status === 422) {
        setError("Invalid token or password format.");
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {/* New Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          {/* Confirm New Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled || isLoading}
            className={`w-full py-2 rounded text-white font-medium ${
              isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
