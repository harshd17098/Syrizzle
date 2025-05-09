import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, XIcon } from "lucide-react";

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const validations = [
    { label: "The two password fields must match", valid: password === confirm && password !== "" },
    { label: "At least 7 characters long", valid: password.length >= 7 },
    { label: "One upper and one lower case letter", valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { label: "Must contain a number", valid: /\d/.test(password) },
    { label: "At least one special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const allValid = validations.every(v => v.valid);

  const handleSubmit = async () => {
    if (!allValid) {
      setError("Password does not meet all requirements.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await axios.post("https://syrizzle.vyominfotech.in/api/reset-password", {
        token,
        new_password: password,
      });

      alert("Password successfully changed!");
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 422) {
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
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => navigate("/settings/security")}
        >
          <XIcon className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {password && (
            <div className="bg-gray-100 p-4 rounded space-y-2 text-sm">
              {validations.map((item, i) => (
                <div key={i} className={`flex items-center space-x-2 ${item.valid ? "text-green-600" : "text-red-600"}`}>
                  <span>{item.valid ? "✓" : "✗"}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!allValid || isLoading}
            className={`w-full py-2 rounded font-semibold text-white ${allValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"}`}
          >
            {isLoading ? "Changing..." : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
