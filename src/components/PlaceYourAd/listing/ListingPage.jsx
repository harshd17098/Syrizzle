import React from "react";
import { FaBriefcase, FaBuilding, FaCar, FaCouch, FaHome, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const ListingPage = () => {
  const options = [
    { title: <Link to={"/place-an-ad/taxonomy/motors/"}>Motors</Link>, icon: <FaCar size={40} className="text-red-600" /> },
    { title: "Jobs", icon: <FaBriefcase size={40} className="text-red-600" /> },
    { title: "Property for Sale", icon: <FaHome size={40} className="text-red-600" /> },
    { title: "Property for Rent", icon: <FaBuilding size={40} className="text-red-600" /> },
    { title: "Community", icon: <FaUsers size={40} className="text-red-600" /> },
    { title: "Classifieds", icon: <FaCouch size={40} className="text-red-600" /> },
  ];
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-white text-center">
      <h1 className="text-2xl font-semibold mb-1">Hello, what are you listing today?</h1>
      <p className="text-gray-600 mb-8">Select the area that best suits your ad</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {options.map((item, idx) => (
          <div
            key={idx}
            className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border"
          >
            <div className="text-4xl text-red-600 mb-4">{item.icon}</div>
            <div className="text-lg font-medium text-gray-800">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
