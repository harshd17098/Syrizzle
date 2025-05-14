import { FaAngleRight, FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
  <Link to={"/place-an-ad/motors/used-cars/new/"}>Cars</Link>,
 <Link to={"/place-an-ad/taxonomy/motors/motorcycles/"}>Motorcycles</Link>,
  "Auto Accessories & Parts",
  "Heavy Vehicles",
  "Boats",
  "Number Plates",
];

const MotorListingPage = () => {
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
     <Link to={"/place-an-ad/pick-a-category/"}><FaHome className="text-sm" /></Link> 
        <FaAngleRight />
        <span className="text-xs text-gray-700 font-medium">Motors</span>
      </div>

      {/* Category List */}
      <div className="w-full max-w-md border border-gray-200 rounded-sm divide-y divide-gray-200">
        
        <div>
          <Link
            
             to={"/place-an-ad/motors/used-cars/new/"}
              className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Cars</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
        <div>
          <Link
            
           to={"/place-an-ad/taxonomy/motors/motorcycles/"}
              className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Motorcycles</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
        <div>
          <Link
            className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Auto Accessories & Parts</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
        <div>
          <Link
            className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Heavy Vehicles</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
        <div>
          <Link
            className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Boats</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
        <div>
          <Link
            className="flex justify-between items-center px-5 py-4 hover:bg-gray-100"
            >
              <span className="font-semibold text-sm text-gray-800">Number Plates</span>
            <FaChevronRight className="text-gray-400 text-sm" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default MotorListingPage;
