import React from "react";
import { FaBriefcase, FaBuilding, FaCar, FaCouch, FaHome, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
const ListingPage = () => {

  const [drafts, setDrafts] = useState([]); // ✅ fix here
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

const location = useLocation();
  const dataReceived = location.state;
  console.log("dataReceived",dataReceived);
  

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const token = localStorage.getItem('jwt');

        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await axios.get('https://syrizzle.vyominfotech.in/api/my-place?status=drafts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDrafts(response.data.data.result); // ✅ Correct here
        console.log(response.data.result);

      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10); // Load 10 more items
  };
  if (loading) return <p>Loading...</p>;

  const getMotorById = async (id) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("JWT token is missing");
      return;
    }

    try {
      const response = await axios.post(`https://syrizzle.vyominfotech.in/api/add-motor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched motor data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching motor data:", error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-white text-center">
      <h1 className="text-2xl font-semibold mb-1">Hello, what are you listing today?</h1>
      <p className="text-gray-600 mb-8">Select the area that best suits your ad</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mt-10">

        <Link to="/place-an-ad/taxonomy/motors/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaCar size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Motors</div>
          </div>
        </Link>

        <Link to="/place-an-ad/taxonomy/jobs/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaBriefcase size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Jobs</div>
          </div>
        </Link>

        <Link to="/place-an-ad/taxonomy/property-sale/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaHome size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Property for Sale</div>
          </div>
        </Link>

        <Link to="/place-an-ad/taxonomy/property-rent/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaBuilding size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Property for Rent</div>
          </div>
        </Link>

        <Link to="/place-an-ad/taxonomy/community/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaUsers size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Community</div>
          </div>
        </Link>

        <Link to="/place-an-ad/taxonomy/classifieds/">
          <div className="w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border">
            <FaCouch size={40} className="text-red-600 mb-4" />
            <div className="text-lg font-medium text-gray-800">Classifieds</div>
          </div>
        </Link>



      </div>
      <div>
        <h1>My Draft Places</h1>
        {drafts.length === 0 ? (
          <p>No drafts found.</p>
        ) : (
          <>
            <ul>
              {drafts.slice(0, visibleCount).map((draft) => (
                <li key={draft._id}>{draft.emirate}</li> // ✅ Using correct fields
              ))}
            </ul>
            {visibleCount < drafts.length && (
              <button
                onClick={handleLoadMore}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default ListingPage;
