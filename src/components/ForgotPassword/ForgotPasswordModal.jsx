import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://syrizzle.vyominfotech.in/api/forgot-password", { email });

      if (response.data.status) {
        toast.success(response.data.data.message);
        onClose(); // Close modal on success
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md w-[400px]">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-black">&larr;</button>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-black">&times;</button>
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">Forgot your password?</h2>
        <p className="text-center text-gray-500 mb-4">Enter your email and we’ll send you a link to create a new password</p>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            required
          />
          <button
            type="submit"
            disabled={!email}
            className={`w-full py-2 rounded text-white ${email ? "bg-black hover:bg-gray-900" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Reset Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordModal;
