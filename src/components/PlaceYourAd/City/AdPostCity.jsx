import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdPostCity = () => {
  const [city, setCity] = useState('');

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-white">
      {/* Logo */}
      <div className="mb-6 ">
        <h1 className="text-4xl font-bold text-black">
          <span className="text-black">dub</span>
          <span className="text-red-600">izzle</span>
        </h1>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-black mb-2">Marhaba!</h2>
      <p className="mb-6 text-gray-700">Where should we place your ad?</p>

      {/* Select Dropdown */}
      <div className="w-72">
        <label className="block text-red-600 text-sm mb-1">Select a City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">-- Select a City --</option>
          {cities.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Always Enabled Button */}
      <Link to={"/place-an-ad/pick-a-category/"}><button
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
      >
        Yalla
      </button></Link>
    </div>
  );
};

export default AdPostCity;
