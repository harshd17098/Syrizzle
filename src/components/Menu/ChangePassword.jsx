import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { EyeIcon, EyeOffIcon, XIcon } from "lucide-react";

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate(); // ✅ for redirection

  const isDisabled = !newPassword || !confirmPassword || newPassword !== confirmPassword;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      setIsLoading(true);

      const response = await axios.post("https://syrizzle.vyominfotech.in/api/reset-password", {
        token,
        new_password: newPassword,
      });

      console.log("Response:", response.data);

      alert("Password successfully changed!");

      // ✅ Redirect to settings page
      navigate("/settings/security");
    } catch (error) {
      console.error("Error changing password:", error);
      if (error.response && error.response.status === 422) {
        setError("Invalid token or password format.");
      } else {
        setError("Failed to change password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => navigate("/settings/security")}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {/* New Password */}
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

          {/* Confirm Password */}
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

          {/* Password Requirements */}
          {newPassword && (
            <div className="bg-gray-50 border rounded p-4 space-y-2 text-sm">
              <p className="font-semibold">
                Password Strength:{" "}
                <span className="text-red-600">Weak</span> {/* Replace with logic if needed */}
              </p>
              <ul className="space-y-1">
                <li className={newPassword === confirmPassword ? "text-green-600" : "text-red-600"}>
                  {newPassword === confirmPassword ? "✓" : "✗"} The two password fields must match
                </li>
                <li className={newPassword.length >= 7 ? "text-green-600" : "text-red-600"}>
                  {newPassword.length >= 7 ? "✓" : "✗"} At least 7 characters long
                </li>
                <li className={/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? "text-green-600" : "text-red-600"}>
                  {/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? "✓" : "✗"} One upper and one lower case letter
                </li>
                <li className={/\d/.test(newPassword) ? "text-green-600" : "text-red-600"}>
                  {/\d/.test(newPassword) ? "✓" : "✗"} Must contain a number
                </li>
                <li className={/[!@#$%^&*]/.test(newPassword) ? "text-green-600" : "text-red-600"}>
                  {/[!@#$%^&*]/.test(newPassword) ? "✓" : "✗"} At least one special character
                </li>
                <li className={!newPassword.toLowerCase().includes("hemant") ? "text-green-600" : "text-red-600"}>
                  {!newPassword.toLowerCase().includes("hemant") ? "✓" : "✗"} Must not include your name
                </li>
              </ul>
            </div>
          )}
<ChangePassword/>
          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isDisabled || isLoading}
            className={`w-full py-2 rounded text-white font-medium ${isDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
