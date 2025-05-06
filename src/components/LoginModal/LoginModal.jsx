import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import SignUp from '../SignUp/SignUp';
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

const images = [
    'https://static.dubizzle.com/static_assets/call.svg',
    'https://static.dubizzle.com/static_assets/favoritead.svg',
    'https://static.dubizzle.com/static_assets/paa.svg',
];

const titles = [
    'Log in to call the seller',
    'Log in to favorite an ad',
    'Log in to post an ad',
];

const LoginModal = ({ show, onClose }) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSocialLogin = async (provider, data) => {
        try {
            const idToken = data.id_token || data.accessToken;
            const response = await axios.post('https://syrizzle.vyominfotech.in/api/login', {
                login_type: provider,
                idToken,
                device_name: 'web',
            });

            const jwt = response.data.token;
            localStorage.setItem('jwt', jwt);
            alert(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful!`);
        } catch (error) {
            console.error(`${provider} login failed:`, error);
            alert(`${provider} login failed`);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://syrizzle.vyominfotech.in/api/login', {
                email,
                password,
                login_type: 'email',
                device_name: 'web',
            });

            const jwt = response.data.token;
            localStorage.setItem('jwt', jwt);
            alert('Email login successful!');
        } catch (error) {
            console.error('Email login failed:', error);
            alert('Email login failed');
        }
    };

    if (showSignUp) return <SignUp onClose={() => setShowSignUp(false)} />;

    return (
        <Modal show={show} onClose={onClose} popup>
            <ModalHeader />
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
                        client_id="YOUR_GOOGLE_CLIENT_ID"
                        onResolve={({ data }) => handleSocialLogin('google', data)}
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
        </Modal>
    );
};

export default LoginModal;
