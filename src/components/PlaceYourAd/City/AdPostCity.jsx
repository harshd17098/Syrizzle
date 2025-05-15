import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdPostCity = () => {
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const cities = [
    'Dubai',
    'Abu Dhabi',
    'Ras al Khaimah',
    'Sharjah',
    'Fujairah',
    'Ajman',
    'Umm al Quwain',
    'Al Ain',
  ];

  const handleCityChange = async (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);

    const token = localStorage.getItem('jwt');
    if (!token) {
      alert('JWT token not found. Please log in first.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        'https://syrizzle.vyominfotech.in/api/add-motor',
        {
          emirate: selectedCity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);

      // Save the motor ID to localStorage if returned
      if (response?.data?.data?._id) {
        localStorage.setItem('motor_id', response.data.data._id);
      }

      console.log('Motor created with city:', response.data);
    } catch (error) {
      console.error('Error submitting city:', error.response?.data || error.message);
      alert('Failed to set city. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextClick = (e) => {
    if (!city) {
      e.preventDefault();
      alert('Please select a city before proceeding.');
    } else {
      navigate('/place-an-ad/pick-a-category/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-white">
      {/* Logo */}
      <div className="mb-6">
       <a href="/"> <h1 className="text-4xl font-bold text-black">
          <span className="text-black">Syr</span>
          <span className="text-red-600">izzle</span>
        </h1></a>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-black mb-2">Marhaba!</h2>
      <p className="mb-6 text-gray-700">Where should we place your ad?</p>

      {/* Select Dropdown */}
      <div className="w-72">
        <label className="block text-red-600 text-sm mb-1">Select a City</label>
        <select
          value={city}
          onChange={handleCityChange}
          className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isSubmitting}
        >
          <option value="">-- Select a City --</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Button */}
      <button
        onClick={handleNextClick}
        className={`mt-6 px-6 py-2 rounded transition duration-200 ${city ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-400 text-white cursor-not-allowed'}`}
        disabled={!city || isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Yalla'}
      </button>
    </div>
  );
};

export default AdPostCity;
