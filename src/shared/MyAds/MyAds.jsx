import React, { useState, useRef, useEffect } from "react";
import { MdArrowForwardIos } from "react-icons/md";

const tabs = [
  "All Ads (1)",
  "Live (0)",
  "Drafts (1)",
  "Payment Pending (0)",
  "Under Review (0)",
  "Rejected (0)",
  "Expired (0)",
];

const MyAds = () => {
  const [activeTab, setActiveTab] = useState("All Ads (1)");
  const [isOpen, setIsOpen] = useState(false);
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
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-gray-400 hover:bg-gray-200"
              }`}
            >
              {tab}
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

        {/* Motors Category */}
        <div className="mb-2 font-bold text-sm text-gray-700">Motors (1)</div>
        <div className="mb-4 text-sm text-gray-500 ml-4">Cars</div>

        {/* Draft Ad */}
        <div className="flex items-start bg-gray-100 p-4 rounded shadow-sm">
          <input type="checkbox" className="mr-4 mt-2" />

          <div className="flex items-center bg-white p-4 rounded w-full">
            <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>

            <div className="ml-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="bg-gray-300 text-gray-800 text-xs px-2 py-0.5 rounded">Draft</span>
                <span className="font-semibold">Untitled Used Car Draft</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Last Updated: May 08</p>
              <p className="text-sm text-gray-600">Ad expires in 29 days</p>
            </div>

            <button className="bg-red-600 text-white px-4 py-2 rounded text-sm ml-auto">
              Continue Posting Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAds;
