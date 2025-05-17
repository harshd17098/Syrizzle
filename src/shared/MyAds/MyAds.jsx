import React, { useState, useRef, useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const tabTypes = [
  { key: 'all', label: 'All Ads' },
  { key: 'live', label: 'Live' },
  { key: 'drafts', label: 'Drafts' },
  { key: 'pending', label: 'Payment Pending' },
  { key: 'review', label: 'Under Review' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'expired', label: 'Expired' },
];

const MyAds = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isOpen, setIsOpen] = useState(false);
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tabCounts, setTabCounts] = useState({
    all: 0,
    live: 0,
    drafts: 0,
    pending: 0,
    review: 0,
    rejected: 0,
    expired: 0
  });
  const [motorCount, setMotorCount] = useState(0);
  
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const modalRef = useRef(null);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closePopup();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);


// Fetch ads data based on active tab
  const fetchAdsData = async (status) => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setError('Authentication token not found. Please login.');
        setLoading(false);
        return;
      }
      
      // Determine the status parameter based on active tab
      let statusParam = '';
      if (status === 'drafts') {
        statusParam = 'drafts';
      } else if (status === 'live') {
        statusParam = 'live';
      } else if (status === 'pending') {
  statusParam = 'pending';  // ✅ fix here
}
 else if (status === 'review') {
        statusParam = 'under_review';
      } else if (status === 'rejected') {
        statusParam = 'rejected';
      } else if (status === 'expired') {
        statusParam = 'expired';
      } else {
        // All Ads - don't specify status to get all
        statusParam = '';
      }
      
      const url = `https://syrizzle.vyominfotech.in/api/my-place${statusParam ? `?status=${statusParam}` : ''}`;
      console.log("hyyy",url);
      
      
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('API Response:', response.data);
      
      if (response.data && response.data.data && response.data.data.result) {
        const adsResult = response.data.data.result;
        setAdsData(adsResult);
        
        // Count the number of motors ads
        // This assumes the API returns a category field or similar to identify motors
        // Adjust this logic based on your actual API response structure
        const motorsAds = adsResult.filter(ad => ad.category === 'motors' || ad.category_id === 'motors');
        setMotorCount(motorsAds.length || adsResult.length); // If no category field, assume all are motors
        
        // Update tab counts based on the response
        if (response.data.data.counts) {
          const counts = response.data.data.counts;
          setTabCounts({
            all: counts.all || 0,
            live: counts.live || 0,
            drafts: counts.drafts || 0,
            pending: counts.payment_pending || 0,
            review: counts.under_review || 0,
            rejected: counts.rejected || 0,
            expired: counts.expired || 0
          });
        }
      } else {
        setAdsData([]);
        setMotorCount(0);
      }
    } catch (err) {
      console.error('Error fetching ads:', err);
      setError(err.response?.data?.message || 'Failed to fetch ads data');
      setAdsData([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Effect to fetch data when tab changes
  useEffect(() => {
    fetchAdsData(activeTab);
  }, [activeTab]);

  const handleGetVerified = () => {
    alert("Go to verification flow");
    // You can extend this to open another modal or route to verification page
    closePopup();
  };

  return (
    <div className="container" style={{ padding: "0px 8px" }}>
      <div className="p-6 bg-white min-h-screen font-sans">
        <h1 className="text-2xl font-bold mb-4">My Ads</h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabTypes.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400 hover:bg-gray-200"
              }`}
            >
              {tab.label} 
            </button>
          ))}
        </div>
        
        

        {/* Banners */}
        <div className="my-ads-banner-container flex flex-col md:flex-row gap-4">
          {/* Verified Banner */}
          <div
            className="flex flex-1 items-center justify-between shadow-md"
            style={{ backgroundColor: "#F5F9FE", borderRadius: "8px", height: "90px" }}
          >
            <div
              style={{
                width: "80px",
                height: "100%",
                backgroundColor: "rgba(217, 232, 252, .5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              <img
                src="https://uae.dubizzle.com/static/home/img/icons/verified-badge.svg"
                alt="Verified Badge"
                width="38"
                height="38"
              />
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <span className="block text-base font-semibold">Become a verified user</span>
                <div className="flex items-center mt-1 text-sm text-gray-600 space-x-2">
                  <span>Get more visibility</span>
                  <div className="h-4 border-l border-gray-300"></div>
                  <span>Enhance your credibility</span>
                </div>
              </div>
            </div>

            <div style={{ marginRight: "10px" }}>
              <button
                onClick={openPopup}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
              >
                Get Started
              </button>
            </div>

            {/* Popup Modal */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                onClick={closePopup}
              >
                <div
                  ref={modalRef}
                  className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <img
                      src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/get-verified-background.svg"
                      alt="Verified"
                    />
                    <h2 className="text-xl font-semibold text-center" style={{ fontSize: "24px" }}>
                      Get verified on Syrizzle!
                    </h2>
                    <div className="w-full text-center">
                      <p className="text-sm text-gray-600 inline-block" style={{ fontSize: "16px" }}>
                        Build Trust
                        <span
                          style={{
                            backgroundColor: "rgb(35, 38, 42)",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            display: "inline-block",
                            margin: "2px 8px",
                          }}
                        ></span>
                        Gain Visibility
                        <span
                          style={{
                            backgroundColor: "rgb(35, 38, 42)",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            display: "inline-block",
                            margin: "2px 8px",
                          }}
                        ></span>
                        Unlock Rewards
                      </p>
                    </div>

                    <hr className="w-full border-gray-300" />

                    {/* Features */}
                    <div className="w-full space-y-3">
                      <div className="flex items-start space-x-3">
                        <div
                          className="p-2 rounded-md"
                          style={{ backgroundColor: "rgb(242, 247, 254)" }}
                        >
                          <img
                            src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/quick-verification.svg"
                            alt="Quick & Simple"
                          />
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontSize: "20px" }}>
                            Quick & Simple
                          </p>
                          <p className="text-sm text-gray-600">It only takes a few minutes</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="rounded-full">
                          <div
                            className="p-2 rounded-md"
                            style={{ backgroundColor: "rgb(242, 247, 254)" }}
                          >
                            <img
                              src="https://static.dubizzle.com/frontend-web/static-resources/assets/images/encrypted.svg"
                              alt="Secure"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold" style={{ fontSize: "20px" }}>
                            Secure
                          </p>
                          <p className="text-sm text-gray-600">Your ID information stays private</p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full text-left">
                      <a
                        href="#"
                        className="text-blue-500 text-sm mt-2 hover:underline inline-block"
                      >
                        Learn more of verification on Syrizzle
                      </a>
                    </div>

                    <hr className="w-full border-gray-300" />

                    {/* Action Buttons */}
                    <div className="flex justify-end w-full space-x-2 mt-4">
                      <button
                        onClick={closePopup}
                        className="px-6 py-3 border border-gray-300 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-100"
                        style={{ fontSize: "15px" }}
                      >
                        Later
                      </button>
                      <button
                        onClick={handleGetVerified}
                        className="px-6 py-3 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-900 flex items-center space-x-2"
                      >
                        <span>Get Verified</span>
                        <MdArrowForwardIos />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ad Insights Promo Banner */}
          <div
            className="flex flex-1 items-center justify-between bg-[#E8F0FE] rounded-md"
            style={{ height: "90px", paddingLeft: "15px" }}
          >
            <div>
              <div className="text-lg font-semibold">
                Get detailed insights for your ads
                <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">New</span>
              </div>
              <div className="text-sm text-gray-700 mt-1">See how many people are interested in your ad</div>
            </div>
            <img
              src="https://dbz-monolith-media.dubizzle.com/dist_0658a99/images/mylistings/ad-insights-promo-banner.svg"
              alt="Ad Insights"
              className="w-32 md:w-40"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-red-600 text-3xl" />
            <span className="ml-2 text-gray-600">Loading your ads...</span>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {/* Ads Display Section */}
        {!loading && !error && adsData?.length > 0 && (
          <>
            {/* Motors Category - Dynamic based on data */}
            <div className="mb-2 font-bold text-sm text-gray-700 mt-5">Motors ({motorCount})</div>
            <div className="mb-4 text-sm text-gray-500 ml-4">Cars</div>
            
            {/* Ads List */}
            {adsData.map((ad) => (
              <div key={ad._id} className="flex items-start bg-gray-100 p-4 rounded shadow-sm mb-4">
                <input type="checkbox" className="mr-4 mt-2" />
                
                <div className="flex items-center bg-white p-4 rounded w-full">
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
                    {ad.images && ad.images.length > 0 ? (
                      <img 
                        src={`https://syrizzle.vyominfotech.in${ad.images[0]}`} 
                        alt={ad.title || 'Car image'} 
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No Image</span>
                    )}
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${ad.status === 'draft' ? 'bg-gray-300 text-gray-800' : ad.status === 'live' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                        {ad.status ? ad.status.charAt(0).toUpperCase() + ad.status.slice(1) : 'Unknown'}
                      </span>
                      <span className="font-semibold">{ad.title || `Untitled ${ad.make || 'Used'} Car ${ad.status === 'draft' ? 'Draft' : ''}`}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Last Updated: {new Date(ad.updatedAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                    </p>
                    {ad.expiryDate && (
                      <p className="text-sm text-gray-600">
                        Ad expires in {Math.max(0, Math.floor((new Date(ad.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)))} days
                      </p>
                    )}
                    {ad.price && (
                      <p className="text-sm font-semibold text-gray-800 mt-1">
                        AED {ad.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                  
                  <button 
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm ml-auto"
                    onClick={() => window.location.href = `/place-an-ad/motors/used-cars/new/edit/?_id=${ad._id}`}
                  >
                    {ad.status === 'draft' ? 'Continue Posting Ad' : 'Edit Ad'}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        
        {/* No Ads Found */}
        {!loading && !error && adsData.length === 0 && (
          <div className="text-center py-8 border border-gray-200 rounded-md mt-5">
            <p className="text-gray-600 mb-2">No ads found</p>
            <p className="text-sm text-gray-500">You don't have any ads in this category yet</p>
            <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md">
              Post an Ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAds;
