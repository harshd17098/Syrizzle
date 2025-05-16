import React from "react";
import { FaBriefcase, FaBuilding, FaCar, FaCouch, FaHome, FaUsers } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
const motorTypeLabels = {
  1: 'Cars',
  2: 'Motorcycles',
  3: 'Auto Accessories & Parts',
  4: 'Heavy Vehicles',
  5: 'Boats',
  6: 'Number Plates'
};
const getCategoryData = (type) => {
  switch (type) {
    case 'motors':
      return {
        path: '/place-an-ad/taxonomy/motors/',
        icon: <FaCar size={40} className="text-red-600 mb-4" />,
        label: 'Motors',
      };
    case 'jobs':
      return {
        path: '/place-an-ad/taxonomy/jobs/',
        icon: <FaBriefcase size={40} className="text-red-600 mb-4" />,
        label: 'Jobs',
      };
    case 'property-sale':
      return {
        path: '/place-an-ad/taxonomy/property-sale/',
        icon: <FaHome size={40} className="text-red-600 mb-4" />,
        label: 'Property for Sale',
      };
    case 'property-rent':
      return {
        path: '/place-an-ad/taxonomy/property-rent/',
        icon: <FaBuilding size={40} className="text-red-600 mb-4" />,
        label: 'Property for Rent',
      };
    case 'community':
      return {
        path: '/place-an-ad/taxonomy/community/',
        icon: <FaUsers size={40} className="text-red-600 mb-4" />,
        label: 'Community',
      };
    case 'classifieds':
      return {
        path: '/place-an-ad/taxonomy/classifieds/',
        icon: <FaCouch size={40} className="text-red-600 mb-4" />,
        label: 'Classifieds',
      };
    default:
      return null;
  }
};

const categories = ['motors', 'jobs', 'property-sale', 'property-rent', 'community', 'classifieds'];

const ListingPage = () => {

  const location = useLocation();
  const dataReceived = location.state;

  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path, { state: dataReceived });
  };

  const [drafts, setDrafts] = useState([]); // ✅ fix here
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  console.log("dataReceived", dataReceived);
  const getMotorById = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.error("JWT token is missing");
      return;
    }

    try {
      const response = await axios.post(`https://syrizzle.vyominfotech.in/api/add-motor/${dataReceived}`, {
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
        console.log("response", response);


        setDrafts(response.data.data.result); // ✅ Correct here
        console.log(response.data.data.result);
        console.log("hyyy", response.data.data.result);

      } catch (error) {
        console.error('Error fetching drafts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
    getMotorById();
  }, []);
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10); // Load 10 more items
  };
  if (loading) return <p>Loading...</p>;


  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-white text-center">
      <h1 className="text-2xl font-semibold mb-1">Hello, what are you listing today?</h1>
      <p className="text-gray-600 mb-8">Select the area that best suits your ad</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center mt-10">

        {/* <Link to="/place-an-ad/taxonomy/motors/">
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
        </Link> */}


        {categories.map((type, index) => {
          const category = getCategoryData(type);
          if (!category) return null;

          return (
            <div
              key={index}
              onClick={() => handleClick(category.path)}
              className="cursor-pointer w-48 h-48 bg-white shadow-md rounded-lg flex flex-col items-center justify-center transition duration-300 hover:shadow-lg border"
            >
              {category.icon}
              <div className="text-lg font-medium text-gray-800">{category.label}</div>
            </div>
          );
        })}


      </div>
      <div>
        <br />
        <h1>or continue posting from your drafts</h1>
        {drafts.length === 0 ? (
          <p>No drafts found.</p>
        ) : (
          <>

            {drafts.slice(0, visibleCount).map((draft) => (
              // <li key={draft._id}>{draft.emirate}</li> 
              <div className="flex items-center justify-between  border rounded-lg hover:shadow-md hover:text-red-500 transition cursor-pointer" style={{width:"450px",marginBottom:'15px'}}>
                {/* Left Image */}
                <img
                  src={draft.images && draft.images.length > 0
                    ? `https://syrizzle.vyominfotech.in${draft.images[0]}` // ✅ notice no extra `/` after api
                    : 'https://static.dubizzle.com/frontend-web/static-resources/assets/images/placeholder.png'
                  }
                  alt="No image"
                  className="w-20 h-20 object-cover rounded-md"
                />
                {/* Middle Text */}
                <div className="flex-1 mx-4 text-left hover:text-red-500">
                  <p className="text-sm font-medium text-gray-800">
                    {motorTypeLabels[draft.motor_type] || 'Unknown Type'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {draft.title || 'Untitled Used Car Draft'}
                  </p>
                  <p>
                    AED {draft.price}
                  </p>
                </div>


                {/* Right Chevron Icon */}
                <img
                  src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/chevron-right.svg"
                  alt="Continue"
                  className="w-5 h-5"
                />
              </div>
            ))}

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
