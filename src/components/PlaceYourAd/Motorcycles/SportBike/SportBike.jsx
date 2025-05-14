import { FaAngleRight, FaChevronRight, FaHome } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const SportBike = () => {
  const { categoryId } = useParams(); // Use categoryId (lowercase 'c')
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      fetchSubCategory(categoryId); // Fetch sub-categories based on the categoryId from the URL
    }
  }, [categoryId]);  // Dependency on categoryId to re-fetch when the categoryId changes

  // Step 3: Fetch sub-categories with category_id
  const fetchSubCategory = async (category_id) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.warn("JWT not found");
      return;
    }

    try {
      const response = await axios.get(
        `https://syrizzle.vyominfotech.in/api/sub-category/${category_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Assuming the response has a 'data' field with subcategory information
      setSubCategoryData(response.data?.data?.result || []);
    } catch (error) {
      console.error("Error fetching sub-category:", error);
      setError("Failed to fetch sub-categories.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center">
      {/* Logo */}
      <div className="text-3xl font-bold mb-8">
        <span className="text-black">Syr</span>
        <span className="text-red-600 relative">
          izzle
          <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-red-600 text-xs">▲</span>
        </span>
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
        {subCategoryData.slice(0, 2).map((item, index) => (
          <React.Fragment key={index}>
            <FaAngleRight />
            <span className="text-xs text-gray-700 font-medium">
              {item?.sub_category_name}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* SubCategory List */}
      <div className="w-full max-w-md border border-gray-200 rounded-sm divide-y divide-gray-200">
        {subCategoryData.length > 0 ? (
          subCategoryData.map((item, idx) => (
            <Link
              key={idx}
              to={`/place-an-ad/motors/motorcycles/sport-bike/hyper-sports/new/${item._id}`} // Pass the subcategory ID to the URL
              className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-black">
                {item?.name}
              </span>
              <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
          ))
        ) : (
          <p className="text-center py-4">No sub-categories available.</p>
        )}
      </div>

    </div>
  );
};

export default SportBike;
