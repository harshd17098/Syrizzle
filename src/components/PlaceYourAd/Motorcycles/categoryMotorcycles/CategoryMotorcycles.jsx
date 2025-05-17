import { FaAngleRight, FaChevronRight, FaHome } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryMotorCycles = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the query param _Id from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const _Id = queryParams.get('_Id');

  console.log(_Id, "kkkk"); 

  // Fetch motorcycle categories
  useEffect(() => {
    const fetchMotorcycleCategories = async () => {
      const token = localStorage.getItem('jwt');

      if (!token) {
        setError('User not authenticated. No token found.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://syrizzle.vyominfotech.in/api/category/motorcycles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(response.data.data.result);
      } catch (err) {
        setError('Failed to fetch categories. ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycleCategories();
  }, []);

  // Handle category click
  const handleCategoryClick = async (category_id) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      console.error('No token found');
      return;
    }

    // Store category_id in localStorage
    localStorage.setItem('category_id', category_id);

    // Create the payload with extra data
    const payload = {
      category_id,
      motor_type: 2,
    };

    try {
      const response = await axios.post(
        'https://syrizzle.vyominfotech.in/api/add-motor',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Motor added successfully:', response.data);

      // Navigate on success and pass category_id in the URL
      navigate(`/place-an-ad/taxonomy/motors/motorcycles/sport-bike/${category_id}`);
    } catch (error) {
      console.error('Error posting motor:', error.response?.data || error.message);
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
      {/* Logo */}
      <div className="text-3xl font-bold mb-8">
        <a href="/">    <span className="text-black">Syr</span>
          <span className="text-red-600 relative">
            izzle
            <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
          </span></a>
      </div>

      {/* Heading */}
      <h2 className="text-lg font-semibold text-center mb-4">
        Now choose the right category for your ad:
      </h2>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-6">
        <FaHome className="text-sm" />
        <FaAngleRight />
        <span className="text-xs text-gray-700 font-medium">Motors</span>
        <FaAngleRight />
        <span className="text-xs text-gray-700 font-medium">Motorcycles</span>
      </div>

      {/* Category List */}
      <div className="w-full max-w-md border border-gray-200 rounded-sm divide-y divide-gray-200">
        {categories.map((item, idx) => (
          <button
            key={item.id || idx}
            onClick={() => handleCategoryClick(item._id)} // use _id or category_id based on actual API
            className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-100 text-left"
          >
            <Link to={"/place-an-ad/taxonomy/motors/motorcycles/sport-bike/:categoryId"}>      <span className="font-semibold text-sm text-black">{item.name}</span></Link>
            <FaChevronRight className="text-gray-400 text-sm" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMotorCycles;
